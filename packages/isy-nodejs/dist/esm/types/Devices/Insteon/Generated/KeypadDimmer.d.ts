import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = KeypadDimmer.Commands.Type;
type Drivers = KeypadDimmer.Drivers.Type;
declare class KeypadDimmerNode extends Base<Drivers, Commands> implements KeypadDimmer.Interface {
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
        QUERY: () => Promise<any>;
        BEEP: (value?: number) => Promise<any>;
        OL: (value: number) => Promise<any>;
        RR: (value: Insteon.RampRate) => Promise<any>;
        BL: (value: Insteon.Backlight) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'KeypadDimmer' | "KeypadDimmer_ADV";
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
    query(): Promise<any>;
    beep(value?: number): Promise<any>;
    updateOnLevel(value: number): Promise<any>;
    updateRampRate(value: Insteon.RampRate): Promise<any>;
    backlight(value: Insteon.Backlight): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): number;
    get onLevel(): number;
    get rampRate(): Insteon.RampRate;
    get responding(): Insteon.Error;
}
export declare namespace KeypadDimmer {
    interface Interface extends Omit<InstanceType<typeof KeypadDimmerNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is KeypadDimmerNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is KeypadDimmerNode;
    function create(isy: ISY, nodeInfo: NodeInfo): KeypadDimmerNode;
    const Node: typeof KeypadDimmerNode;
    const Class: typeof KeypadDimmerNode;
    namespace Commands {
        type Type = {
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
            RR: ((value: Insteon.RampRate) => Promise<boolean>) & {
                label: "Ramp Rate";
                name: "updateRampRate";
            };
            BL: ((value: Insteon.Backlight) => Promise<boolean>) & {
                label: "Backlight";
                name: "backlight";
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
        fastOff = "DFOF",
        fastOn = "DFON",
        brighten = "BRT",
        dim = "DIM",
        fadeUp = "FDUP",
        fadeDown = "FDDOWN",
        fadeStop = "FDSTOP",
        query = "QUERY",
        beep = "BEEP",
        updateOnLevel = "OL",
        updateRampRate = "RR",
        backlight = "BL",
        writeChanges = "WDU"
    }
    namespace Drivers {
        type Type = {
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
            RR: {
                uom: UnitOfMeasure.Index;
                value: Insteon.RampRate;
                label: "Ramp Rate";
                name: "rampRate";
            };
            ERR: {
                uom: UnitOfMeasure.Index;
                value: Insteon.Error;
                label: "Responding";
                name: "responding";
            };
        };
    }
    enum Drivers {
        status = "ST",
        onLevel = "OL",
        rampRate = "RR",
        responding = "ERR"
    }
}
export {};
//# sourceMappingURL=KeypadDimmer.d.ts.map