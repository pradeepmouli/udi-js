import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import { ISYDeviceNode } from "../../../ISYNode.js";
export declare const nodeDefId = "DimmerMotorSwitch";
type Commands = {
    DON: (value: number) => Promise<boolean>;
    DOF: () => Promise<boolean>;
    DFOF: () => Promise<boolean>;
    DFON: () => Promise<boolean>;
    FDUP: () => Promise<boolean>;
    FDDOWN: () => Promise<boolean>;
    FDSTOP: () => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    BEEP: (value: number) => Promise<boolean>;
    OL: (value: OnLevelPercent) => Promise<boolean>;
    DUR: (value: number) => Promise<boolean>;
    BL: (value: number) => Promise<boolean>;
    WDU: () => Promise<boolean>;
};
type Drivers = {
    ST?: {
        uom: UnitOfMeasure.Percent;
        value: OnLevelPercent;
    };
    OL?: {
        uom: UnitOfMeasure.Percent;
        value: OnLevelPercent;
    };
    DUR?: {
        uom: UnitOfMeasure.DurationInSeconds;
        value: number;
    };
    ERR?: {
        uom: UnitOfMeasure.Index;
        value: Error;
    };
};
export declare class DimmerMotorSwitchNode extends ISYDeviceNode<Family.Insteon, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(value: number): Promise<any>;
    off(): Promise<any>;
    fastOff(): Promise<any>;
    fastOn(): Promise<any>;
    fadeUp(): Promise<any>;
    fadeDown(): Promise<any>;
    fadeStop(): Promise<any>;
    query(): Promise<any>;
    beep(value: number): Promise<any>;
    updateOnLevel(value: OnLevelPercent): Promise<any>;
    updateMaxDuration(value: number): Promise<any>;
    backlight(value: number): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): OnLevelPercent;
    get onLevel(): OnLevelPercent;
    get maxDuration(): number;
    get responding(): Error;
}
export {};
//# sourceMappingURL=DimmerMotorSwitchNode.d.ts.map