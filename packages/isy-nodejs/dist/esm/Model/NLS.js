import { Family } from "../Definitions/Global/Families.js";
import "../Utils.js";
export var NLSRecordType;
(function (NLSRecordType) {
    NLSRecordType["Generic"] = "GEN";
    NLSRecordType["Driver"] = "ST";
    NLSRecordType["Command"] = "CMD";
    NLSRecordType["NodeDef"] = "ND";
    NLSRecordType["NodeDefNLS"] = "NDN";
    NLSRecordType["DeviceInfo"] = "DEV";
    NLSRecordType["CommandParameter"] = "CMDP";
    NLSRecordType["CommandParameterNLS"] = "CMDPN";
    NLSRecordType["LinkProtocol"] = "LNKP";
    NLSRecordType["LinkParameter"] = "LNKD";
    NLSRecordType["Index"] = "IX";
    NLSRecordType["Other"] = "OTHER";
    NLSRecordType["Program"] = "PGM";
})(NLSRecordType || (NLSRecordType = {}));
export class NLSBaseRecord {
    type;
    key;
    value;
}
export class NLSNodeDefFilteredRecord {
    type;
    nlsId;
    value;
    meta;
    constructor(type, tokens, value) {
        this.type = type;
        this.value = value;
    }
    parseKey(tokens) {
        this.nlsId = tokens.pop() ?? 'Generic';
        this.meta = tokens.length > 0 ? tokens.join("-") : undefined;
    }
}
export class NLSCommandRecord extends NLSNodeDefFilteredRecord {
    command;
    property;
    constructor(tokens, value) {
        super(NLSRecordType.Command, tokens, value);
        this.parseKey(tokens);
    }
    parseKey(tokens) {
        this.property = tokens.pop();
        this.command = tokens.pop();
        super.parseKey(tokens);
    }
}
export class NLSGenericRecord extends NLSNodeDefFilteredRecord {
    key;
    property;
    constructor(tokens, value) {
        super(NLSRecordType.Generic, tokens, value);
        this.parseKey(tokens);
    }
    parseKey(tokens) {
        this.property = tokens.pop() ?? 'NAME';
        this.key = tokens.pop();
        super.parseKey(tokens);
        //this.property = tokens[1];
    }
}
export class NLSCommandParameterRecord extends NLSNodeDefFilteredRecord {
    commandParameter;
    property;
    editorId;
    constructor(type, tokens, value) {
        super(type, tokens, value);
        this.parseKey(tokens);
    }
    parseKey(tokens) {
        this.property = tokens.pop();
        this.commandParameter = tokens.pop();
        if (this.type == NLSRecordType.CommandParameter) {
            this.editorId = tokens.pop() ?? undefined;
        }
        super.parseKey(tokens);
    }
}
export class NLSDriverRecord extends NLSNodeDefFilteredRecord {
    driver;
    property;
    constructor(tokens, value) {
        super(NLSRecordType.Driver, tokens, value);
        this.parseKey(tokens);
    }
    parseKey(tokens) {
        this.property = tokens.pop();
        this.driver = tokens.pop();
        super.parseKey(tokens);
    }
}
export const NLSIndexMap = new Map();
export const NLSTranslations = new Map();
const StdTranslations = {
    ONOFF: "OnOff",
    ZY: "ZWave",
    ZB: "ZigBee",
    BOOL: "Boolean",
    L255: "Level255",
    PCT: "Percent",
    DIR: "Direction",
    SIR: "Siren",
    MD: "Mode",
    LVL: "Level",
    IX: "Index",
    OPTS: "Options",
    LST: "List",
    TMR: "Timer",
    BRD: "Bridge",
    CFN: "Configuration",
    PWR: "Power",
    VOLT: "Voltage",
    CURR: "Current",
    BATLVL: "BatteryLevel",
    BAT: "Battery",
    TEMP: "Temperature",
    HUM: "Humidity",
    LUM: "Luminance",
    RR: "RampRate",
    FL: "FanLevel",
    BL: "Backlight",
    ST: "State",
    STS: "Status",
    ERR: "Error",
    PARAM: "Parameter",
    LEN: "Length",
    OL: "OnLevel",
    DLY: "Delay",
    "+": "With",
    "(": "",
    ")": "",
    TVOL: "ToneVolume",
};
NLSTranslations.set(Family.Generic, StdTranslations);
export function addToIndexMap(family, record) {
    if (!NLSIndexMap.has(family)) {
        NLSIndexMap.set(family, {});
    }
    const indexMap = NLSIndexMap.get(family);
    if (!indexMap[record.indexType]) {
        indexMap[record.indexType] = {};
    }
    indexMap[record.indexType][record.indexValue] = record.value;
}
export function addToTranslationMap(family, record) {
    if (!NLSTranslations.has(family)) {
        NLSTranslations.set(family, {});
    }
    const translationMap = NLSTranslations.get(family);
    if (record.property === 'NAME') {
        if (record.nlsId == 'Generic') {
            if (record instanceof NLSGenericRecord)
                translationMap[record.key] = record.value;
            else if (record instanceof NLSDriverRecord)
                translationMap[record.driver] = record.value;
            else if (record instanceof NLSCommandRecord)
                translationMap[record.command] = record.value;
        }
        //translationMap[record.key] = record.value;
    }
}
export function applyTranslations(family, value) {
    if (value.includes('_')) {
        return value.split('_').map((v) => applyTranslations(family, v)).join('_');
    }
    value = value.trim();
    if (family !== Family.Generic) {
        value = applyTranslations(Family.Generic, value);
    }
    if (NLSRecordMap.has(family)) {
        const map = NLSTranslations.get(family);
        for (const key in map) {
            if (value == key) {
                return map[key];
            }
        }
    }
    return value;
}
export function createMap(content, family) {
    const map = {};
    NLSRecordMap.delete(family);
    for (const record of parseNLSContent(content, family)) {
        const key = record.nlsId ?? "Generic";
        if (!map[key]) {
            map[key] = {};
        }
        if (map[key][record.type]) {
            map[key][record.type].push(record);
        }
        else {
            map[key][record.type] = [record];
        }
    }
    NLSRecordMap.set(family, map);
    return map;
}
export const NLSRecordMap = new Map();
export function parseNLSContent(content, family) {
    const lines = content.split("\n");
    const result = [];
    const NLSRecords = new Array();
    let currentComment = "";
    lines.forEach((line) => {
        line = line.trim();
        if (line === "") {
            return; // Skip comments and empty lines
        }
        else if (line.startsWith("#")) {
            currentComment = line.trim();
        }
        let [key, value] = line.split("=");
        if (key && value) {
            key = key.trim();
            const tokens = key.split("-");
            value = value.trim();
            if (tokens.length > 0) {
                if (tokens[0].startsWith("IX")) {
                    const recordType = NLSRecordType.Index;
                    const indexType = tokens.shift();
                    const indexValue = tokens.shift();
                    const indexNLS = { comment: currentComment, type: recordType, value: value, indexType: indexType, indexValue: Number(indexValue) };
                    NLSRecords.push(indexNLS);
                    addToIndexMap(family, indexNLS);
                }
                else {
                    const recordType = tokens.shift();
                    switch (recordType) {
                        case NLSRecordType.Generic:
                            const genericRecord = new NLSGenericRecord(tokens, value);
                            NLSRecords.push(genericRecord);
                            addToTranslationMap(family, genericRecord);
                            break;
                        case NLSRecordType.Driver:
                            const driverRecord = new NLSDriverRecord(tokens, value);
                            NLSRecords.push(driverRecord);
                            addToTranslationMap(family, driverRecord);
                            break;
                        case NLSRecordType.Command:
                            const commandRecord = new NLSCommandRecord(tokens, value);
                            NLSRecords.push(commandRecord);
                            addToTranslationMap(family, commandRecord);
                            break;
                        case NLSRecordType.NodeDef:
                            const nodeDefRecord = {
                                type: recordType,
                                value: value,
                                nodeDefId: tokens.shift(),
                                property: tokens.shift(),
                                meta: tokens.length > 0 ? tokens.join("-") : undefined,
                            };
                            NLSRecords.push(nodeDefRecord);
                            break;
                        case NLSRecordType.NodeDefNLS:
                            const nodeDefNameRecord = {
                                type: recordType,
                                value: value,
                                nlsId: tokens.shift(),
                                property: tokens.shift(),
                                meta: tokens.length > 0 ? tokens.join("-") : undefined,
                            };
                            NLSRecords.push(nodeDefNameRecord);
                            break;
                        case NLSRecordType.DeviceInfo:
                            const deviceInfoRecord = {
                                type: recordType,
                                nlsId: tokens.shift(),
                                property: tokens.shift(),
                                meta: tokens.join("-"),
                                value,
                            };
                            NLSRecords.push(deviceInfoRecord);
                            break;
                        case NLSRecordType.CommandParameter || NLSRecordType.CommandParameterNLS:
                            const commandParameterRecord = new NLSCommandParameterRecord(recordType, tokens, value);
                            NLSRecords.push(commandParameterRecord);
                            break;
                        case NLSRecordType.LinkProtocol:
                            const linkProtocolRecord = {
                                type: recordType,
                                protocol: tokens.shift(),
                                property: tokens.shift(),
                                meta: tokens.length > 0 ? tokens.join("-") : undefined,
                                value,
                            };
                            NLSRecords.push(linkProtocolRecord);
                            break;
                        case NLSRecordType.LinkParameter:
                            const linkParameterRecord = {
                                type: recordType,
                                parameter: tokens.shift(),
                                property: tokens.shift(),
                                meta: tokens.join("-"),
                                value,
                            };
                            NLSRecords.push(linkParameterRecord);
                            break;
                        case NLSRecordType.Program:
                            const programRecord = { type: recordType, key: tokens.join("-"), value };
                            NLSRecords.push(programRecord);
                            break;
                        default:
                            const otherRecord = { type: recordType, key: tokens.join("-"), value };
                            NLSRecords.push(otherRecord);
                            break;
                    }
                }
                const key = tokens;
            }
            result.push({ tokens, value: value.trim() });
        }
    });
    return NLSRecords;
}
// Example usage
//# sourceMappingURL=NLS.js.map