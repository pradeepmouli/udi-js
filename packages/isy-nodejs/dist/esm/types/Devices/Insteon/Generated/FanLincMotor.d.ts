import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = FanLincMotor.Commands;
type Drivers = FanLincMotor.Drivers;
export declare class FanLincMotorNode extends Base<Drivers, Commands> implements FanLincMotor.Interface {
    readonly commands: {
        DON: (value: Insteon.FanLevel) => Promise<any>;
        DOF: () => Promise<any>;
        DFOF: () => Promise<any>;
        DFON: () => Promise<any>;
        QUERY: () => Promise<any>;
        BEEP: (value?: number) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: "FanLincMotor";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(value: Insteon.FanLevel): Promise<any>;
    off(): Promise<any>;
    fastOff(): Promise<any>;
    fastOn(): Promise<any>;
    query(): Promise<any>;
    beep(value?: number): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): Insteon.FanLevel;
    get responding(): Insteon.Error;
}
export declare namespace FanLincMotor {
    interface Interface extends Omit<InstanceType<typeof FanLincMotorNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "FanLincMotor";
    }
    function is(node: ISYNode<any, any, any, any>): node is FanLincMotorNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is FanLincMotorNode;
    function create(isy: ISY, nodeInfo: NodeInfo): FanLincMotorNode;
    const Node: typeof FanLincMotorNode;
    type Commands = {
        DON: ((value: Insteon.FanLevel) => Promise<boolean>) & {
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
        QUERY: (() => Promise<boolean>) & {
            label: "Query";
            name: "query";
        };
        BEEP: ((value?: number) => Promise<boolean>) & {
            label: "Beep";
            name: "beep";
        };
        WDU: (() => Promise<boolean>) & {
            label: "Write Changes";
            name: "writeChanges";
        };
    };
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.Percent;
            value: Insteon.FanLevel;
            label: "Status";
            name: "status";
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
//# sourceMappingURL=FanLincMotor.d.ts.map