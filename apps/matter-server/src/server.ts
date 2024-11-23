#!/usr/bin/env node
//import '@project-chip/matter-node.js';
import { existsSync, stat, unlink } from 'fs';
import path from 'path';
//import { ISY } from 'isy-nodejs/ISY';
import type { ServerNode } from '@project-chip/matter.js/node';
import { Command } from 'commander';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { chmod } from 'fs/promises';
import type { ISY } from 'isy-nodejs/ISY';
import type * as MatterServer from 'isy-nodejs/types/Matter/Bridge/Server';
import { logStringify } from 'isy-nodejs/Utils';
import { createServer, type Server, type Socket } from 'net';
import { exit } from 'process';
import { promisify } from 'util';
import winston from 'winston';
import { authenticate } from './authenticate.js';
import './utils.js';

type ProgramOptions = {
	autoStart: boolean;
	dependencies: 'static' | 'plugin' | 'remote';
	env: string;
	requireAuth: boolean;
};

const format = winston.format;
const myFormat = format.combine(
	format.splat(),
	winston.format.printf((info) => {
		const d = new Date();
		const dStr = d.getFullYear() + '-' + zPad2(d.getMonth() + 1) + '-' + zPad2(d.getDate()) + ' ' + zPad2(d.getHours()) + ':' + zPad2(d.getMinutes()) + ':' + zPad2(d.getSeconds());
		return `${dStr} ${info.level}: ${info.label}: ${info.message}`;
	}),
	format.colorize({ all: true })
);
function zPad2(str: number) {
	return str.toString().padStart(2, '0');
}
function loadConfigs() {
	let isyConfig: Partial<ISY.Config> = {
		host: process.env.ISY_HOST_URL ?? 'eisy.local',
		password: process.env.ISY_PASSWORD,
		port: process.env.ISY_HOST_PORT ?? 8080,
		protocol: process.env.ISY_HOST_PROTOCOL ?? 'http',
		username: process.env.ISY_USERNAME ?? 'admin',

	};
	let matterConfig: Partial<MatterServer.Config> = {
		passcode: Number(process.env.MATTER_PASSCODE),
		discriminator: Number(process.env.MATTER_DISCRIMINATOR),
		port: process.env.MATTER_PORT,
		productId: Number.parseInt(process.env.MATTER_PRODUCTID),
		vendorId: Number.parseInt(process.env.MATTER_VENDORID)
	};
	let serverConfig: { logLevel: string; logPath: string; workingDir: string } = {
		logLevel: process.env.LOG_LEVEL ?? `debug`,
		logPath: process.env.LOG_PATH ?? process.cwd() + '/matter_server.log',
		workingDir: process.env.WORKING_DIR ?? process.cwd()
	};
	return { isyConfig, matterConfig, serverConfig };
}

let isyConfig: Partial<ISY.Config>;
let matterConfig: Partial<MatterServer.Config>;
let serverConfig: { logLevel: string; logPath: string; workingDir: string };

let isy: ISY;
let serverNode: ServerNode;
let pluginEnv: typeof process.env & { PLUGIN_PATH: string };
let options: ProgramOptions = { autoStart: false, dependencies: 'static', env: '.env', requireAuth: true };
let authenticated: Boolean = false;

type Message =
	| { type: 'command'; command: 'start' | 'stop' | 'update' }
	| ({ type: 'isyConfig' } & ISY.Config)
	| ({ type: 'matterConfig' } & MatterServer.Config)
	| ({ type: 'clientEnv' } & { env: typeof process.env & { PLUGIN_PATH: string } })
	| ({ type: 'serverConfig' } & { logLevel?: string; logPath?: string })
	| { type: 'auth'; credential: Credential };

let logger: winston.Logger;

const tagFormat = format((info) => {
	info.type = 'log';
	return info;
})();

const matterServiceSockPath = '/tmp/ns2matter';

let socketServer: Server;

let matterServer: typeof MatterServer;

let clientLogTransport: winston.transport;

let client: Socket;

function createLogger() {
	return winston.loggers.add('server', {
		format: winston.format.label({ label: 'server' }),
		transports: [
			new winston.transports.Console({ level: 'info', format: myFormat }),
			new winston.transports.File({ filename: serverConfig.logPath, level: 'debug', format: myFormat, zippedArchive: true, maxFiles: 5, maxsize: 1000000 })
		],
		exitOnError: false,
		levels: winston.config.cli.levels,
		level: 'debug'
	});
}

