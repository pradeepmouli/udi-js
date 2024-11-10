import { stat, unlink } from 'fs';
import path from 'path';
//import { ISY } from 'isy-nodejs/ISY';
import { config } from 'dotenv';
import { expand } from 'dotenv-expand';
import { Command } from 'commander';
import { createServer } from 'net';
import { exit } from 'process';
import winston from 'winston';
import { authenticate } from './authenticate.js';
import { promisify } from 'util';
import './utils.js';
expand(config());
console.log(JSON.stringify(process.env, null, 2));
const format = winston.format;
const myFormat = format.combine(format.splat(), winston.format.printf((info) => {
    const d = new Date();
    const dStr = d.getFullYear() + '-' + zPad2(d.getMonth() + 1) + '-' + zPad2(d.getDate()) + ' ' + zPad2(d.getHours()) + ':' + zPad2(d.getMinutes()) + ':' + zPad2(d.getSeconds());
    return `${dStr} ${info.level}: ${info.label}: ${info.message}`;
}), format.colorize({ all: true }));
function zPad2(str) {
    return str.toString().padStart(2, '0');
}
let isyConfig = {
    host: process.env.ISY_HOST_URL,
    password: process.env.ISY_PASSWORD,
    port: process.env.ISY_HOST_PORT,
    protocol: process.env.ISY_HOST_PROTOCOL,
    username: process.env.ISY_USERNAME
};
let matterConfig = {
    passcode: Number(process.env.MATTER_PASSCODE),
    discriminator: Number(process.env.MATTER_DISCRIMINATOR),
    port: process.env.MATTER_PORT,
    productId: Number.parseInt(process.env.MATTER_PRODUCTID),
    vendorId: Number.parseInt(process.env.MATTER_VENDORID)
};
let serverConfig = {
    logLevel: process.env.LOG_LEVEL,
    logPath: process.env.LOG_PATH ?? process.cwd() + '/matter_server.log',
    workingDir: process.env.WORKING_DIR ?? process.cwd()
};
let isy;
let serverNode;
let pluginEnv;
let options = { start: false, dependencies: 'static' };
let authenticated = false;
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
let server;
async function startSocketServer() {
    try {
        server = createServer((socket) => {
            //socket.write('Echo server\r\n');
            //let loggerStream = pipeline(addLogHeaderStream,socket);
            let t = new winston.transports.Stream({ stream: socket, level: 'info', format: format.combine(tagFormat, format.json()) });
            logger.add(t);
            logger.info('Client connected');
            socket
                .on('data', async (data) => {
                logger.debug('Received: ' + data.toString());
                data.toString().trim().split('\n').forEach(processMessage);
            })
                .on('end', () => {
                logger.info('Client disconnected');
                authenticated = false;
            });
        });
        server.on('error', (err) => {
            logger.error('Socket server error: ' + err);
            exit(1);
        });
        await promisify(stat)(matterServiceSockPath);
    }
    catch {
        logger.info('Leftover socket found. Unlinking.');
        try {
            await promisify(unlink)(matterServiceSockPath);
        }
        catch (e) {
            logger.error(`Error unlinking socket. ${e.message}`);
            process.exit(0);
        }
    }
    let p = Promise.withResolvers();
    server.listen(matterServiceSockPath, () => {
        logger.info('Socket bound.');
        p.resolve;
    });
    return p.promise;
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
async function processMessage(line) {
    try {
        let msg = JSON.parse(line);
        //console.log(data.toString());
        switch (msg.type) {
            case 'isyConfig':
                isyConfig = Object.assign(isyConfig, msg);
                console.log('ISY api config update: ' + JSON.stringify(isyConfig, null, 2));
                break;
            case 'matterConfig':
                matterConfig = Object.assign(matterConfig, msg);
                console.log('Matter bridge config update: ' + JSON.stringify(matterConfig, null, 2));
                break;
            case 'serverConfig':
                serverConfig = Object.assign(serverConfig, msg);
                console.log('Server config update: ' + JSON.stringify(serverConfig, null, 2));
                break;
            case 'clientEnv':
                pluginEnv = msg.env;
                console.log('Plugin environment variables: ' + JSON.stringify(pluginEnv, null, 2));
                break;
            case 'authenticate':
                authenticated = await authenticate(msg);
                break;
            case 'command':
                switch (msg.command) {
                    case 'start':
                        logger.info('Matter bridge start requested');
                        await startBridgeServer();
                        break;
                    case 'stop':
                        logger.info('Matter bridge stop requested');
                        await stopBridgeServer();
                        break;
                }
                break;
        }
    }
    catch (e) {
        console.error('Error processing msg: ' + line);
    }
}
async function startBridgeServer() {
    if (!isyConfig || !matterConfig) {
        logger.error('Missing configuration');
        return;
    }
    if (isy || serverNode) {
        logger.error('Already started');
        return;
    }
    isy = await loadISYInterface();
    await isy.initialize();
    serverNode = await loadBridgeServer();
}
async function loadISYInterface() {
    let modulePath = 'isy-nodejs/ISY';
    if (options.dependencies === 'plugin') {
        logger.info('Locating ISY api from plugin dependencies');
        if (!pluginEnv) {
            logger.error('Plugin environment not set');
        }
        else {
            modulePath = path.resolve('isy-nodejs', 'node_modules', pluginEnv.PLUGIN_PATH);
            logger.info('ISY api located: ' + modulePath);
        }
    }
    logger.info('Loading ISY api from ' + modulePath);
    let isyClass = (await import(modulePath)).ISY;
    logger.info('ISY api loaded');
    logger.info(`Module meta: ${JSON.stringify(import.meta)}`);
    return new isyClass(isyConfig, logger, serverConfig.workingDir);
}
async function loadBridgeServer() {
    logger.info('Loading Matter Bridge api');
    var server = await import('isy-nodejs/Matter/Bridge/Server');
    logger.info('Matter Bridge api loaded');
    return await server.create(isy, matterConfig);
}
async function stopBridgeServer() {
    try {
        if (!isy || !serverNode) {
            logger.warn('Matter bridge not started');
            return;
        }
        logger.info('Stopping matter bridge');
        serverNode.close();
        serverNode[Symbol.asyncDispose]();
        serverNode = undefined;
        isy[Symbol.dispose]();
        isy = undefined;
        logger.info('Matter bridge stopped');
    }
    catch (e) {
        logger.error(`Error stopping bridge server ${e.message}`, e);
    }
}
async function stopSocketServer() {
    try {
        if (server)
            await promisify(server.close)();
    }
    catch (e) {
        logger.error(`Error stopping socket server ${e.message}`, e);
    }
}
process.on('SIGINT', async () => {
    await stopBridgeServer();
    await stopSocketServer();
});
const program = new Command();
program
    .option('-s, --start', 'Start matter bridge server on startup', false)
    .option('-d, --dependencies', 'Load dependencies - static (from local node_modules), plugin (from plugin node_modules)', 'static');
program.parse();
options = program.opts();
if (options.start) {
    startBridgeServer();
}
else {
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
//# sourceMappingURL=server.js.map