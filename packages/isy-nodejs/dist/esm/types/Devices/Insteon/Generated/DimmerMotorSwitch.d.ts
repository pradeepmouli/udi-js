import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = DimmerMotorSwitch.Commands;
type Drivers = DimmerMotorSwitch.Drivers;
export declare class DimmerMotorSwitchNode extends Base<Drivers, Commands> implements DimmerMotorSwitch.Interface {
    readonly commands: {
        DON: (value?: number) => Promise<any>;
        DOF: () => Promise<any>;
        DFOF: () => Promise<any>;
        DFON: () => Promise<any>;
        FDUP: () => Promise<any>;
        FDDOWN: () => Promise<any>;
        FDSTOP: () => Promise<any>;
        QUERY: () => Promise<any>;
        BEEP: (value?: number) => Promise<any>;
        OL: (value: number) => Promise<any>;
        DUR: (value: number) => Promise<any>;
        BL: (value: number) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: "DimmerMotorSwitch" | "DimmerMotorSwitch_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(value?: number): Promise<any>;
    off(): Promise<any>;
    fastOff(): Promise<any>;
    fastOn(): Promise<any>;
    fadeUp(): Promise<any>;
    fadeDown(): Promise<any>;
    fadeStop(): Promise<any>;
    query(): Promise<any>;
    beep(value?: number): Promise<any>;
    updateOnLevel(value: number): Promise<any>;
    updateMaxDuration(value: number): Promise<any>;
    backlight(value: number): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): number;
    get onLevel(): number;
    get maxDuration(): number;
    get responding(): Insteon.Error;
}
export declare namespace DimmerMotorSwitch {
    interface Interface extends Omit<InstanceType<typeof DimmerMotorSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "DimmerMotorSwitch" | "DimmerMotorSwitch_ADV";
    }
    function is(node: ISYNode<any, any, any, any>): node is DimmerMotorSwitchNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is DimmerMotorSwitchNode;
    function create(isy: ISY, nodeInfo: NodeInfo): DimmerMotorSwitchNode;
    const Node: typeof DimmerMotorSwitchNode;
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
        QUERY: (() => Promise<boolean>) & {
            label: "Query";
            name: "query";
        };
        BEEP: ((value?: number) => Promise<boolean>) & {
            label: "Beep";
            name: "beep";
        };
        OL: ((value: number) => Promise<boolean>) & {
            label: "On Level";
            name: "updateOnLevel";
        };
        DUR: ((value: number) => Promise<boolean>) & {
            label: "Max Duration";
            name: "updateMaxDuration";
        };
        BL: ((value: number) => Promise<boolean>) & {
            label: "Backlight";
            name: "backlight";
        };
        WDU: (() => Promise<boolean>) & {
            label: "Write Changes";
            name: "writeChanges";
        };
    };
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.Percent;
            value: number;
            label: "Status";
            name: "status";
        };
        OL: {
            uom: UnitOfMeasure.Percent;
            value: number;
            label: "On Level";
            name: "onLevel";
        };
        DUR: {
            uom: UnitOfMeasure.DurationInSeconds;
            value: number;
            label: "Max Duration";
            name: "maxDuration";
        };
        ERR: {
            uom: UnitOfMeasure.Index;
            value: Insteon.Error;
            label: "Responding";
            name: "responding";
        };
    };
}
export {};
//# sourceMappingURL=DimmerMotorSwitch.d.ts.map