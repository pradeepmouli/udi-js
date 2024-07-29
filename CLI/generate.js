//import { generateTemplateClassesFromXSD } from 'xsd2ts';
//generateTemplateClassesFromXSD('./dependency.xsd');
import { writeFileSync } from 'fs';
import { Family } from '../dist/esm/Definitions/Global/Families.js';
import { InsteonDeviceFactory } from '../dist/esm/Devices/Insteon/InsteonDeviceFactory.js';
import DeviceMapJSON from './DeviceMap.json' with { type: 'json' };
import { parseNLSContent } from '../dist/esm/Model/NLS.js';
import { ISY } from '../dist/esm/ISY.js';
import winston from 'winston';
import { setUncaughtExceptionCaptureCallback } from 'process';
import { buildNodeClassDefinitions } from '../dist/esm/Model/ClassDefinition.js';
import { toArray } from '../dist/esm/Utils.js';
const format = winston.format;
const myFormat = format.combine(format.splat(), winston.format.printf(info => {
    const d = new Date();
    const dStr = d.getFullYear() + '-' +
        zPad2(d.getMonth() + 1) + '-' +
        zPad2(d.getDate()) + ' ' +
        zPad2(d.getHours()) + ':' +
        zPad2(d.getMinutes()) + ':' +
        zPad2(d.getSeconds());
    return `${dStr} ${info.level}: ${info.label}: ${info.message}`;
}));
const logger = winston.loggers.add('codegen', { format: winston.format.label({ label: 'codegen' }), transports: [new winston.transports.Console({ level: 'info', format: myFormat }), new winston.transports.File({ filename: 'isy.log', level: 'info', format: myFormat })], exitOnError: false });
// Zero padding
function zPad2(str) {
    return str.toString().padStart(2, '0');
}
// Creates a debug.log symLink to the real log file to be used by Polyglot UI
// Log message formatter
setUncaughtExceptionCaptureCallback(cb => logger.error(cb));
const isy = new ISY({ host: '192.168.1.50', username: 'admin', password: 'qazWSX12', port: 8080, protocol: 'http' }, logger);
isy.initialize().catch(p => logger.error(p)).finally(() => isy.sendRequest('profiles/files').then(p => parseProfileFiles(p)));
const nodeDefMap = new Map();
async function parseProfileFiles(data) {
    for (const p of data.profiles?.profile) {
        for (const f of p.files) {
            if (f.dir) {
                if (f.file) {
                    try {
                        var response = await isy.sendRequest(`profiles/family/${p.family}/profile/${p.id}/download/${f.dir}/${f.file?.name}`, { trailingSlash: false, responseLogLevel: 'DEBUG', requestLogLevel: 'DEBUG' });
                        var family = p.family;
                        if (data) {
                            switch (f.dir) {
                                case "nls":
                                    parseNLS(response, family);
                                    break;
                                case "nodedef":
                                    parseNodeDefs(response, family);
                                    break;
                                case "editor":
                                    parseEditorDefs(response, family);
                                    //logger.info(JSON.stringify(response, null, 2));
                                    break;
                                case "linkdef":
                                    //logger.info(JSON.stringify(response, null, 2));
                                    break;
                                case "emap":
                                    parseEventMap(response, family);
                                    //logger.info(JSON.stringify(response, null, 2));
                                    break;
                                default:
                                    logger.info(JSON.stringify({ request: f.file?.name, response }, null, 2));
                                    break;
                            }
                        }
                    }
                    catch (error) {
                        logger.warn(`Error downloading ${f.dir}/${f.file?.name}: ${error}`);
                    }
                }
            }
        }
        let nodeList = nodeDefMap.get(p.family);
        try {
            if (nodeList) {
                const classDefs = buildNodeClassDefinitions(nodeList, p.family);
                writeFileSync(`./CLI/resources/nodeClassDef_${p.family}.json`, JSON.stringify(classDefs, null, 2));
            }
        }
        catch (e) {
            logger.error(e.message, e.stack);
        }
    }
    // for (const family of nodeDefMap.keys()) {
    //      buildNodeClassDefinitions(nodeDefMap.get(family), family);
    // }
}
function parseNLS(data, family = Family.Insteon) {
    //const filePath = path.join(__dirname, "nls.txt");
    const parsedData = parseNLSContent(data, family);
    writeFileSync(`./CLI/resources/nls_${family}.json`, JSON.stringify(parsedData, null, 2));
}
//logger.info(JSON.stringify(parsedData,null,2));
//console.log(parsedData);
const nodeDefs = new Map();
function parseNodeDefs(data, family = Family.Insteon) {
    //const filePath = path.join(__dirname, "nls.txt");
    writeFileSync(`./CLI/resources/nodeDefs_${family}.json`, JSON.stringify(data, null, 2));
    let s = data;
    nodeDefMap.set(family, toArray(s?.nodeDef));
    //logger.info(JSON.stringify(parsedData,null,2));
    //console.log(parsedData);
}
function parseEditorDefs(response, family) {
    writeFileSync(`./CLI/resources/editorDefs_${family}.json`, JSON.stringify(response, null, 2));
}
function parseEventMap(response, family) {
    writeFileSync(`./CLI/resources/eventMap_${family}.json`, JSON.stringify(response, null, 2));
}
export function buildDeviceMap() {
    var fams = {};
    DeviceMapJSON.forEach((item) => {
        var id = item.id;
        var fam = { id: item.id, description: item.description, name: item.name, categories: {} };
        //fams.set(id, { id: item.id, description: item.description, name: item.name, categories: {}});
        //var famDef = fams[id] as FamilyDef<Family>;
        item.categories.forEach((element) => {
            element.devices = element.devices.sort((a, b) => a.id - b.id);
            var catDef = { id: element.id, name: element.name, devices: {} };
            element.devices.forEach(device => {
                const r = InsteonDeviceFactory.getDeviceDetails({
                    family: item.id,
                    type: `${element.id}.${device.id}.0.0`,
                    address: '0 0 0 1',
                    nodeDefId: '',
                    enabled: undefined,
                    pnode: undefined,
                    name: '',
                    startDelay: 0,
                    hint: '',
                    endDelay: 0,
                    wattage: 0,
                    dcPeriod: 0
                });
                if (!r.unsupported) {
                    device.name = r.name;
                    device.modelNumber = r.modelNumber;
                    device.class = r.class?.name;
                }
                //@ts-ignore
                catDef.devices[device.id] = { id: device.id, type: `${element.id}.${device.id}.*.*`, modelNumber: device.modelNumber, name: device.name, class: device.class };
            });
            fam.categories[element.name] = catDef;
            //@ts-ignore
            fams[Family[item.id]] = fam;
        });
    });
    writeFileSync("DeviceMapClean.json", JSON.stringify(fams));
}
//isy.callISY('profiles/files').then(p => console.log(JSON.stringify(p)));
//buildDeviceMap();
