import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import type { IntRange } from "type-fest";
import { ZWave } from "../../../Definitions/index.js";
type Commands = ColorSwitch.Commands.Type;
type Drivers = ColorSwitch.Drivers.Type;
declare class ColorSwitchNode extends Base<Drivers, Commands> implements ColorSwitch.Interface {
    readonly commands: {
        DON: (warmWhite?: number, coldWhite?: number, red?: number, green?: number, blue?: number, duration?: number) => Promise<any>;
        FDUP: (component: ZWave.ColorComponent, startLevel?: number, duration?: number) => Promise<any>;
        FDDOWN: (component: ZWave.ColorComponent, startLevel?: number, duration?: number) => Promise<any>;
        FDSTOP: (component: ZWave.ColorComponent) => Promise<any>;
        QUERY: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: '186';
    constructor(isy: ISY, nodeInfo: NodeInfo<Family.ZWave>);
    set(warmWhite?: number, coldWhite?: number, red?: number, green?: number, blue?: number, duration?: number): Promise<any>;
    fadeUp(component: ZWave.ColorComponent, startLevel?: number, duration?: number): Promise<any>;
    fadeDown(component: ZWave.ColorComponent, startLevel?: number, duration?: number): Promise<any>;
    fadeStop(component: ZWave.ColorComponent): Promise<any>;
    query(): Promise<any>;
    get warmWhite(): IntRange<0, 255>;
    get red(): IntRange<0, 255>;
    get green(): IntRange<0, 255>;
    get blue(): IntRange<0, 255>;
    get coldWhite(): IntRange<0, 255>;
}
export declare namespace ColorSwitch {
    interface Interface extends Omit<InstanceType<typeof ColorSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is ColorSwitchNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is ColorSwitchNode;
    function create(isy: ISY, nodeInfo: NodeInfo<Family.ZWave>): ColorSwitchNode;
    const Node: typeof ColorSwitchNode;
    const Class: typeof ColorSwitchNode;
    namespace Commands {
        type Type = {
            DON: ((GV0?: number, GV1?: number, GV2?: number, GV3?: number, GV4?: number, RR?: number) => Promise<boolean>) & {
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
    }
    enum Commands {
        set = "DON",
        fadeUp = "FDUP",
        fadeDown = "FDDOWN",
        fadeStop = "FDSTOP",
        query = "QUERY"
    }
    namespace Drivers {
        type Type = {
            GV0: {
                uom: UnitOfMeasure.Raw1ByteUnsignedValue;
                value: IntRange<0, 255>;
                label: "Warm White";
                name: "warmWhite";
            };
            GV2: {
                uom: UnitOfMeasure.Raw1ByteUnsignedValue;
                value: IntRange<0, 255>;
                label: "Red";
                name: "red";
            };
            GV3: {
                uom: UnitOfMeasure.Raw1ByteUnsignedValue;
                value: IntRange<0, 255>;
                label: "Green";
                name: "green";
            };
            GV4: {
                uom: UnitOfMeasure.Raw1ByteUnsignedValue;
                value: IntRange<0, 255>;
                label: "Blue";
                name: "blue";
            };
            GV1: {
                uom: UnitOfMeasure.Raw1ByteUnsignedValue;
                value: IntRange<0, 255>;
                label: "Cold White";
                name: "coldWhite";
            };
        };
    }
    enum Drivers {
        warmWhite = "GV0",
        red = "GV2",
        green = "GV3",
        blue = "GV4",
        coldWhite = "GV1"
    }
}
export {};
//# sourceMappingURL=ColorSwitch.d.ts.map