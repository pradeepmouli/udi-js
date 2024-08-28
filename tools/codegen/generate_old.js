"use strict";
//import { generateTemplateClassesFromXSD } from 'xsd2ts';
//generateTemplateClassesFromXSD('./dependency.xsd');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildDeviceMap = buildDeviceMap;
var fs_1 = require("fs");
var Families_js_1 = require("isy-nodejs/Definitions/Global/Families.js");
var InsteonDeviceFactory_js_1 = require("isy-nodejs/Devices/Insteon/InsteonDeviceFactory.js");
var DeviceMap_json_1 = require("./DeviceMap.json");
var NLS_js_1 = require("isy-nodejs/Model/NLS.js");
var ISY_js_1 = require("isy-nodejs/ISY.js");
var winston_1 = require("winston");
var process_1 = require("process");
var ClassDefinition_js_1 = require("isy-nodejs/Model/ClassDefinition.js");
var Utils_js_1 = require("isy-nodejs/Utils.js");
var format = winston_1.default.format;
var myFormat = format.combine(format.splat(), winston_1.default.format.printf(function (info) {
    var d = new Date();
    var dStr = d.getFullYear() + '-' +
        zPad2(d.getMonth() + 1) + '-' +
        zPad2(d.getDate()) + ' ' +
        zPad2(d.getHours()) + ':' +
        zPad2(d.getMinutes()) + ':' +
        zPad2(d.getSeconds());
    return "".concat(dStr, " ").concat(info.level, ": ").concat(info.label, ": ").concat(info.message);
}));
var logger = winston_1.default.loggers.add('codegen', { format: winston_1.default.format.label({ label: 'codegen' }), transports: [new winston_1.default.transports.Console({ level: 'info', format: myFormat }), new winston_1.default.transports.File({ filename: 'isy.log', level: 'info', format: myFormat })], exitOnError: false });
// Zero padding
function zPad2(str) {
    return str.toString().padStart(2, '0');
}
// Creates a debug.log symLink to the real log file to be used by Polyglot UI
// Log message formatter
(0, process_1.setUncaughtExceptionCaptureCallback)(function (cb) { return logger.error(cb); });
var isy = new ISY_js_1.ISY({ host: '192.168.1.50', username: 'admin', password: 'qazWSX12', port: 8080, protocol: 'http' }, logger);
isy.initialize().catch(function (p) { return logger.error(p); }).finally(function () { return isy.sendRequest('profiles/files').then(function (p) { return parseProfileFiles(p); }); });
var nodeDefMap = new Map();
function parseProfileFiles(data) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, p, _b, _c, f, response, family, error_1, nodeList, classDefs;
        var _d, _e, _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    _i = 0, _a = (_d = data.profiles) === null || _d === void 0 ? void 0 : _d.profile;
                    _h.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 9];
                    p = _a[_i];
                    _b = 0, _c = p.files;
                    _h.label = 2;
                case 2:
                    if (!(_b < _c.length)) return [3 /*break*/, 7];
                    f = _c[_b];
                    if (!f.dir) return [3 /*break*/, 6];
                    if (!f.file) return [3 /*break*/, 6];
                    _h.label = 3;
                case 3:
                    _h.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, isy.sendRequest("profiles/family/".concat(p.family, "/profile/").concat(p.id, "/download/").concat(f.dir, "/").concat((_e = f.file) === null || _e === void 0 ? void 0 : _e.name), { trailingSlash: false, responseLogLevel: 'DEBUG', requestLogLevel: 'DEBUG' })];
                case 4:
                    response = _h.sent();
                    family = p.family;
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
                                logger.info(JSON.stringify({ request: (_f = f.file) === null || _f === void 0 ? void 0 : _f.name, response: response }, null, 2));
                                break;
                        }
                    }
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _h.sent();
                    logger.warn("Error downloading ".concat(f.dir, "/").concat((_g = f.file) === null || _g === void 0 ? void 0 : _g.name, ": ").concat(error_1));
                    return [3 /*break*/, 6];
                case 6:
                    _b++;
                    return [3 /*break*/, 2];
                case 7:
                    nodeList = nodeDefMap.get(p.family);
                    try {
                        if (nodeList) {
                            classDefs = (0, ClassDefinition_js_1.buildNodeClassDefinitions)(nodeList, p.family);
                            (0, fs_1.writeFileSync)("./CLI/resources/nodeClassDef_".concat(p.family, ".json"), JSON.stringify(classDefs, null, 2));
                        }
                    }
                    catch (e) {
                        logger.error(e.message, e.stack);
                    }
                    _h.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 1];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function parseNLS(data, family) {
    if (family === void 0) { family = Families_js_1.Family.Insteon; }
    //const filePath = path.join(__dirname, "nls.txt");
    var parsedData = (0, NLS_js_1.parseNLSContent)(data, family);
    (0, fs_1.writeFileSync)("./CLI/resources/nls_".concat(family, ".json"), JSON.stringify(parsedData, null, 2));
}
//logger.info(JSON.stringify(parsedData,null,2));
//console.log(parsedData);
var nodeDefs = new Map();
function parseNodeDefs(data, family) {
    if (family === void 0) { family = Families_js_1.Family.Insteon; }
    //const filePath = path.join(__dirname, "nls.txt");
    (0, fs_1.writeFileSync)("./CLI/resources/nodeDefs_".concat(family, ".json"), JSON.stringify(data, null, 2));
    var s = data;
    nodeDefMap.set(family, (0, Utils_js_1.toArray)(s === null || s === void 0 ? void 0 : s.nodeDef));
    //logger.info(JSON.stringify(parsedData,null,2));
    //console.log(parsedData);
}
function parseEditorDefs(response, family) {
    (0, fs_1.writeFileSync)("./CLI/resources/editorDefs_".concat(family, ".json"), JSON.stringify(response, null, 2));
}
function parseEventMap(response, family) {
    (0, fs_1.writeFileSync)("./CLI/resources/eventMap_".concat(family, ".json"), JSON.stringify(response, null, 2));
}
function buildDeviceMap() {
    var fams = {};
    DeviceMap_json_1.default.forEach(function (item) {
        var id = item.id;
        var fam = { id: item.id, description: item.description, name: item.name, categories: {} };
        //fams.set(id, { id: item.id, description: item.description, name: item.name, categories: {}});
        //var famDef = fams[id] as FamilyDef<Family>;
        item.categories.forEach(function (element) {
            element.devices = element.devices.sort(function (a, b) { return a.id - b.id; });
            var catDef = { id: element.id, name: element.name, devices: {} };
            element.devices.forEach(function (device) {
                var _a;
                var r = InsteonDeviceFactory_js_1.InsteonDeviceFactory.getDeviceDetails({
                    family: item.id,
                    type: "".concat(element.id, ".").concat(device.id, ".0.0"),
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
                    device.class = (_a = r.class) === null || _a === void 0 ? void 0 : _a.name;
                }
                //@ts-ignore
                catDef.devices[device.id] = { id: device.id, type: "".concat(element.id, ".").concat(device.id, ".*.*"), modelNumber: device.modelNumber, name: device.name, class: device.class };
            });
            fam.categories[element.name] = catDef;
            //@ts-ignore
            fams[Families_js_1.Family[item.id]] = fam;
        });
    });
    (0, fs_1.writeFileSync)("DeviceMapClean.json", JSON.stringify(fams));
}
//isy.callISY('profiles/files').then(p => console.log(JSON.stringify(p)));
//buildDeviceMap();
