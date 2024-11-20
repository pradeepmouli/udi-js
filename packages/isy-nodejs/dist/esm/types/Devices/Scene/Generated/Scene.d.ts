import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
export declare const nodeDefId = "InsteonDimmer";
type Commands = Scene.Commands;
type Drivers = Scene.Drivers;
export declare class SceneNode extends Base<Drivers, Commands> implements Scene.Interface {
    readonly commands: {
        DON: (value?: number) => Promise<any>;
        DOF: () => Promise<any>;
        DFOF: () => Promise<any>;
        DFON: () => Promise<any>;
        BRT: () => Promise<any>;
        DIM: () => Promise<any>;
        FDUP: () => Promise<any>;
        FDDOWN: () => Promise<any>;
        FDSTOP: () => Promise<any>;
        BEEP: () => Promise<any>;
        QUERY: () => Promise<any>;
        CLIMD: (value: number) => Promise<any>;
        CLIFS: (value: (0 | 1)) => Promise<any>;
        CLISPH: (value: number) => Promise<any>;
        CLISPC: (value: number) => Promise<any>;
        CLISPHD: (value: number) => Promise<any>;
        CLISPCD: (value: number) => Promise<any>;
    };
    static nodeDefId: string;
    readonly nodeDefId: "InsteonDimmer";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(value?: number): Promise<any>;
    off(): Promise<any>;
    fastOff(): Promise<any>;
    fastOn(): Promise<any>;
    brighten(): Promise<any>;
    dim(): Promise<any>;
    fadeUp(): Promise<any>;
    fadeDown(): Promise<any>;
    fadeStop(): Promise<any>;
    beep(): Promise<any>;
    query(): Promise<any>;
    mode(value: number): Promise<any>;
    fanMode(value: (0 | 1)): Promise<any>;
    heatSetpoint(value: number): Promise<any>;
    coolSetpoint(value: number): Promise<any>;
    heatSetpointShift(value: number): Promise<any>;
    coolSetpointShift(value: number): Promise<any>;
}
export declare namespace Scene {
    interface Interface extends Omit<InstanceType<typeof SceneNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "InsteonDimmer";
    }
    function is(node: ISYNode<any, any, any, any>): node is SceneNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is SceneNode;
    function create(isy: ISY, nodeInfo: NodeInfo): SceneNode;
    const Node: typeof SceneNode;
    type Commands = {
        DON: ((value?: number) => Promise<boolean>) & {
            label: "On";
            name: "on";
        };
        DOF: (() => Promise<boolean>) & {
            label: "Off";
            name: "off";
        };
        DFOF: (() => Promise<boolean>) & {
            label: "Fast Off";
            name: "fastOff";
        };
        DFON: (() => Promise<boolean>) & {
            label: "Fast On";
            name: "fastOn";
        };
        BRT: (() => Promise<boolean>) & {
            label: "Brighten";
            name: "brighten";
        };
        DIM: (() => Promise<boolean>) & {
            label: "Dim";
            name: "dim";
        };
        FDUP: (() => Promise<boolean>) & {
            label: "Fade Up";
            name: "fadeUp";
        };
        FDDOWN: (() => Promise<boolean>) & {
            label: "Fade Down";
            name: "fadeDown";
        };
        FDSTOP: (() => Promise<boolean>) & {
            label: "Fade Stop";
            name: "fadeStop";
        };
        BEEP: (() => Promise<boolean>) & {
            label: "Beep";
            name: "beep";
        };
        QUERY: (() => Promise<boolean>) & {
            label: "Query";
            name: "query";
        };
        CLIMD: ((value: number) => Promise<boolean>) & {
            label: "Mode";
            name: "mode";
        };
        CLIFS: ((value: (0 | 1)) => Promise<boolean>) & {
            label: "Fan Mode";
            name: "fanMode";
        };
        CLISPH: ((value: number) => Promise<boolean>) & {
            label: "Heat Setpoint";
            name: "heatSetpoint";
        };
        CLISPC: ((value: number) => Promise<boolean>) & {
            label: "Cool Setpoint";
            name: "coolSetpoint";
        };
        CLISPHD: ((value: number) => Promise<boolean>) & {
            label: "Heat Setpoint Shift";
            name: "heatSetpointShift";
        };
        CLISPCD: ((value: number) => Promise<boolean>) & {
            label: "Cool Setpoint Shift";
            name: "coolSetpointShift";
        };
    };
    type Drivers = {};
}
export {};
//# sourceMappingURL=Scene.d.ts.map