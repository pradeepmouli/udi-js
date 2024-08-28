import type { DriverType } from "../Definitions/Global/Drivers.js";
import { Family } from "../Definitions/Global/Families.js";
import "../Utils.js";
export declare enum NLSRecordType {
    Generic = "GEN",
    Driver = "ST",
    Command = "CMD",
    NodeDef = "ND",
    NodeDefNLS = "NDN",
    DeviceInfo = "DEV",
    CommandParameter = "CMDP",
    CommandParameterNLS = "CMDPN",
    LinkProtocol = "LNKP",
    LinkParameter = "LNKD",
    Index = "IX",
    Other = "OTHER",
    Program = "PGM"
}
export type NLSRecordTypeMap = {
    "GEN"?: NLSGenericRecord[];
    "ST"?: NLSDriverRecord[];
    "CMD"?: NLSCommandRecord[];
    "ND"?: {
        type: NLSRecordType.NodeDef;
        nodeDefId: string;
        property: string;
        meta: string;
        value: string;
    }[];
    "NDN"?: {
        type: NLSRecordType.NodeDefNLS;
        nlsId: string;
        property: string;
        meta: string;
        value: string;
    }[];
    "DEV"?: {
        type: NLSRecordType.DeviceInfo;
        deviceCode: string;
        property: string;
        meta: string;
        value: string;
    }[];
    "CMDP"?: NLSCommandParameterRecord[];
    "CMDPN"?: NLSCommandParameterRecord[];
    "LNKP"?: {
        type: NLSRecordType.LinkProtocol;
        protocol: string;
        property: string;
        meta: string;
        value: string;
    }[];
    "LNKD"?: {
        type: NLSRecordType.LinkParameter;
        parameter: string;
        property: string;
        meta: string;
        value: string;
    }[];
    "IX"?: {
        type: NLSRecordType.Index;
        indexType: string;
        indexValue: number;
        value: string;
    }[];
    "OTHER"?: {
        type: NLSRecordType.Other;
        key: string;
        value: string;
    }[];
    "PGM"?: {
        type: NLSRecordType.Program;
        key: string;
        value: string;
    }[];
};
export interface NLSRecord<T extends NLSRecordType> {
    type: T;
    value: string;
    nlsId?: string;
}
export declare class NLSBaseRecord<T extends NLSRecordType> implements NLSRecord<T> {
    type: T;
    key: string;
    value: string;
}
export declare abstract class NLSNodeDefFilteredRecord<T extends NLSRecordType> implements NLSRecord<T> {
    readonly type: T;
    nlsId?: string;
    readonly value: string;
    meta: string;
    constructor(type: T, tokens: string[], value: string);
    parseKey(tokens: string[]): void;
}
export declare class NLSCommandRecord extends NLSNodeDefFilteredRecord<NLSRecordType.Command> {
    control: string;
    property: string;
    constructor(tokens: string[], value: string);
    parseKey(tokens: string[]): void;
}
export declare class NLSGenericRecord extends NLSNodeDefFilteredRecord<NLSRecordType.Generic> {
    control: string;
    property: string;
    constructor(tokens: string[], value: string);
    parseKey(tokens: string[]): void;
}
export declare class NLSCommandParameterRecord extends NLSNodeDefFilteredRecord<NLSRecordType.CommandParameter | NLSRecordType.CommandParameterNLS> {
    control: string;
    property: string;
    editorId: string;
    constructor(type: NLSRecordType.CommandParameter | NLSRecordType.CommandParameterNLS, tokens: string[], value: string);
    parseKey(tokens: string[]): void;
}
export declare class NLSDriverRecord extends NLSNodeDefFilteredRecord<NLSRecordType.Driver> {
    control: DriverType;
    property: string;
    constructor(tokens: string[], value: string);
    parseKey(tokens: string[]): void;
}
export declare const NLSIndexMap: Map<Family, {
    [x: string]: {
        [y: number]: string;
    };
}>;
export declare const NLSTranslations: Map<Family, {
    [y: string]: string;
}>;
export declare function addToIndexMap<T extends Family>(family: T, record: {
    type: NLSRecordType;
    indexType: string;
    indexValue: number;
    value: string;
    comment: string;
}): void;
export declare function addToTranslationMap<T extends Family>(family: T, record: NLSGenericRecord | NLSCommandRecord | NLSDriverRecord): void;
export declare function applyTranslations(family: Family, value: string): string;
export declare function createMap<T extends Family>(content: string, family: T): {
    [y: string]: NLSRecordTypeMap;
};
export declare const NLSRecordMap: Map<Family, {
    [y: string]: NLSRecordTypeMap;
}>;
export declare function parseNLSContent<T extends Family>(content: string, family: T): NLSRecord<NLSRecordType>[];
export declare namespace NLS {
    function get<T extends Family>(family: T, nlsId: string): {
        ST: NLSDriverRecord[];
        GEN: NLSGenericRecord[];
        CMD: NLSCommandRecord[];
        ND: {
            type: NLSRecordType.NodeDef;
            nodeDefId: string;
            property: string;
            meta: string;
            value: string;
        }[];
        NDN: {
            type: NLSRecordType.NodeDefNLS;
            nlsId: string;
            property: string;
            meta: string;
            value: string;
        }[];
        DEV: {
            type: NLSRecordType.DeviceInfo;
            deviceCode: string;
            property: string;
            meta: string;
            value: string;
        }[];
        CMDP: NLSCommandParameterRecord[];
        CMDPN: NLSCommandParameterRecord[];
        LNKP: {
            type: NLSRecordType.LinkProtocol;
            protocol: string;
            property: string;
            meta: string;
            value: string;
        }[];
        LNKD: {
            type: NLSRecordType.LinkParameter;
            parameter: string;
            property: string;
            meta: string;
            value: string;
        }[];
        IX: {
            type: NLSRecordType.Index;
            indexType: string;
            indexValue: number;
            value: string;
        }[];
        OTHER: {
            type: NLSRecordType.Other;
            key: string;
            value: string;
        }[];
        PGM: {
            type: NLSRecordType.Program;
            key: string;
            value: string;
        }[];
    };
    const Map: Map<Family, {
        [y: string]: NLSRecordTypeMap;
    }>;
}
export declare namespace Translation {
    const apply: typeof applyTranslations;
    const Map: Map<Family, {
        [y: string]: string;
    }>;
}
export declare namespace IndexDef {
    function get<T extends Family>(family: T, indexType: string): {
        [y: number]: string;
    };
    const Map: Map<Family, {
        [x: string]: {
            [y: number]: string;
        };
    }>;
}
//# sourceMappingURL=NLS.d.ts.map