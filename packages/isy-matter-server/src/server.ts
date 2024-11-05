import { error, log } from 'console';
import { stat, unlink } from 'fs';
import { type ISY } from 'isy-nodejs/ISY';
import { type createServerNode as createServerNodeFunction } from 'isy-nodejs/Matter/Server/Server';
import { createServer } from 'net';
import { exit } from 'process';
import { Transform, pipeline } from 'stream';
import winston from 'winston';
import {Format} from 'logform'
import './Utils.js';
import { type ServerNode } from '@project-chip/matter.js/node';


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
function zPad2(str) {
	return str.toString().padStart(2, '0');
}
let isyConfig: { host: string; port: number; protocol: "http" | "https"; username: string; password: string; enableWebSocket?: boolean; displayNameFormat?: string; elkEnabled?: boolean; };
let matterConfig: any;
let isy: ISY;
let serverNode;
const logger = winston.loggers.add('server', {
	format: winston.format.label({ label: 'server' }),
	transports: [new winston.transports.Console({ level: 'info', format: myFormat }), new winston.transports.File({ filename: 'matter-server.log', level: 'debug', format: myFormat })],
	exitOnError: false,
	levels: winston.config.cli.levels
});
const addLogHeaderStream = new Transform({
	transform(chunk, encoding, callback) {
		console.log('log entry: ' + JSON.stringify(chunk));
		//this.push(JSON.stringify({type: 'log', ...chunk}) + '\n');
		callback(null, JSON.stringify({ type: 'log', ...chunk }) + '\n');
	},
	objectMode: true
});

class tagFormat extends Format {
	override transform = (info, opts) => {
		info.type = 'log';
		return info;
	}
}

const server = createServer((socket) => {
	//socket.write('Echo server\r\n');
	//let loggerStream = pipeline(addLogHeaderStream,socket);
	let t = new winston.transports.Stream({ stream: addLogHeaderStream.pipe(socket), level: 'info', format: format.combine(format.json(), new tagFormat()) });
	logger.add(t);
	logger.info('Client connected');
	socket.on('data', async (data) => {
		console.log('Received: ' + data.toString());
		data.toString().split('\n').forEach(async (line) => {
		let	msg = JSON.parse(line);

		//console.log(data.toString());
		if (msg.type === 'isyConfig') {
			isyConfig = msg;
			console.log(JSON.stringify(isyConfig));
		} else if (msg.type === 'matterConfig') {
			matterConfig = msg;
			console.log(JSON.stringify(matterConfig));
		} else if (msg.type === 'command') {
			if (msg.command === 'start') {
				if (!isyConfig || !matterConfig) {
					logger.error('Missing configuration');
					return;
				}
				if (isy || serverNode) {
					logger.error('Already started');
					return;
				}
				logger.info('Starting matter bridge', { isyConfig, matterConfig });
				var isyClass : typeof ISY = (await import('isy-nodejs')).ISY
				isy = new isyClass(isyConfig, logger);
				await isy.initialize();
				let createServerNode : typeof createServerNodeFunction = (await import('isy-nodejs/Matter/Server/Server')).createServerNode
				serverNode = (await createServerNode(isy)) as ServerNode;
			} else if (msg.command === 'stop') {
				if (!isy || !serverNode) {
					logger.error('Not started');
					return;
				}
				logger.info('Stopping matter bridge');
				serverNode.close();
				serverNode = undefined;
				isy = undefined;
			}
		}});
	});
}).on('end', () => {
	logger.info('Client disconnected');
});

server.on('error', (err) => {
	error('Server error: ' + err);
	exit(1);
});

const matterServiceSockPath = '/tmp/matter-service.sock';
stat(matterServiceSockPath, function (err, stats) {
	if (err) {
		// start server
		console.log('No leftover socket found.');

		server.listen(matterServiceSockPath, () => {
			console.log('Server bound');
		});
	}
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
});

export default async function main() {
	//n = createServer();
	/*const isy = new ISY({ host: '192.168.1.50', username: 'admin', password: 'qazWSX12', port: 8080, protocol: 'http' }, logger);
    await isy.initialize();
    let s = await createServerNode(isy);*/
}
//main();
//# sourceMappingURL=server.js.map
