import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import type { IntRange } from "type-fest";
import { ZWave } from "../../../Definitions/index.js";
type Commands = DimmerSwitch.Commands.Type;
type Drivers = DimmerSwitch.Drivers.Type;
declare class DimmerSwitchNode extends Base<Drivers, Commands> implements DimmerSwitch.Interface {
    readonly commands: {
        DON: (value?: number | ZWave.PercentOpt, rampRate?: number) => Promise<any>;
        DOF: () => Promise<any>;
        DFON: () => Promise<any>;
        DFOF: () => Promise<any>;
        BRT: () => Promise<any>;
        DIM: () => Promise<any>;
        FDUP: (startLevel?: number | ZWave.PercentOpt, rampRate?: number) => Promise<any>;
        FDDOWN: (startLevel?: number | ZWave.PercentOpt, rampRate?: number) => Promise<any>;
        FADE: (direction: ZWave.FadeDirection, startLevel?: number | ZWave.PercentOpt, rampRate?: number, direction2?: ZWave.FadeDirection, fadeRate2?: number) => Promise<any>;
        FDSTOP: () => Promise<any>;
        QUERY: () => Promise<any>;
        CONFIG: (parameterNumber: number, parameterValue: number) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: '119';
    constructor(isy: ISY, nodeInfo: NodeInfo<Family.ZWave>);
    on(value?: number | ZWave.PercentOpt, rampRate?: number): Promise<any>;
    off(): Promise<any>;
    fastOn(): Promise<any>;
    fastOff(): Promise<any>;
    brighten(): Promise<any>;
    dim(): Promise<any>;
    fadeUp(startLevel?: number | ZWave.PercentOpt, rampRate?: number): Promise<any>;
    fadeDown(startLevel?: number | ZWave.PercentOpt, rampRate?: number): Promise<any>;
    fade(direction: ZWave.FadeDirection, startLevel?: number | ZWave.PercentOpt, rampRate?: number, direction2?: ZWave.FadeDirection, fadeRate2?: number): Promise<any>;
    fadeStop(): Promise<any>;
    query(): Promise<any>;
    setConfiguration(parameterNumber: number, parameterValue: number): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): IntRange<0, 101>;
    get responding(): ZWave.Error;
}
export declare namespace DimmerSwitch {
    interface Interface extends Omit<InstanceType<typeof DimmerSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is DimmerSwitchNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is DimmerSwitchNode;
    function create(isy: ISY, nodeInfo: NodeInfo<Family.ZWave>): DimmerSwitchNode;
    const Node: typeof DimmerSwitchNode;
    const Class: typeof DimmerSwitchNode;
    namespace Commands {
        type Type = {
            DON: ((value?: number | ZWave.PercentOpt, RR?: number) => Promise<boolean>) & {
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
            FDUP: ((STARTLEVEL?: number | ZWave.PercentOpt, RR?: number) => Promise<boolean>) & {
                label: "Fade Up";
                name: "fadeUp";
            };
            FDDOWN: ((STARTLEVEL?: number | ZWave.PercentOpt, RR?: number) => Promise<boolean>) & {
                label: "Fade Down";
                name: "fadeDown";
            };
            FADE: ((DIR: ZWave.FadeDirection, STARTLEVEL?: number | ZWave.PercentOpt, RR?: number, DIR2?: ZWave.FadeDirection, STEP2?: number) => Promise<boolean>) & {
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
            CONFIG: ((NUM: number, VAL: number) => Promise<boolean>) & {
                label: "Set Configuration";
                name: "setConfiguration";
            };
            WDU: (() => Promise<boolean>) & {
                label: "Write Changes";
                name: "writeChanges";
            };
        };
    }
    enum Commands {
        on = "DON",
        off = "DOF",
        fastOn = "DFON",
        fastOff = "DFOF",
        brighten = "BRT",
        dim = "DIM",
        fadeUp = "FDUP",
        fadeDown = "FDDOWN",
        fade = "FADE",
        fadeStop = "FDSTOP",
        query = "QUERY",
        setConfiguration = "CONFIG",
        writeChanges = "WDU"
    }
    namespace Drivers {
        type Type = {
            ST: {
                uom: UnitOfMeasure.Percent;
                value: IntRange<0, 101>;
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
    enum Drivers {
        status = "ST",
        responding = "ERR"
    }
}
export {};
//# sourceMappingURL=DimmerSwitch.d.ts.map