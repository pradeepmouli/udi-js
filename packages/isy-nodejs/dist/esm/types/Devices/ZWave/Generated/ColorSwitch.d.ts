import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
type Commands = ColorSwitch.Commands;
type Drivers = ColorSwitch.Drivers;
export declare class ColorSwitchNode extends Base<Drivers, Commands> implements ColorSwitch.Interface {
    readonly commands: {
        DON: (warmWhite?: number, red?: number, green?: number, blue?: number, duration?: number) => Promise<any>;
        FDUP: (component: number, startLevel?: number, duration?: number) => Promise<any>;
        FDDOWN: (component: number, startLevel?: number, duration?: number) => Promise<any>;
        FDSTOP: (component: number) => Promise<any>;
        QUERY: () => Promise<any>;
    };
    readonly nodeDefId: "186";
    static nodeDefId: string;
    constructor(isy: ISY, nodeInfo: NodeInfo);
    get blue(): number;
    get green(): number;
    get red(): number;
    get warmWhite(): number;
    fadeDown(component: number, startLevel?: number, duration?: number): Promise<any>;
    fadeStop(component: number): Promise<any>;
    fadeUp(component: number, startLevel?: number, duration?: number): Promise<any>;
    query(): Promise<any>;
    set(warmWhite?: number, red?: number, green?: number, blue?: number, duration?: number): Promise<any>;
}
export declare namespace ColorSwitch {
    interface Interface extends Omit<InstanceType<typeof ColorSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "186";
    }
    function is(node: ISYNode<any, any, any, any>): node is ColorSwitchNode;
    function create(isy: ISY, nodeInfo: NodeInfo): ColorSwitchNode;
    const Node: typeof ColorSwitchNode;
    type Commands = {
        DON: ((GV0?: number, GV2?: number, GV3?: number, GV4?: number, RR?: number) => Promise<boolean>) & {
            label: "Set";
            name: "set";
        };
        FDUP: ((ID: number, STARTLEVEL?: number, RR?: number) => Promise<boolean>) & {
            label: "Fade Up";
            name: "fadeUp";
        };
        FDDOWN: ((ID: number, STARTLEVEL?: number, RR?: number) => Promise<boolean>) & {
            label: "Fade Down";
            name: "fadeDown";
        };
        FDSTOP: ((ID: number) => Promise<boolean>) & {
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
    };
}
export {};
//# sourceMappingURL=ColorSwitch.d.ts.map