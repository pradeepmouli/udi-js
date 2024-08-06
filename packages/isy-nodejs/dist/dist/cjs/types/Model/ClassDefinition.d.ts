import { NodeDef, type AcceptCommandDef, DriverDef, SendCommandDef } from "./NodeDef.js";
import { Family } from "../Definitions/Global/Families.js";
import type { Driver } from "../Definitions/Global/Drivers.js";
import { NLSCommandParameterRecord, NLSCommandRecord, NLSDriverRecord, NLSGenericRecord, NLSRecord, type NLSRecordType } from "./NLS.js";
import { type EditorDef } from './EditorDef.js';
import type { UnitOfMeasure } from '../Definitions/Global/UOM.js';
export declare function buildNodeClassDefinitions<T extends Family>(nodeDefs: NodeDef[], family: T): {
    [x: string]: NodeClassDefinition<T>;
};
export declare class NodeClassDefinition<T extends Family> {
    id: string;
    nlsId: string;
    drivers: {
        [x in Driver.Type]?: DriverDefinition;
    };
    commands: {
        [x: string]: CommandDefinition;
    };
    events: {
        [x: string]: EventDefinition;
    };
    family: T;
    label: string;
    get name(): string;
    constructor(nodeDef: NodeDef, family: T);
    applyEditorDefs(): void;
    applyNLS(): void;
    applyNLSMap(nlsm: Map<string, {
        [x in NLSRecordType]?: NLSRecord<x>[];
    }>): void;
    private applyNLSRecords;
}
declare abstract class NodeMemberDefinition<TId> {
    label: string;
    hidden: boolean;
    id: TId;
    editorId: string;
    get name(): string;
}
declare class DriverDefinition extends NodeMemberDefinition<Driver.Type> {
    dataType: {
        [x in keyof typeof UnitOfMeasure]?: {
            min: number;
            max: number;
            step?: number;
            prec?: number;
        } | {
            "indexId": string;
            values: [number, string][];
        };
    };
    constructor(def: DriverDef);
    applyNLSRecord(nls: NLSGenericRecord | NLSDriverRecord): void;
    applyEditorDef(e: EditorDef): void;
}
declare class CommandDefinition extends NodeMemberDefinition<string> {
    optional: boolean;
    parameters?: ParameterDefinition[];
    initialValue?: Driver.Type;
    dataType: {};
    constructor(def: AcceptCommandDef);
    applyNLSRecord(nls: NLSGenericRecord | NLSCommandRecord | NLSCommandParameterRecord): void;
    applyEditorDef(e: EditorDef): void;
}
declare class ParameterDefinition extends NodeMemberDefinition<string> {
    initialValue: Driver.Type;
    optional: boolean;
    dataType: {};
    constructor(def: any);
    applyNLSRecord(nls: NLSCommandParameterRecord): void;
    applyEditorDef(e: EditorDef): void;
}
declare class EventDefinition extends NodeMemberDefinition<string> {
    constructor(def: SendCommandDef);
    applyNLSRecord(nls: NLSCommandRecord): void;
}
export {};
