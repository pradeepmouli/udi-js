import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { ZWave } from "../../../Definitions/index.js";
type Commands = ColorSwitch.Commands;
type Drivers = ColorSwitch.Drivers;
declare class ColorSwitchNode extends Base<Drivers, Commands> implements ColorSwitch.Interface {
    readonly commands: {
        DON: (warmWhite?: number, red?: number, green?: number, blue?: number, duration?: number, coldWhite?: number) => Promise<any>;
        FDUP: (component: ZWave.ColorComponent, startLevel?: number, duration?: number) => Promise<any>;
        FDDOWN: (component: ZWave.ColorComponent, startLevel?: number, duration?: number) => Promise<any>;
        FDSTOP: (component: ZWave.ColorComponent) => Promise<any>;
        QUERY: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: '186';
    constructor(isy: ISY, nodeInfo: NodeInfo);
    set(warmWhite?: number, red?: number, green?: number, blue?: number, duration?: number, coldWhite?: number): Promise<any>;
    fadeUp(component: ZWave.ColorComponent, startLevel?: number, duration?: number): Promise<any>;
    fadeDown(component: ZWave.ColorComponent, startLevel?: number, duration?: number): Promise<any>;
    fadeStop(component: ZWave.ColorComponent): Promise<any>;
    query(): Promise<any>;
    get warmWhite(): number;
    get red(): number;
    get green(): number;
    get blue(): number;
    get coldWhite(): number;
}
export declare namespace ColorSwitch {
    interface Interface extends Omit<InstanceType<typeof ColorSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is ColorSwitchNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is ColorSwitchNode;
    function create(isy: ISY, nodeInfo: NodeInfo): ColorSwitchNode;
    const Node: typeof ColorSwitchNode;
    type Commands = {
        DON: ((GV0?: number, GV2?: number, GV3?: number, GV4?: number, RR?: number, GV1?: number) => Promise<boolean>) & {
            label: "Set";
            name: "set";
        };
        FDUP: ((ID: ZWave.ColorComponent, STARTLEVEL?: number, RR?: number) => Promise<boolean>) & {
            label: "Fade Up";
            name: "fadeUp";
        };
        FDDOWN: ((ID: ZWave.ColorComponent, STARTLEVEL?: number, RR?: number) => Promise<boolean>) & {
            label: "Fade Down";
            name: "fadeDown";
        };
        FDSTOP: ((ID: ZWave.ColorComponent) => Promise<boolean>) & {
            label: "Fade Stop";
            name: "fadeStop";
        };
        QUERY: (() => Promise<boolean>) & {
            label: "Query";
            name: "query";
        };
    };
    type Drivers = {
        GV0: {
            uom: UnitOfMeasure.Raw1ByteUnsignedValue;
            value: number;
            label: "Warm White";
            name: "warmWhite";
        };
        GV2: {
            uom: UnitOfMeasure.Raw1ByteUnsignedValue;
            value: number;
            label: "Red";
            name: "red";
        };
        GV3: {
            uom: UnitOfMeasure.Raw1ByteUnsignedValue;
            value: number;
            label: "Green";
            name: "green";
        };
        GV4: {
            uom: UnitOfMeasure.Raw1ByteUnsignedValue;
            value: number;
            label: "Blue";
            name: "blue";
        };
        GV1: {
            uom: UnitOfMeasure.Raw1ByteUnsignedValue;
            value: number;
            label: "Cold White";
            name: "coldWhite";
        };
    };
}
export {};
//# sourceMappingURL=ColorSwitch.d.ts.map