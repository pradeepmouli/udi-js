import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import type { IntRange } from "type-fest";
import { ZigBee } from "../../../Definitions/index.js";
type Commands = ColorControl.Commands.Type;
type Drivers = ColorControl.Drivers.Type;
declare class ColorControlNode extends Base<Drivers, Commands> implements ColorControl.Interface {
    readonly commands: {
        MOVETOCT: (color: number, dur?: number) => Promise<any>;
        MOVECT: (mode: ZigBee.Cmm, min?: number, max?: number, rate?: number) => Promise<any>;
        STEPCT: (min?: number, max?: number, size?: number, mode?: ZigBee.Csm, dur?: number) => Promise<any>;
        UNITS: (value: ZigBee.Ctunit) => Promise<any>;
        STOP: () => Promise<any>;
        QUERY: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'COLOR_CONTROL';
    constructor(isy: ISY, nodeInfo: NodeInfo<Family.ZigBee>);
    moveToTemperature(color: number, dur?: number): Promise<any>;
    moveTemperature(mode: ZigBee.Cmm, min?: number, max?: number, rate?: number): Promise<any>;
    stepTemperature(min?: number, max?: number, size?: number, mode?: ZigBee.Csm, dur?: number): Promise<any>;
    updatePreferredUnits(value: ZigBee.Ctunit): Promise<any>;
    stop(): Promise<any>;
    query(): Promise<any>;
    get colorTemperatureK(): IntRange<0, 1>;
    get colorTemperatureMired(): IntRange<0, 1>;
    get preferredUnits(): ZigBee.Ctunit;
}
export declare namespace ColorControl {
    interface Interface extends Omit<InstanceType<typeof ColorControlNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is ColorControlNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is ColorControlNode;
    function create(isy: ISY, nodeInfo: NodeInfo<Family.ZigBee>): ColorControlNode;
    const Node: typeof ColorControlNode;
    const Class: typeof ColorControlNode;
    namespace Commands {
        type Type = {
            MOVETOCT: ((COLOR: number, DUR?: number) => Promise<boolean>) & {
                label: "Move To Temperature";
                name: "moveToTemperature";
            };
            MOVECT: ((MODE: ZigBee.Cmm, MIN?: number, MAX?: number, RATE?: number) => Promise<boolean>) & {
                label: "Move Temperature";
                name: "moveTemperature";
            };
            STEPCT: ((MIN?: number, MAX?: number, SIZE?: number, MODE?: ZigBee.Csm, DUR?: number) => Promise<boolean>) & {
                label: "Step Temperature";
                name: "stepTemperature";
            };
            UNITS: ((value: ZigBee.Ctunit) => Promise<boolean>) & {
                label: "Preferred Units";
                name: "updatePreferredUnits";
            };
            STOP: (() => Promise<boolean>) & {
                label: "Stop";
                name: "stop";
            };
            QUERY: (() => Promise<boolean>) & {
                label: "Query";
                name: "query";
            };
        };
    }
    enum Commands {
        moveToTemperature = "MOVETOCT",
        moveTemperature = "MOVECT",
        stepTemperature = "STEPCT",
        updatePreferredUnits = "UNITS",
        stop = "STOP",
        query = "QUERY"
    }
    namespace Drivers {
        type Type = {
            GV2: {
                uom: UnitOfMeasure.Kelvin;
                value: IntRange<0, 1>;
                label: "Color Temperature K";
                name: "colorTemperatureK";
            };
            GV3: {
                uom: UnitOfMeasure.Unknown;
                value: IntRange<0, 1>;
                label: "Color Temperature Mired";
                name: "colorTemperatureMired";
            };
            GV4: {
                uom: UnitOfMeasure.Index;
                value: ZigBee.Ctunit;
                label: "Preferred Units";
                name: "preferredUnits";
            };
        };
    }
    enum Drivers {
        colorTemperatureK = "GV2",
        colorTemperatureMired = "GV3",
        preferredUnits = "GV4"
    }
}
export {};
//# sourceMappingURL=ColorControl.d.ts.map