import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
import { ZWave } from "../../../Definitions/index.js";
export declare const nodeDefId = "ZY002_1";
type Commands = {
    DON: (value: number | number, RR: ) => Promise<boolean>;
    DOF: () => Promise<boolean>;
    DFON: () => Promise<boolean>;
    DFOF: () => Promise<boolean>;
    BRT: () => Promise<boolean>;
    DIM: () => Promise<boolean>;
    FDUP: (STARTLEVEL: , RR: ) => Promise<boolean>;
    FDDOWN: (STARTLEVEL: , RR: ) => Promise<boolean>;
    FADE: (DIR: , STARTLEVEL: , RR: , DIR2: , STEP2: ) => Promise<boolean>;
    FDSTOP: () => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    CONFIG: (NUM: number, VAL: ) => Promise<boolean>;
    WDU: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Percent;
        value: ZWave.DimRep;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: ZWave.Error;
    };
};
export declare class DimmerSwitchNode extends ISYDeviceNode<Family.ZWave, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(value: number | number, fadeRate: ): Promise<any>;
    off(): Promise<any>;
    fastOn(): Promise<any>;
    fastOff(): Promise<any>;
    brighten(): Promise<any>;
    dim(): Promise<any>;
    fadeUp(startLevel: , fadeRate: ): Promise<any>;
    fadeDown(startLevel: , fadeRate: ): Promise<any>;
    fade(direction: , startLevel: , fadeRate: , : any, dDirection: , : any, dFadeRate: ): Promise<any>;
    fadeStop(): Promise<any>;
    query(): Promise<any>;
    setConfiguration(parameterNumber: number, parameterValue: ): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): ZWave.DimRep;
    get responding(): ZWave.Error;
}
export {};
//# sourceMappingURL=DimmerSwitchNode.d.ts.map