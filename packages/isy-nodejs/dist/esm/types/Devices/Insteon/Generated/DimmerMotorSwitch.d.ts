import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import type { IntRange } from "type-fest";
import { Insteon } from "../../../Definitions/index.js";
type Commands = DimmerMotorSwitch.Commands.Type;
type Drivers = DimmerMotorSwitch.Drivers.Type;
declare class DimmerMotorSwitchNode extends Base<Drivers, Commands> implements DimmerMotorSwitch.Interface {
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
    readonly nodeDefId: 'DimmerMotorSwitch' | "DimmerMotorSwitch_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>);
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
    get status(): IntRange<0, 100>;
    get onLevel(): IntRange<0, 100>;
    get maxDuration(): IntRange<0, 546>;
    get responding(): Insteon.Error;
}
export declare namespace DimmerMotorSwitch {
    interface Interface extends Omit<InstanceType<typeof DimmerMotorSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is DimmerMotorSwitchNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is DimmerMotorSwitchNode;
    function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>): DimmerMotorSwitchNode;
    const Node: typeof DimmerMotorSwitchNode;
    const Class: typeof DimmerMotorSwitchNode;
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
    }
    enum Commands {
        on = "DON",
        off = "DOF",
        fastOff = "DFOF",
        fastOn = "DFON",
        fadeUp = "FDUP",
        fadeDown = "FDDOWN",
        fadeStop = "FDSTOP",
        query = "QUERY",
        beep = "BEEP",
        updateOnLevel = "OL",
        updateMaxDuration = "DUR",
        backlight = "BL",
        writeChanges = "WDU"
    }
    namespace Drivers {
        type Type = {
            ST: {
                uom: UnitOfMeasure.Percent;
                value: IntRange<0, 100>;
                label: "Status";
                name: "status";
            };
            OL: {
                uom: UnitOfMeasure.Percent;
                value: IntRange<0, 100>;
                label: "On Level";
                name: "onLevel";
            };
            DUR: {
                uom: UnitOfMeasure.DurationInSeconds;
                value: IntRange<0, 546>;
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
    enum Drivers {
        status = "ST",
        onLevel = "OL",
        maxDuration = "DUR",
        responding = "ERR"
    }
}
export {};
//# sourceMappingURL=DimmerMotorSwitch.d.ts.map