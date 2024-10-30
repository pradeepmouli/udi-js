import './Utils.js';
import '@project-chip/matter-node.js';
import { ISY } from 'isy-nodejs/ISY';
import { createServerNode } from 'isy-nodejs/Matter/Server/Server';
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
const logger = winston.loggers.add('server', {
    format: winston.format.label({ label: 'server' }),
    transports: [new winston.transports.Console({ level: 'info', format: myFormat }), new winston.transports.File({ filename: 'matter-server.log', level: 'debug', format: myFormat })],
    exitOnError: false,
    levels: winston.config.cli.levels
});
export default async function main() {
    const isy = new ISY({ host: '192.168.1.50', username: 'admin', password: 'qazWSX12', port: 8080, protocol: 'http' }, logger);
    await isy.initialize();
    let s = await createServerNode(isy);
}
main();
//# sourceMappingURL=server.js.map