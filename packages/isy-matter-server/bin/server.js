import '@project-chip/matter-node.js';
import { ISY } from 'isy-nodejs/ISY';
import { createServerNode } from 'isy-nodejs/Matter/Server/Server';
import { createServer } from 'net';
import './Utils.js';
import { Transform } from 'stream';
import winston from 'winston';
const format = winston.format;
const myFormat = format.combine(format.splat(), winston.format.printf((info) => {
    const d = new Date();
    const dStr = d.getFullYear() + '-' + zPad2(d.getMonth() + 1) + '-' + zPad2(d.getDate()) + ' ' + zPad2(d.getHours()) + ':' + zPad2(d.getMinutes()) + ':' + zPad2(d.getSeconds());
    return `${dStr} ${info.level}: ${info.label}: ${info.message}`;
}), format.colorize({ all: true }));
function zPad2(str) {
    return str.toString().padStart(2, '0');
}
let isyConfig;
let matterConfig;
let isy;
let serverNode;
const logger = winston.loggers.add('server', {
    format: winston.format.label({ label: 'server' }),
    transports: [new winston.transports.Console({ level: 'info', format: myFormat }), new winston.transports.File({ filename: 'matter-server.log', level: 'debug', format: myFormat })],
    exitOnError: false,
    levels: winston.config.cli.levels
});
const addLogHeaderStream = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, "{type: 'log', level: " + chunk.level + ', message: ' + chunk.message + '}\n');
    }
});
const server = createServer((socket) => {
    socket.write('Echo server\r\n');
    let t = new winston.transports.Stream({ stream: addLogHeaderStream.pipe(socket), level: 'info', format: myFormat });
    logger.add(t);
}).on('data', async (data) => {
    let msg = JSON.parse(data.toString());
    if (msg.type === 'isyConfig') {
        isyConfig = msg;
    }
    else if (msg.type === 'matterConfig') {
        matterConfig = msg;
    }
    else if (msg.type === 'command') {
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
            isy = new ISY(isyConfig, logger);
            await isy.initialize();
            serverNode = await createServerNode(isy);
        }
        else if (msg.command === 'stop') {
            if (!isy || !serverNode) {
                logger.error('Not started');
                return;
            }
            logger.info('Stopping matter bridge');
            serverNode.close();
            serverNode = undefined;
            isy = undefined;
        }
    }
});
export default async function main() {
    //n = createServer();
    /*const isy = new ISY({ host: '192.168.1.50', username: 'admin', password: 'qazWSX12', port: 8080, protocol: 'http' }, logger);
    await isy.initialize();
    let s = await createServerNode(isy);*/
}
//main();
//# sourceMappingURL=server.js.map