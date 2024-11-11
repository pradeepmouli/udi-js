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
import { logStringify } from 'isy-nodejs/Utils.js';
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

expand(config());

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

let isyConfig: Partial<ISY.Config> = {
	host: process.env.ISY_HOST_URL,
	password: process.env.ISY_PASSWORD,
	port: process.env.ISY_HOST_PORT,
	protocol: process.env.ISY_HOST_PROTOCOL,
	username: process.env.ISY_USERNAME
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

const logger = winston.loggers.add('server', {
	format: winston.format.label({ label: 'server' }),
	transports: [new winston.transports.Console({ level: 'info', format: myFormat }), new winston.transports.File({ filename: serverConfig.logPath, level: 'debug', format: myFormat })],
	exitOnError: false,
	levels: winston.config.cli.levels,
	level: 'debug'
});

const tagFormat = format((info) => {
	info.type = 'log';
	return info;
})();

const matterServiceSockPath = '/tmp/ns2matter';

let socketServer: Server;

let matterServer: typeof MatterServer;

let clientLogTransport: winston.transport;

let client: Socket;

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
						client.write(JSON.stringify({pairingInfo: matterServer.getPairingCode()}));
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

	isy = await loadISYInterface();
	await isy.initialize();
	logger.info('*'.repeat(80));
	logger.info('ISY connection established');
	logger.info(`ISY id: ${isy.id}`);
	logger.info(`ISY model: ${isy.productName}`);
	logger.info(`ISY firmware version: ${isy.firmwareVersion}`);
	logger.info(`ISY model: ${isy.productName}`);
	logger.info(`ISY model number: ${isy.productId}`);
	logger.info(`ISY api version: ${isy.apiVersion}`);
	logger.info('*'.repeat(80));
	logger.info('Loading Matter Bridge server');
	serverNode = await loadBridgeServer();
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
	return await matterServer.create(isy, matterConfig as MatterServer.Config);
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
		if(socketServer)
		{
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

/*process.on('exit', async () => {
	await stopBridgeServer();
	await stopSocketServer();
});*/

process.on('uncaughtException', async (err) => {
	logger.error('Uncaught exception: ' + err.message, err);
});

const dirname = path.dirname(import.meta.url);

const program = new Command();
program
	.option('-a, --autoStart', 'Start matter bridge server on startup', false)
	.option('-d, --dependencies', 'Load dependencies - static (from local node_modules), plugin (from plugin node_modules)', 'static')
	.option('-e, --env', 'Path to environment file', '.env')
	.option('-r, --requireAuth', 'Require authentication to start bridge server', true);
program.parse();
options = program.opts<ProgramOptions>();

let env = expand(config({ path: path.resolve(dirname, options.env) }));

console.log(JSON.stringify(env, null, 2));

console.log(JSON.stringify(process.env, null, 2));

if (options.autoStart) {
	authenticated = true;
	startBridgeServer();
} else {
	if (!options.requireAuth) {
		authenticated = true;
	}
	startSocketServer();
}

function applyEnvironmentConfig() {
	isyConfig.host = process.env.ISY_HOST_URL;
	isyConfig.password = process.env.ISY_PASSWORD;
	isyConfig.port = process.env.ISY_HOST_PORT;
	isyConfig.protocol = process.env.ISY_HOST_PROTOCOL;
	isyConfig.username = process.env.ISY_USERNAME;
	isyConfig.password = process.env.ISY_PASSWORD;
	matterConfig.discriminator = process.env.MATTER_DISCRIMINATOR;
	matterConfig.port = process.env.MATTER_PORT;
	matterConfig.productId = Number.parseInt(process.env.MATTER_PRODUCTID);
	matterConfig.vendorId = Number.parseInt(process.env.MATTER_VENDORID);
	matterConfig.passcode = process.env.MATTER_PASSCODE;
}

//main();
//# sourceMappingURL=server.js.map
//# sourceMappingURL=server.js.map
