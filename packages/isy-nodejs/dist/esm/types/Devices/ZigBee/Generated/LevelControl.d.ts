import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import type { IntRange } from "type-fest";
import { ZigBee } from "../../../Definitions/index.js";
type Commands = LevelControl.Commands.Type;
type Drivers = LevelControl.Drivers.Type;
declare class LevelControlNode extends Base<Drivers, Commands> implements LevelControl.Interface {
    readonly commands: {
        DON: (value?: number, rampRate?: number) => Promise<any>;
        DOF: () => Promise<any>;
        DFON: () => Promise<any>;
        DFOF: () => Promise<any>;
        TOGGLE: () => Promise<any>;
        BRT: () => Promise<any>;
        DIM: () => Promise<any>;
        OL: (value: number) => Promise<any>;
        RR: (value: number) => Promise<any>;
        IDENTIFY: (value?: number) => Promise<any>;
        QUERY: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'LEVEL_CONTROL';
    constructor(isy: ISY, nodeInfo: NodeInfo<Family.ZigBee>);
    on(value?: number, rampRate?: number): Promise<any>;
    off(): Promise<any>;
    fastOn(): Promise<any>;
    fastOff(): Promise<any>;
    toggle(): Promise<any>;
    brighten(): Promise<any>;
    dim(): Promise<any>;
    updateOnLevel(value: number): Promise<any>;
    updateRampRate(value: number): Promise<any>;
    identify(value?: number): Promise<any>;
    query(): Promise<any>;
    get status(): (0 | 100 | 101);
    get onLevel(): number | IntRange<0, 255>;
    get rampRate(): number;
    get responding(): ZigBee.Error;
}
export declare namespace LevelControl {
    interface Interface extends Omit<InstanceType<typeof LevelControlNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is LevelControlNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is LevelControlNode;
    function create(isy: ISY, nodeInfo: NodeInfo<Family.ZigBee>): LevelControlNode;
    const Node: typeof LevelControlNode;
    const Class: typeof LevelControlNode;
    namespace Commands {
        type Type = {
            DON: ((value?: number, RR?: number) => Promise<boolean>) & {
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
            TOGGLE: (() => Promise<boolean>) & {
                label: "Toggle";
                name: "toggle";
            };
            BRT: (() => Promise<boolean>) & {
                label: "Brighten";
                name: "brighten";
            };
            DIM: (() => Promise<boolean>) & {
                label: "Dim";
                name: "dim";
            };
            OL: ((value: number) => Promise<boolean>) & {
                label: "On Level";
                name: "updateOnLevel";
            };
            RR: ((value: number) => Promise<boolean>) & {
                label: "Ramp Rate";
                name: "updateRampRate";
            };
            IDENTIFY: ((value?: number) => Promise<boolean>) & {
                label: "Identify";
                name: "identify";
            };
            QUERY: (() => Promise<boolean>) & {
                label: "Query";
                name: "query";
            };
        };
    }
    enum Commands {
        on = "DON",
        off = "DOF",
        fastOn = "DFON",
        fastOff = "DFOF",
        toggle = "TOGGLE",
        brighten = "BRT",
        dim = "DIM",
        updateOnLevel = "OL",
        updateRampRate = "RR",
        identify = "IDENTIFY",
        query = "QUERY"
    }
    namespace Drivers {
        type Type = {
            ST: {
                uom: UnitOfMeasure.OffOn;
                value: (0 | 100 | 101);
                label: "Status";
                name: "status";
            };
            OL: {
                uom: UnitOfMeasure.Percent | UnitOfMeasure.LevelFrom0To255;
                value: number | IntRange<0, 255>;
                label: "On Level";
                name: "onLevel";
            };
            RR: {
                uom: UnitOfMeasure.DurationInSeconds;
                value: number;
                label: "Ramp Rate";
                name: "rampRate";
            };
            ERR: {
                uom: UnitOfMeasure.Index;
                value: ZigBee.Error;
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
//# sourceMappingURL=LevelControl.d.ts.map