async function startSocketServer(): Promise<Server> {
	socketServer = createServer(async (socket) => {
		//socket.write('Echo server\r\n');
		//let loggerStream = pipeline(addLogHeaderStream,socket);
		clientLogTransport = new winston.transports.Stream({ stream: socket, level: 'info', format: format.combine(tagFormat, format.json()) });
		logger.add(clientLogTransport);
		if (client) {
			logger.error('Previous client already connected. Disconnecting previous client.');
			await new Promise<void>((resolve) => {
				client.end(() => {
					client.destroy();
					resolve();
				});
			});
		}
		logger.info('Client connected');
		client = socket;
		client
			.on('data', async (data: any) => {
				logger.debug(`Received: ${data.toString()}`);
				let s = data.toString().trim().split('\n');
				for (let line of s) {
					await processMessage(line);
				}
				return;
			})
			.on('end', () => {
				logger.info('Client disconnected');
				logger.remove(clientLogTransport);
				client = null;
				clientLogTransport = null;
				authenticated = false;
			});
	});
	socketServer.on('error', (err) => {
		logger.error('Socket server error: ' + err);
		exit(1);
	});
	try {
		await promisify(stat)(matterServiceSockPath);
		logger.info('Removing leftover socket.');
		try {
			await promisify(unlink)(matterServiceSockPath);
		} catch (e) {
			logger.error(`Error unlinking socket. ${e.message}`);
			process.exit(0);
		}
	} finally {
		return new Promise<Server>((resolve, reject) => {
			socketServer.listen(matterServiceSockPath, () => {
				try {
					logger.info('Socket bound.');
					logger.info('Setting socket permissions.');
					chmod(matterServiceSockPath, 0o777); //TODO: Set to group only
					resolve(socketServer);
				} catch (e) {
					reject(e);
				}
			});
		});
	}
}

/*stat(matterServiceSockPath, function (err, stats) {
	if (err) {
		// start server
		console.log('No leftover socket found.');
		server.listen(matterServiceSockPath, () => {
			console.log('Server bound');
		});
	} else {
		// remove file then start server
		console.log('Removing leftover socket.');
		unlink(matterServiceSockPath, function (err) {
			if (err) {
				// This should never happen.
				console.error(err);
				process.exit(0);
			}
			server.listen(matterServiceSockPath, () => {
				console.log('Server bound');
			});
		});
	}
});*/

async function processMessage(line: string) {
	try {
		let msg = JSON.parse(line) as Message;
		//console.log(data.toString());
		switch (msg.type) {
			case 'isyConfig':
				isyConfig = Object.assign(isyConfig, msg);
				console.log('ISY api config update: ' + logStringify(isyConfig));
				break;
			case 'matterConfig':
				matterConfig = Object.assign(matterConfig, msg);
				console.log('Matter bridge config update: ' + logStringify(matterConfig));
				break;
			case 'serverConfig':
				serverConfig = Object.assign(serverConfig, msg);
				logger.transports[2].level = serverConfig.logLevel;
				//logger.transports[1].filename = serverConfig.logPath;
				console.log('Server config update: ' + logStringify(serverConfig));
				break;
			case 'clientEnv':
				pluginEnv = msg.env;
				console.log('Plugin environment variables: ' + logStringify(pluginEnv));
				break;
			case 'auth':
				console.log('Authenticating: ' + logStringify(msg));
				authenticated = await authenticate(msg);
				console.log('Authenticated: ' + authenticated);
				break;
			case 'command':
				switch (msg.command) {
					case 'start':
						logger.info('Matter bridge start requested');
						await startBridgeServer();
						client.write(JSON.stringify({ pairingInfo: matterServer.getPairingCode() }));
						break;
					case 'stop':
						logger.info('Matter bridge stop requested');
						await stopBridgeServer();
						break;
				}
				break;
		}
	} catch (e) {
		console.error(`Error processing msg: ${line}: ${e.message}`);
	}
}

async function startBridgeServer() {
	if (!isyConfig || !matterConfig) {
		logger.error('Missing configuration');
		return;
	}
	if (!authenticated) {
		logger.error('Not authenticated');
		return;
	}
	if (isy || serverNode) {
		logger.error('Already started');
		return;
	}
	try
	{	isy = await loadISYInterface();
		await isy.initialize();
		logger.info('Connected to ISY');
		serverNode = await loadBridgeServer();
		logger.info('Matter bridge server started');
		logger.info('*'.repeat(80));
		logger.info(`ISY firmware version: ${isy.firmwareVersion}`);
		logger.info(`ISY model: ${isy.productName}`);
		logger.info(`ISY model number: ${isy.productId}`);
		logger.info(`ISY api version: ${isy.apiVersion}`);
		logger.info(`Matter api version: ${matterServer.version}`);
		logger.info('*'.repeat(80));

	}
	catch(e)
	{
		if(e instanceof Error)
		{
			logger.error(`Error starting bridge server: ${e.message}`, e);
		}
		else
			logger.error(`Error starting bridge server: ${e}`);
		isy = null;
		serverNode = null;
	}
}


