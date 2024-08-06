import type { DriverType } from '../Definitions/Global/Drivers.js';
import { Family } from '../Definitions/Global/Families.js';
import '../Utils.js';
export declare enum NLSRecordType {
    Generic = "GEN",
    Driver = "ST",
    Command = "CMD",
    NodeDef = "ND",
    DeviceInfo = "DEV",
    CommandParameter = "CMDP",
    LinkProtocol = "LNKP",
    LinkParameter = "LNKD",
    Index = "IX",
    Other = "OTHER",
    Program = "PGM"
}
export interface NLSRecord<T extends NLSRecordType> {
    type: NLSRecordType;
    value: string;
    nodeDefId?: string;
}
export declare class NLSBaseRecord<T extends NLSRecordType> implements NLSRecord<T> {
    type: NLSRecordType;
    key: string;
    value: string;
}
declare abstract class NLSNodeDefFilteredRecord<T extends NLSRecordType> implements NLSRecord<T> {
    type: T;
    nodeDefId?: string;
    value: string;
    meta: string;
    constructor(tokens: string[], value: string);
    parseKey(tokens: string[]): void;
}
export declare class NLSCommandRecord extends NLSNodeDefFilteredRecord<NLSRecordType.Command> {
    command: string;
    property: string;
    constructor(tokens: string[], value: string);
    parseKey(tokens: string[]): void;
}
export declare class NLSGenericRecord extends NLSNodeDefFilteredRecord<NLSRecordType.Generic> {
    command: string;
    property: string;
    constructor(tokens: string[], value: string);
    parseKey(tokens: string[]): void;
}
export declare class NLSCommandParameterRecord extends NLSNodeDefFilteredRecord<NLSRecordType.CommandParameter> {
    commandParameter: string;
    property: string;
    constructor(tokens: string[], value: string);
    parseKey(tokens: string[]): void;
}
export declare class NLSDriverRecord extends NLSNodeDefFilteredRecord<NLSRecordType.Driver> {
    driver: DriverType;
    property: string;
    constructor(tokens: string[], value: string);
    parseKey(tokens: string[]): void;
}
export declare function createMap<T extends Family>(content: string, family: T): Map<string, {
    [x in NLSRecordType]?: NLSRecord<x>[];
}>;
export declare const NLSRecordMap: Map<Family, Map<string, {
    [x in NLSRecordType]?: NLSRecord<x>[];
}>>;
export declare function parseNLSContent<T extends Family>(content: string, family: T): NLSRecord<NLSRecordType>[];
export {};
