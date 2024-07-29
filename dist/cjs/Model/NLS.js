"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NLSRecordMap = exports.NLSDriverRecord = exports.NLSCommandParameterRecord = exports.NLSGenericRecord = exports.NLSCommandRecord = exports.NLSBaseRecord = exports.NLSRecordType = void 0;
exports.createMap = createMap;
exports.parseNLSContent = parseNLSContent;
require("../Utils.js");
var NLSRecordType;
(function (NLSRecordType) {
    NLSRecordType["Generic"] = "GEN";
    NLSRecordType["Driver"] = "ST";
    NLSRecordType["Command"] = "CMD";
    NLSRecordType["NodeDef"] = "ND";
    NLSRecordType["DeviceInfo"] = "DEV";
    NLSRecordType["CommandParameter"] = "CMDP";
    NLSRecordType["LinkProtocol"] = "LNKP";
    NLSRecordType["LinkParameter"] = "LNKD";
    NLSRecordType["Index"] = "IX";
    NLSRecordType["Other"] = "OTHER";
    NLSRecordType["Program"] = "PGM";
})(NLSRecordType || (exports.NLSRecordType = NLSRecordType = {}));
class NLSBaseRecord {
    type;
    key;
    value;
}
exports.NLSBaseRecord = NLSBaseRecord;
class NLSNodeDefFilteredRecord {
    type;
    nodeDefId;
    value;
    meta;
    constructor(tokens, value) {
        if (tokens.length > 2) {
            this.nodeDefId = tokens.shift();
        }
        else {
            this.nodeDefId = "Generic";
        }
        this.parseKey(tokens);
        this.value = value;
    }
    parseKey(tokens) {
        this.meta = tokens.length > 0 ? tokens.join("-") : undefined;
    }
}
class NLSCommandRecord extends NLSNodeDefFilteredRecord {
    command;
    property;
    constructor(tokens, value) {
        super(tokens, value);
        this.parseKey(tokens);
        this.type = NLSRecordType.Command;
    }
    parseKey(tokens) {
        this.command = tokens.shift();
        this.property = tokens.shift();
        super.parseKey(tokens);
    }
}
exports.NLSCommandRecord = NLSCommandRecord;
class NLSGenericRecord extends NLSNodeDefFilteredRecord {
    command;
    property;
    constructor(tokens, value) {
        super(tokens, value);
        this.parseKey(tokens);
        this.type = NLSRecordType.Generic;
    }
    parseKey(tokens) {
        this.property = tokens.shift();
        super.parseKey(tokens);
        //this.property = tokens[1];
    }
}
exports.NLSGenericRecord = NLSGenericRecord;
class NLSCommandParameterRecord extends NLSNodeDefFilteredRecord {
    commandParameter;
    property;
    constructor(tokens, value) {
        super(tokens, value);
        this.parseKey(tokens);
        this.type = NLSRecordType.CommandParameter;
    }
    parseKey(tokens) {
        this.commandParameter = tokens.shift();
        this.property = tokens.shift();
        super.parseKey(tokens);
    }
}
exports.NLSCommandParameterRecord = NLSCommandParameterRecord;
class NLSDriverRecord extends NLSNodeDefFilteredRecord {
    driver;
    property;
    constructor(tokens, value) {
        super(tokens, value);
        this.parseKey(tokens);
        this.type = NLSRecordType.Driver;
    }
    parseKey(tokens) {
        this.driver = tokens.shift();
        this.property = tokens.shift();
        super.parseKey(tokens);
    }
}
exports.NLSDriverRecord = NLSDriverRecord;
function createMap(content, family) {
    const map = new Map();
    exports.NLSRecordMap.delete(family);
    for (const record of parseNLSContent(content, family)) {
        const key = record.nodeDefId ?? 'Generic';
        const existing = map.get(key) ?? {};
        if (map.has(key)) {
        }
        if (record instanceof NLSNodeDefFilteredRecord || record.nodeDefId) {
            if (map.has(record.nodeDefId ?? 'Generic')) {
                const existing = map.get(record.value);
                if (existing[record.type]) {
                    existing[record.type].push(record);
                }
                else {
                    existing[record.type] = [record];
                }
            }
        }
        else {
            const newRecord = { [record.type]: [record] };
            map.set('Generic', newRecord);
        }
    }
    exports.NLSRecordMap.set(family, map);
    return map;
}
exports.NLSRecordMap = new Map();
function parseNLSContent(content, family) {
    const lines = content.split("\n");
    const result = [];
    const NLSRecords = new Array();
    lines.forEach((line) => {
        line = line.trim();
        if (line.startsWith("#") || line === "") {
            return; // Skip comments and empty lines
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
                    const indexNLS = { type: recordType, value: value, indexType: indexType, indexValue: indexValue };
                    NLSRecords.push(indexNLS);
                }
                else {
                    const recordType = tokens.shift();
                    switch (recordType) {
                        case NLSRecordType.Generic:
                            const genericRecord = new NLSGenericRecord(tokens, value);
                            NLSRecords.push(genericRecord);
                            break;
                        case NLSRecordType.Driver:
                            const driverRecord = new NLSDriverRecord(tokens, value);
                            NLSRecords.push(driverRecord);
                            break;
                        case NLSRecordType.Command:
                            const commandRecord = new NLSCommandRecord(tokens, value);
                            NLSRecords.push(commandRecord);
                            break;
                        case NLSRecordType.NodeDef:
                            const nodeDefRecord = {
                                type: recordType,
                                value: value,
                                nodeDefId: tokens.shift(),
                                property: tokens.shift(),
                                meta: tokens.length > 0 ? tokens.join('-') : undefined
                            };
                            NLSRecords.push(nodeDefRecord);
                            break;
                        case NLSRecordType.DeviceInfo:
                            const deviceInfoRecord = {
                                type: recordType,
                                deviceCode: tokens.shift(),
                                property: tokens.shift(),
                                meta: tokens.join("-"),
                                value,
                            };
                            NLSRecords.push(deviceInfoRecord);
                            break;
                        case NLSRecordType.CommandParameter:
                            const commandParameterRecord = new NLSCommandParameterRecord(tokens, value);
                            NLSRecords.push(commandParameterRecord);
                            break;
                        case NLSRecordType.LinkProtocol:
                            const linkProtocolRecord = {
                                type: recordType,
                                protocol: tokens.shift(),
                                property: tokens.shift(),
                                meta: tokens.length > 0 ? tokens.join('-') : undefined,
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