async function loadISYInterface(): Promise<ISY> {
	let modulePath = 'isy-nodejs/ISY';
	if (options.dependencies === 'plugin') {
		logger.info('Locating ISY api from plugin dependencies');
		if (!pluginEnv) {
			logger.error('Plugin environment not set');
		} else {
			modulePath = path.resolve('isy-nodejs', 'node_modules', pluginEnv.PLUGIN_PATH);
			logger.info('ISY api located: ' + modulePath);
		}
	}
	logger.info('Loading ISY api from ' + modulePath);
	let isyClass = (await import(modulePath)).ISY;
	logger.info('ISY api loaded');
	return new isyClass(isyConfig as ISY.Config, logger, serverConfig.workingDir);
}

async function loadBridgeServer() {
	logger.info('Loading Matter Bridge api');
	matterServer = await import('isy-nodejs/Matter/Bridge/Server');
	logger.info('Matter Bridge api loaded');
	logger.info('Starting matter bridge server');
	let s = await matterServer.create(isy, matterConfig as MatterServer.Config);
	logger.info('Matter bridge server started');
	return s;
}

async function stopBridgeServer() {
	try {
		if (!isy || !serverNode) {
			logger.warn('Matter bridge not started');
			return;
		}
		if (serverNode) {
			logger.info('Stopping matter bridge');
			await serverNode.close();
			serverNode = undefined;
			logger.info('Matter bridge stopped');
		}
		if (isy) {
			logger.info('Disconnecting from ISY');
			isy[Symbol.dispose]();
			isy = undefined;
			logger.info('Disconnected from ISY');
		}
	} catch (e) {
		logger.error(`Error stopping bridge server ${e.message}`, e);
	}
}

async function stopSocketServer() {
	try {
		if (socketServer) {
			logger.info('Stopping socket server');
			delete logger.transports[2];
			clientLogTransport = null;
			await promisify(client?.end)();
			if (socketServer) await promisify(socketServer.close)();
			client = null;
			logger.info('Socket server stopped');
		}
	} catch (e) {
		logger.error(`Error stopping socket server ${e.message}`, e);
	}
}

process.on('SIGINT', async () => {
	await stopBridgeServer();
	await stopSocketServer();
	process.exit(0);
});

process.on('uncaughtException', async (err) => {
	logger.error('Uncaught exception: ' + err.message, err);
});

const program = new Command();
program
	.option('-a, --autoStart', 'Start matter bridge server on startup', false)
	.option('-d, --dependencies', 'Load dependencies - static (from local node_modules), plugin (from plugin node_modules)', 'static')
	.option('-e, --env', 'Path to environment file', '.env')
	.option('-r, --requireAuth', 'Require authentication to start bridge server', true);
program.parse();
options = program.opts<ProgramOptions>();

let envPath = path.resolve(process.cwd(), options.env);

let env = expand(config({ path: envPath }));

console.log(`Environment variables loaded from ${path}: ${logStringify(env)}`);

console.log(`All environment variables: ${logStringify(process.env)}`);

console.log(`Options: ${logStringify(options)}`);

({ isyConfig, matterConfig, serverConfig } = loadConfigs());



logger = createLogger();


if (options.autoStart && !isyConfig.password && process.env.LOGNAME !== 'polyglot') {
	logger.error('Auto start requires ISY password');
	exit(1);
}
if (process.env.LOGNAME === 'polyglot' || process.env.USER === 'polyglot') {
	logger.info('Running as polyglot');
	options.requireAuth = false;
	isyConfig.socketPath = '/tmp/ns2isy182652';
}

console.log(`ISY config: ${logStringify(isyConfig)}`);
console.log(`Matter config: ${logStringify(matterConfig)}`);
console.log(`Server config: ${logStringify(serverConfig)}`);

if (options.autoStart) {
	authenticated = true;
	startBridgeServer();
} else {
	if (!options.requireAuth) {
		authenticated = true;
	}
	startSocketServer();
}

//main();
//# sourceMappingURL=server.js.map
//# sourceMappingURL=server.js.map
