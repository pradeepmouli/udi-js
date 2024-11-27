import type { Driver } from '../Definitions/Global/Drivers.js';
import { Family } from '../Definitions/Global/Families.js';
import { UnitOfMeasure } from '../Definitions/Global/UOM.js';
import { EditorDef, type RangeDef } from './EditorDef.js';
import { NLSCommandParameterRecord, NLSCommandRecord, NLSDriverRecord, NLSGenericRecord, type NLSRecordTypeMap } from './NLS.js';
import { DriverDef, NodeDef, SendCommandDef, type AcceptCommandDef, type ParamDef } from './NodeDef.js';
export type NCD = NodeClassDefinition<Family>;
export declare class NodeClassDefinition<T extends Family> {
    commands: {
        [x: string]: CommandDefinition;
    };
    drivers: {
        [x in Driver.Type]?: DriverDefinition;
    };
    dynamic: boolean;
    equivalentTo: string[];
    equivalents: string[];
    events: {
        [x: string]: EventDefinition;
    };
    extends?: string[];
    family: T;
    id: string;
    implements: string[];
    implementedBy: string[];
    label: string;
    nlsId: string;
    constructor(nodeDef: NodeDef, family: T);
    get name(): string;
    applyEditorDefs(): void;
    applyIndexDefs(): void;
    applyIndexMap(indexDef: {
        [x: string]: {
            [y: number]: string;
        };
    }): void;
    applyNLS(): void;
    applyNLSMap(nlsm: {
        [y: string]: NLSRecordTypeMap;
    }): void;
    toJSON(): {
        className: string;
        id: string;
        nlsId: string;
        drivers: {
            ACCX?: DriverDefinition;
            ACCY?: DriverDefinition;
            ACCZ?: DriverDefinition;
            AIRFLOW?: DriverDefinition;
            AQI?: DriverDefinition;
            ALARM?: DriverDefinition;
            ANGLPOS?: DriverDefinition;
            ATMPRES?: DriverDefinition;
            ADRPST?: DriverDefinition;
            AWAKE?: DriverDefinition;
            BARPRES?: DriverDefinition;
            BATLVL?: DriverDefinition;
            BEEP?: DriverDefinition;
            BPDIA?: DriverDefinition;
            BPSYS?: DriverDefinition;
            BMI?: DriverDefinition;
            BONEM?: DriverDefinition;
            BRT?: DriverDefinition;
            CO?: DriverDefinition;
            CO2LVL?: DriverDefinition;
            CTL?: DriverDefinition;
            CLISPC?: DriverDefinition;
            CC?: DriverDefinition;
            CPW?: DriverDefinition;
            CLITEMP?: DriverDefinition;
            CV?: DriverDefinition;
            GV0?: DriverDefinition;
            GV1?: DriverDefinition;
            GV2?: DriverDefinition;
            GV3?: DriverDefinition;
            GV4?: DriverDefinition;
            GV5?: DriverDefinition;
            GV6?: DriverDefinition;
            GV7?: DriverDefinition;
            GV8?: DriverDefinition;
            GV9?: DriverDefinition;
            GV10?: DriverDefinition;
            GV11?: DriverDefinition;
            GV12?: DriverDefinition;
            GV13?: DriverDefinition;
            GV14?: DriverDefinition;
            GV15?: DriverDefinition;
            GV16?: DriverDefinition;
            GV17?: DriverDefinition;
            GV18?: DriverDefinition;
            GV19?: DriverDefinition;
            GV20?: DriverDefinition;
            GV21?: DriverDefinition;
            GV22?: DriverDefinition;
            GV23?: DriverDefinition;
            GV24?: DriverDefinition;
            GV25?: DriverDefinition;
            GV26?: DriverDefinition;
            GV27?: DriverDefinition;
            GV28?: DriverDefinition;
            GV29?: DriverDefinition;
            GV30?: DriverDefinition;
            DELAY?: DriverDefinition;
            DEWPT?: DriverDefinition;
            BUSY?: DriverDefinition;
            SECMD?: DriverDefinition;
            DIM?: DriverDefinition;
            DISTANC?: DriverDefinition;
            WATERTD?: DriverDefinition;
            DUR?: DriverDefinition;
            ELECCON?: DriverDefinition;
            ELECRES?: DriverDefinition;
            CLIEMD?: DriverDefinition;
            ERR?: DriverDefinition;
            ETO?: DriverDefinition;
            TEMPEXH?: DriverDefinition;
            FDDOWN?: DriverDefinition;
            FDSTOP?: DriverDefinition;
            FDUP?: DriverDefinition;
            CLIFRS?: DriverDefinition;
            CLIFS?: DriverDefinition;
            CLIFSO?: DriverDefinition;
            DFOF?: DriverDefinition;
            DFON?: DriverDefinition;
            CH20?: DriverDefinition;
            FREQ?: DriverDefinition;
            GPV?: DriverDefinition;
            GVOL?: DriverDefinition;
            GUST?: DriverDefinition;
            CLIHCS?: DriverDefinition;
            HEATIX?: DriverDefinition;
            CLISPH?: DriverDefinition;
            HAIL?: DriverDefinition;
            HR?: DriverDefinition;
            CLIHUM?: DriverDefinition;
            LUMIN?: DriverDefinition;
            METHANE?: DriverDefinition;
            MODE?: DriverDefinition;
            MOIST?: DriverDefinition;
            MOON?: DriverDefinition;
            MUSCLEM?: DriverDefinition;
            DOF?: DriverDefinition;
            DOF3?: DriverDefinition;
            DOF4?: DriverDefinition;
            DOF5?: DriverDefinition;
            DON?: DriverDefinition;
            DON3?: DriverDefinition;
            DON4?: DriverDefinition;
            DON5?: DriverDefinition;
            OL?: DriverDefinition;
            OZONE?: DriverDefinition;
            PM10?: DriverDefinition;
            PM25?: DriverDefinition;
            POP?: DriverDefinition;
            PPW?: DriverDefinition;
            PF?: DriverDefinition;
            PRECIP?: DriverDefinition;
            PULSCNT?: DriverDefinition;
            QUERY?: DriverDefinition;
            RADON?: DriverDefinition;
            RAINRT?: DriverDefinition;
            RR?: DriverDefinition;
            RELMOD?: DriverDefinition;
            RESET?: DriverDefinition;
            RESPR?: DriverDefinition;
            RFSS?: DriverDefinition;
            ROTATE?: DriverDefinition;
            CLISMD?: DriverDefinition;
            SEISINT?: DriverDefinition;
            SEISMAG?: DriverDefinition;
            SMOKED?: DriverDefinition;
            SOILH?: DriverDefinition;
            SOILR?: DriverDefinition;
            SOILS?: DriverDefinition;
            SOILT?: DriverDefinition;
            SOLRAD?: DriverDefinition;
            SVOL?: DriverDefinition;
            SPEED?: DriverDefinition;
            ST?: DriverDefinition;
            TANKCAP?: DriverDefinition;
            USRNUM?: DriverDefinition;
            CLIMD?: DriverDefinition;
            TIDELVL?: DriverDefinition;
            TIME?: DriverDefinition;
            TIMEREM?: DriverDefinition;
            TBW?: DriverDefinition;
            TPW?: DriverDefinition;
            UV?: DriverDefinition;
            UAC?: DriverDefinition;
            VOCLVL?: DriverDefinition;
            WATERF?: DriverDefinition;
            WATERP?: DriverDefinition;
            WATERT?: DriverDefinition;
            WVOL?: DriverDefinition;
            WEIGHT?: DriverDefinition;
            WINDCH?: DriverDefinition;
            WINDDIR?: DriverDefinition;
            WATERTB?: DriverDefinition;
            TEMPOUT?: DriverDefinition;
        };
        commands: {
            [x: string]: CommandDefinition;
        };
        events: {
            [x: string]: EventDefinition;
        };
        family: T;
        label: string;
        name: string;
        dynamic: boolean;
        implements: string[];
        equivalentTo: string[];
        extends: string[];
        equivalents: string[];
        implementedBy: string[];
    };
    private applyNLSRecords;
}
export type DataTypeDefinition = {
    uom: UnitOfMeasure;
    serverUom?: UnitOfMeasure;
    enum: false;
    indexId?: string;
    min: number;
    max: number;
    step?: number;
    precision?: number;
    returnType?: string;
} | {
    uom: UnitOfMeasure;
    enum: true;
    indexId: string;
    values: {
        [x: number]: string;
    };
    returnType?: string;
};
export declare abstract class NodeMemberDefinition<TId extends string> {
    #private;
    classDef: NodeClassDefinition<any>;
    dataType: DataTypeDefinition[];
    editorId: string;
    hidden: boolean;
    id: TId;
    label?: string;
    optional: boolean;
    constructor(classDef: NodeClassDefinition<any>, def?: DriverDef | ParamDef);
    get name(): string;
    applyEditorDef(e: EditorDef): void;
    applyIndexDef(e: {
        [x: string]: {
            [y: number]: string;
        };
    }): void;
    parseEditorId(e: string): RangeDef;
    primaryDataType(): {
        uom: number;
        enum: false;
        min: number;
        max: number;
        step?: number;
        precision?: number;
    } | {
        uom: number;
        enum: true;
        indexId: string;
        values: {
            [x: number]: string;
        };
    };
    selectValue(currentValue: any, newValue: any, nlsId: any): any;
    toJSON(): {
        label: string;
        hidden: boolean;
        optional: boolean;
        id: TId;
        editorId: string;
        dataType: DataTypeDefinition[];
        name: string;
    };
}
export declare class DriverDefinition extends NodeMemberDefinition<Driver.Type> {
    readonly: boolean;
    constructor(def: DriverDef, classDef: NodeClassDefinition<any>);
    applyNLSRecord(nls: NLSGenericRecord | NLSDriverRecord): void;
    toJSON(): {
        label: string;
        hidden: boolean;
        optional: boolean;
        readonly: boolean;
        id: import("../Definitions/Global/Drivers.js").DriverType;
        editorId: string;
        dataType: DataTypeDefinition[];
        name: string;
    };
}
export declare class CommandDefinition extends NodeMemberDefinition<string> {
    initialValue?: Driver.Type;
    parameters?: {
        [x: string]: ParameterDefinition;
    };
    constructor(def: AcceptCommandDef, classDef: NodeClassDefinition<any>);
    get name(): string;
    applyEditorDef(e: EditorDef): void;
    applyIndexDef(e: {
        [x: string]: {
            [y: number]: string;
        };
    }): void;
    applyNLSRecord(nls: NLSGenericRecord | NLSCommandRecord | NLSCommandParameterRecord): void;
    toJSON(): {
        label: string;
        hidden: boolean;
        id: string;
        editorId: string;
        dataType: DataTypeDefinition[];
        name: string;
        optional: boolean;
        parameters: {
            [x: string]: ParameterDefinition;
        };
        initialValue: import("../Definitions/Global/Drivers.js").DriverType;
    };
}
export declare class ParameterDefinition extends NodeMemberDefinition<string> {
    initialValue: Driver.Type;
    constructor(def: ParamDef, classDef: NodeClassDefinition<any>);
    applyNLSRecord(nls: NLSCommandParameterRecord | NLSGenericRecord): void;
    toJSON(): {
        label: string;
        hidden: boolean;
        id: string;
        editorId: string;
        dataType: DataTypeDefinition[];
        name: string;
        optional: boolean;
        initialValue: import("../Definitions/Global/Drivers.js").DriverType;
    };
}
export declare class EventDefinition extends NodeMemberDefinition<string> {
    constructor(def: SendCommandDef, classDef: NodeClassDefinition<any>);
    applyNLSRecord(nls: NLSCommandRecord | NLSGenericRecord): void;
}
export declare namespace NodeClassDefinition {
    const Map: Map<Family, {
        [x: string]: NodeClassDefinition<Family>;
    }>;
    function generate<T extends Family>(family: T, nodeDefs: NodeDef[]): {
        [x: string]: NodeClassDefinition<T>;
    };
    function load(path: string): Map<Family, {
        [x: string]: NodeClassDefinition<Family>;
    }>;
    function save(path: string): void;
}
//# sourceMappingURL=ClassDefinition.d.ts.map