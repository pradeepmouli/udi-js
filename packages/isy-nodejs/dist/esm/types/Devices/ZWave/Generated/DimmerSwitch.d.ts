import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { ZWave } from "../../../Definitions/index.js";
type Commands = DimmerSwitch.Commands;
type Drivers = DimmerSwitch.Drivers;
export declare class DimmerSwitchNode extends Base<Drivers, Commands> implements DimmerSwitch.Interface {
    readonly commands: {
        DON: (value?: ZWave.PercentOpt | number, rampRate?: number | number) => Promise<any>;
        DOF: () => Promise<any>;
        DFON: () => Promise<any>;
        DFOF: () => Promise<any>;
        BRT: () => Promise<any>;
        DIM: () => Promise<any>;
        FDUP: (startLevel?: ZWave.PercentOpt | number, rampRate?: number | number) => Promise<any>;
        FDDOWN: (startLevel?: ZWave.PercentOpt | number, rampRate?: number | number) => Promise<any>;
        FADE: (direction: ZWave.FadeDirection, startLevel?: ZWave.PercentOpt | number, rampRate?: number | number, direction2?: ZWave.FadeDirection, fadeRate2?: number | number) => Promise<any>;
        FDSTOP: () => Promise<any>;
        QUERY: () => Promise<any>;
        CONFIG: (parameterNumber: number, parameterValue: number | number | number | number | number | number) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: "119";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(value?: ZWave.PercentOpt | number, rampRate?: number | number): Promise<any>;
    off(): Promise<any>;
    fastOn(): Promise<any>;
    fastOff(): Promise<any>;
    brighten(): Promise<any>;
    dim(): Promise<any>;
    fadeUp(startLevel?: ZWave.PercentOpt | number, rampRate?: number | number): Promise<any>;
    fadeDown(startLevel?: ZWave.PercentOpt | number, rampRate?: number | number): Promise<any>;
    fade(direction: ZWave.FadeDirection, startLevel?: ZWave.PercentOpt | number, rampRate?: number | number, direction2?: ZWave.FadeDirection, fadeRate2?: number | number): Promise<any>;
    fadeStop(): Promise<any>;
    query(): Promise<any>;
    setConfiguration(parameterNumber: number, parameterValue: number | number | number | number | number | number): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): number;
    get responding(): ZWave.Error;
}
export declare namespace DimmerSwitch {
    interface Interface extends Omit<InstanceType<typeof DimmerSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "119";
    }
    function is(node: ISYNode<any, any, any, any>): node is DimmerSwitchNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is DimmerSwitchNode;
    function create(isy: ISY, nodeInfo: NodeInfo): DimmerSwitchNode;
    const Node: typeof DimmerSwitchNode;
    type Commands = {
        DON: ((value?: ZWave.PercentOpt | number, RR?: number | number) => Promise<boolean>) & {
            label: "On";
            name: "on";
        };
        DOF: (() => Promise<boolean>) & {
            label: "Off";
            name: "off";
        };
        DFON: (() => Promise<boolean>) & {
            label: "Fast On";
            name: "fastOn";
        };
        DFOF: (() => Promise<boolean>) & {
            label: "Fast Off";
            name: "fastOff";
        };
        BRT: (() => Promise<boolean>) & {
            label: "Brighten";
            name: "brighten";
        };
        DIM: (() => Promise<boolean>) & {
            label: "Dim";
            name: "dim";
        };
        FDUP: ((STARTLEVEL?: ZWave.PercentOpt | number, RR?: number | number) => Promise<boolean>) & {
            label: "Fade Up";
            name: "fadeUp";
        };
        FDDOWN: ((STARTLEVEL?: ZWave.PercentOpt | number, RR?: number | number) => Promise<boolean>) & {
            label: "Fade Down";
            name: "fadeDown";
        };
        FADE: ((DIR: ZWave.FadeDirection, STARTLEVEL?: ZWave.PercentOpt | number, RR?: number | number, DIR2?: ZWave.FadeDirection, STEP2?: number | number) => Promise<boolean>) & {
            label: "Fade";
            name: "fade";
        };
        FDSTOP: (() => Promise<boolean>) & {
            label: "Fade Stop";
            name: "fadeStop";
        };
        QUERY: (() => Promise<boolean>) & {
            label: "Query";
            name: "query";
        };
        CONFIG: ((NUM: number, VAL: number | number | number | number | number | number) => Promise<boolean>) & {
            label: "Set Configuration";
            name: "setConfiguration";
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
        ERR: {
            uom: UnitOfMeasure.Index;
            value: ZWave.Error;
            label: "Responding";
            name: "responding";
        };
    };
}
export {};
//# sourceMappingURL=DimmerSwitch.d.ts.map