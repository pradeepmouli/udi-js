//import { generateTemplateClassesFromXSD } from 'xsd2ts';
//generateTemplateClassesFromXSD('./dependency.xsd');
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { Family } from "isy-nodejs/Definitions/Global/Families";
import { InsteonDeviceFactory } from 'isy-nodejs/Devices/Insteon/InsteonDeviceFactory';
import { ISY } from 'isy-nodejs/ISY';
import { buildEditorDefMap } from 'isy-nodejs/Model/EditorDef';
import { createMap, NLSIndexMap } from 'isy-nodejs/Model/NLS';
import { toArray } from 'isy-nodejs/Utils';
import { setUncaughtExceptionCaptureCallback } from 'process';
import winston from 'winston';
import DeviceMapJSON from './DeviceMap.json' with { type: 'json' };
import { generateEnumDefs, generateNodeClassDefs } from './generate-nodeclasses.js';
const format = winston.format;
const myFormat = format.combine(format.splat(), winston.format.printf((info) => {
    const d = new Date();
    const dStr = d.getFullYear() +
        "-" +
        zPad2(d.getMonth() + 1) +
        "-" +
        zPad2(d.getDate()) +
        " " +
        zPad2(d.getHours()) +
        ":" +
        zPad2(d.getMinutes()) +
        ":" +
        zPad2(d.getSeconds());
    return `${dStr} ${info.level}: ${info.label}: ${info.message}`;
}), format.colorize({ all: true }));
const logger = winston.loggers.add('defgen', { format: winston.format.label({ label: 'defgen' }), transports: [new winston.transports.Console({ level: 'info', format: myFormat }), new winston.transports.File({ filename: 'defgen.log', level: 'debug', format: myFormat })], exitOnError: false, levels: winston.config.cli.levels });
// Zero padding
function zPad2(str) {
    return str.toString().padStart(2, '0');
}
// Creates a debug.log symLink to the real log file to be used by Polyglot UI
// Log message formatter
setUncaughtExceptionCaptureCallback(cb => logger.error(cb));
const isy = new ISY({ host: '192.168.1.50', username: 'admin', password: 'qazWSX12', port: 8080, protocol: 'http' }, logger);
isy.initialize().catch(p => logger.error(p)).finally(() => isy.sendRequest('profiles/files').then(p => parseProfileFiles(p)));
export const nodeDefMap = new Map();
async function parseProfileFiles(data) {
    if (!existsSync('./resources/')) {
        mkdirSync('./resources');
    }
    for (const p of data.profiles?.profile) {
        for (const f of p.files) {
            if (f.dir) {
                if (f.file) {
                    try {
                        var response = await isy.sendRequest(`profiles/family/${p.family}/profile/${p.id}/download/${f.dir}/${f.file?.name}`, { trailingSlash: false, responseLogLevel: winston.config.cli.levels.debug, requestLogLevel: winston.config.cli.levels.debug });
                        var family = p.family;
                        if (data) {
                            switch (f.dir) {
                                case "nls":
                                    parseNLS(response, family, p.id);
                                    break;
                                case "nodedef":
                                    parseNodeDefs(response, family, p.id);
                                    break;
                                case "editor":
                                    parseEditorDefs(response, family, p.id);
                                    //logger.info(JSON.stringify(response, null, 2));
                                    break;
                                case "linkdef":
                                    parseLinkDefs(response, family, p.id);
                                    //logger.info(JSON.stringify(response, null, 2));
                                    break;
                                case "emap":
                                    parseEventMap(response, family, p.id);
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
    }
    generateEnumDefs();
    generateNodeClassDefs();
    // for (const family of nodeDefMap.keys()) {
    //      buildNodeClassDefinitions(nodeDefMap.get(family), family);
    // }
}
// function generateNodeClassDefs(p: any) {
//     let nodeList = nodeDefMap.get(p.family);
//     try {
//         if (nodeList) {
//             const classDefs = buildNodeClassDefinitions(nodeList, p.family, NLSRecordMap, EditorDefMap, NLSIndexMap);
//             if (!existsSync('./resources/nodeClassDefs/generated/')) {
//                 mkdirSync('./resources/nodeClassDefs/generated', { recursive: true });
//             }
//             writeFileSync(`./resources/nodeClassDefs/generated/nodeClassDefs_${p.family}.json`, JSON.stringify(classDefs, null, 2));
//             if (!existsSync(`./packages/isy-nodejs/src/Devices/${Family[p.family]}/Generated`))
//                 mkdirSync(`./packages/isy-nodejs/src/Devices/${Family[p.family]}/Generated`, { recursive: true });
//             const classes = buildNodeClasses(classDefs);
//             for (const c of classes) {
//                 try {
//                     var f = ts.createSourceFile(`./packages/isy-nodejs/src/Devices/${Family[p.family]}/Generated/${c.name}.ts`, "", ts.ScriptTarget.ES2022, false, ts.ScriptKind.TS);
//                     //@ts-expect-error
//                     f.statements = c.statements;
//                     let r = ts.createPrinter();
//                     writeFileSync(`./packages/isy-nodejs/src/Devices/${Family[p.family]}/Generated/${c.name}.ts`, r.printFile(f));
//                 }
//                 catch (e) {
//                     logger.error(`Error creating ${Family[p.family]} ${c.name} class: ${e.message}`, e.stack);
//                 }
//             }
//         }
//     }
//     catch (e) {
//         logger.error(e.message, e.stack);
//     }
// }
function parseNLS(data, family = Family.Insteon, profile) {
    //const filePath = path.join(__dirname, "nls.txt");
    if (!existsSync('./resources/nls_raw/')) {
        mkdirSync('./resources/nls_raw', { recursive: true });
    }
    writeFileSync(`./resources/nls_raw/${Family[family]}.txt`, data);
    const nlsMap = createMap(data, family);
    const indexMap = NLSIndexMap.get(family);
    if (!existsSync('./resources/nls/')) {
        mkdirSync('./resources/nls', { recursive: true });
    }
    if (nlsMap)
        writeFileSync(`./resources/nls/${Family[family]}.json`, JSON.stringify(nlsMap, null, 2));
    if (!existsSync('./resources/nls_index/')) {
        mkdirSync('./resources/nls_index', { recursive: true });
    }
    if (indexMap)
        writeFileSync(`./resources/nls_index/${Family[family]}.json`, JSON.stringify(indexMap, null, 2));
}
//logger.info(JSON.stringify(parsedData,null,2));
//console.log(parsedData);
function parseNodeDefs(data, family = Family.Insteon, profile) {
    //const filePath = path.join(__dirname, "nls.txt");
    let s = data.nodeDefs;
    nodeDefMap.set(family, toArray(s.nodeDef));
    if (!existsSync('./resources/nodeDefs/')) {
        mkdirSync('./resources/nodeDefs', { recursive: true });
    }
    writeFileSync(`./resources/nodeDefs/${Family[family]}.json`, JSON.stringify(data, null, 2));
    //logger.info(JSON.stringify(parsedData,null,2));
    //console.log(parsedData);
}
function parseEditorDefs(response, family, profile) {
    const editorMap = buildEditorDefMap(response.editors.editor, family);
    if (!existsSync('./resources/editorDefs/')) {
        mkdirSync('./resources/editorDefs');
    }
    writeFileSync(`./resources/editorDefs/${Family[family]}.json`, JSON.stringify(editorMap, null, 2));
}
function parseEventMap(response, family, profile) {
    if (!existsSync('./resources/eventMaps/')) {
        mkdirSync('./resources/eventMaps', { recursive: true });
    }
    writeFileSync(`./resources/eventMaps/${Family[family]}.json`, JSON.stringify(response, null, 2));
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
function parseLinkDefs(response, family, profile) {
    if (!existsSync('./resources/linkDefs/')) {
        mkdirSync('./resources/linkDefs');
    }
    writeFileSync(`./resources/linkDefs/${Family[family]}.json`, JSON.stringify(response, null, 2));
}
//isy.callISY('profiles/files').then(p => console.log(JSON.stringify(p)));
//buildDeviceMap();
//# sourceMappingURL=generate.js.map