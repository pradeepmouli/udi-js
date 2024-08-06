import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Definitions/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
export declare const nodeDefId = "InsteonDimmer";
type Commands = {
    DON: (value: any) => Promise<boolean>;
    DOF: () => Promise<boolean>;
    DFOF: () => Promise<boolean>;
    DFON: () => Promise<boolean>;
    BRT: () => Promise<boolean>;
    DIM: () => Promise<boolean>;
    FDUP: () => Promise<boolean>;
    FDDOWN: () => Promise<boolean>;
    FDSTOP: () => Promise<boolean>;
    BEEP: () => Promise<boolean>;
    QUERY: () => Promise<boolean>;
    CLIMD: (value: any) => Promise<boolean>;
    CLIFS: (value: any) => Promise<boolean>;
    CLISPH: (value: any) => Promise<boolean>;
    CLISPC: (value: any) => Promise<boolean>;
    CLISPHD: (value: any) => Promise<boolean>;
    CLISPCD: (value: any) => Promise<boolean>;
};
type Drivers = {};
export declare class InsteonDimmerNode extends ISYNode<Family.Scene, keyof Drivers, keyof Commands> {
    readonly commands: Commands;
    drivers: Drivers;
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(value: any): Promise<void>;
    off(): Promise<void>;
    fastOff(): Promise<void>;
    fastOn(): Promise<void>;
    brighten(): Promise<void>;
    dim(): Promise<void>;
    fadeUp(): Promise<void>;
    fadeDown(): Promise<void>;
    fadeStop(): Promise<void>;
    beep(): Promise<void>;
    query(): Promise<void>;
    mode(value: any): Promise<void>;
    fanMode(value: any): Promise<void>;
    heatSetpoint(value: any): Promise<void>;
    coolSetpoint(value: any): Promise<void>;
    heatSetpointShift(value: any): Promise<void>;
    coolSetpointShift(value: any): Promise<void>;
}
export {};
//# sourceMappingURL=InsteonDimmerNode.d.ts.map