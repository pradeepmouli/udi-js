"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = void 0;
exports.getEnumValueByEnumKey = getEnumValueByEnumKey;
exports.getEnumKeyByEnumValue = getEnumKeyByEnumValue;
exports.toArray = toArray;
exports.fromArray = fromArray;
exports.byteToPct = byteToPct;
exports.pctToByte = pctToByte;
exports.byteToDegree = byteToDegree;
exports.valueOf = valueOf;
exports.clone = clone;
exports.right = right;
exports.left = left;
exports.rightWithToken = rightWithToken;
exports.leftWithToken = leftWithToken;
exports.remove = remove;
exports.removeAll = removeAll;
exports.parseTypeCode = parseTypeCode;
exports.getCategory = getCategory;
exports.getSubcategory = getSubcategory;
exports.findPackageJson = findPackageJson;
const winston_1 = __importStar(require("winston"));
const events_1 = require("events");
const Categories_js_1 = require("./Definitions/Global/Categories.js");
//import { get } from 'http';
const package_json_1 = __importDefault(require("@npmcli/package-json"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
function getEnumValueByEnumKey(enumType, enumKey) {
    return enumType[enumKey];
}
function getEnumKeyByEnumValue(enumType, enumValue) {
    return Object.keys(enumType).find((key) => enumType[key] === enumValue);
}
function toArray(value) {
    if (undefined === value)
        return [];
    return Array.isArray(value) ? value : [value];
}
function fromArray(...value) {
    if (value.length === 1) {
        return value[0] ?? undefined;
    }
    return value;
}
function byteToPct(value) {
    return Math.round((value * 100) / 255);
}
function pctToByte(value) {
    return Math.round((value * 255) / 100);
}
function byteToDegree(value) {
    return Math.fround(value / 2);
}
let lastrequest = Promise.resolve();
// `${`${const origCreateLogger = winston.createLogger.bind(winston)
// Logger.prototwinston.createLogger = (options) =>
// {
// let logger =  winston.createLogger(options);
// logger.prototype = logger.log.bind(logger);
// }
// }`}`
function valueOf(e, val) {
    return e[val];
}
function clone(logger, label) {
    return winston_1.default.createLogger({
        format: winston_1.format.label({ label }),
        transports: logger.transports,
        level: logger.level,
        levels: logger.levels,
        exitOnError: logger.exitOnError,
        exceptionHandlers: logger.exceptions,
        ...logger
    });
    // `${const copy1 = { ...logger };copy1.prefix = copy1.prefix = prefix ?? logger.prototype;
    // const copy = logger.info.bind(copy1) as Logging;
    // Object.assign(copy, logger);
    // copy.prefix = prefix ?? logger.prefix;
    // copy.isDebugEnabled = () => ISYPlatform.Instance.debugLoggingEnabled;
    // copy.isErrorEnabled = () => true;
    // copy.isWarnEnabled = () => true;
    // copy.isFatalEnabled = () => true;
    // copy.isTraceEnabled = () => true;
    // // copy._log = logger._log.bind(copy);
    // copy.debug = logger.debug.bind(copy);
    // // copy.fatal = logger..bind(copy);
    // copy.info = logger.info.bind(copy);
    // copy.error = logger.error.bind(copy);
    // copy.warn = logger.warn.bind(copy);
    // copy.trace = ((message: ConcatArray<string>, ...args: any[]) => {
    // 	// onst newMsg = chalk.dim(msg);
    // 	if (copy.isTraceEnabled) {
    // 		copy.log.apply(this, ['trace'].concat(message).concat(args));
    // 	}
    // }).bind(copy);
    // copy.fatal = ((message: ConcatArray<string>, ...args: any[]) => {
    // 	// onst newMsg = chalk.dim(msg);
    // 	if (logger?.isFatalEnabled) {
    // 		logger.log.apply(this, ['fatal'].concat(message).concat(args));
    // 	}
    // }).bind(copy);}`
    //return copy;
}
class EventEmitter extends events_1.EventEmitter {
    // #region Public Methods (1)
    on(event, listener) {
        return super.on(event, listener);
    }
}
exports.EventEmitter = EventEmitter;
function right(numChars) {
    var l = this.length;
    return this.substring(length - numChars);
}
function left(numChars) {
    return this.substring(0, numChars - 1);
}
function rightWithToken(maxNumChars, token = ' ') {
    var s = this.split(token);
    var sb = s.pop();
    var sp = s.pop();
    while (sp !== undefined && sb.length + sp.length + token.length <= maxNumChars) {
        sb = sp + token + sb;
        sp = s.pop();
    }
}
function leftWithToken(maxNumChars, token = ' ') {
    var s = this.split(token).reverse();
    var sb = s.pop();
    var sp = s.pop();
    while (sp !== undefined && sb.length + sp?.length + token.length <= maxNumChars) {
        sb = sb + token + sp;
        sp = s.pop();
    }
}
function remove(searchValue) {
    return this.replace(searchValue, '');
}
function removeAll(searchValue) {
    return this.replaceAll(searchValue, '');
}
function parseTypeCode(typeCode) {
    try {
        const s = typeCode.split('.');
        let output = { category: Number(s[0]), deviceCode: Number(s[1]), firmwareVersion: Number(Number(s[2]).toString(16)), minorVersion: Number(Number(s[3]).toString(16)) };
        return output;
    }
    catch (err) {
        return null;
    }
}
function getCategory(device) {
    try {
        const s = device.type.split('.');
        return Number(s[0]);
    }
    catch (err) {
        return Categories_js_1.Category.Unknown;
    }
}
function getSubcategory(device) {
    try {
        const s = device.type.split('.');
        return Number(s[1]);
    }
    catch (err) {
        return Categories_js_1.Category.Unknown;
    }
}
function getImportMeta() {
    try {
        //@ts-ignore
        return import.meta;
    }
    catch (err) {
        //@ts-ignore
        let { dirname, filename } = { dirname: __dirname, filename: __filename };
        return { dirname, filename };
    }
}
async function findPackageJson(currentPath = getImportMeta()?.dirname) {
    while (currentPath !== '/') {
        const packageJsonPath = path_1.default.join(currentPath, 'package.json');
        if ((0, fs_1.existsSync)(packageJsonPath)) {
            return await package_json_1.default.load(currentPath);
        }
        currentPath = path_1.default.join(currentPath, '..');
    }
    return null;
}
//# sourceMappingURL=Utils.js.map