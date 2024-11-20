import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Poly } from "../../../Definitions/index.js";
export declare const nodeDefId = "CEILING_FAN";
type Commands = CeilingFan.Commands;
type Drivers = CeilingFan.Drivers;
export declare class CeilingFanNode extends Base<Drivers, Commands> implements CeilingFan.Interface {
    readonly commands: {
        DON: (value?: Poly.ConfigurationQuery) => Promise<any>;
        DOF: () => Promise<any>;
        BRT: {
            (): Promise<any>;
            (): Promise<any>;
        };
        DIM: {
            (): Promise<any>;
            (): Promise<any>;
        };
        INC_SPEED: {
            (): Promise<any>;
            (): Promise<any>;
        };
        DEC_SPEED: {
            (): Promise<any>;
            (): Promise<any>;
        };
        SET_SPEED: (fanSpeed: number) => Promise<any>;
        SET_DIRECTION: (value: number) => Promise<any>;
    };
    static nodeDefId: string;
    readonly nodeDefId: "CEILING_FAN";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(value?: Poly.ConfigurationQuery): Promise<any>;
    off(): Promise<any>;
    setSpeed(fanSpeed: number): Promise<any>;
    setDirection(value: number): Promise<any>;
    get fanSpeed(): Poly.ConfigurationQuery;
    get fanDirection(): number;
    get fanSpeed(): number;
}
export declare namespace CeilingFan {
    interface Interface extends Omit<InstanceType<typeof CeilingFanNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "CEILING_FAN";
    }
    function is(node: ISYNode<any, any, any, any>): node is CeilingFanNode;
    function create(isy: ISY, nodeInfo: NodeInfo): CeilingFanNode;
    const Node: typeof CeilingFanNode;
    type Commands = {
        DON: ((value?: Poly.ConfigurationQuery) => Promise<boolean>) & {
            label: "On";
            name: "on";
        };
        DOF: (() => Promise<boolean>) & {
            label: "Off";
            name: "off";
        };
        BRT: (() => Promise<boolean>) & {
            label: "Increase Speed (%)";
            name: "increaseSpeed";
        };
        DIM: (() => Promise<boolean>) & {
            label: "Decrease Speed (%)";
            name: "decreaseSpeed";
        };
        INC_SPEED: (() => Promise<boolean>) & {
            label: "Increase Speed (#)";
            name: "increaseSpeed";
        };
        DEC_SPEED: (() => Promise<boolean>) & {
            label: "Decrease Speed (#)";
            name: "decreaseSpeed";
        };
        SET_SPEED: ((FAN_SPEED: number) => Promise<boolean>) & {
            label: "Set Speed";
            name: "setSpeed";
        };
        SET_DIRECTION: ((value: number) => Promise<boolean>) & {
            label: "Set Direction";
            name: "setDirection";
        };
    };
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.Percent;
            value: Poly.ConfigurationQuery;
            label: "Fan Speed (%)";
            name: "fanSpeed";
        };
        GV0: {
            uom: UnitOfMeasure.Index;
            value: number;
            label: "Fan Direction";
            name: "fanDirection";
        };
        GV1: {
            uom: UnitOfMeasure.RawValue;
            value: number;
            label: "Fan Speed (#)";
            name: "fanSpeed";
        };
    };
}
export {};
//# sourceMappingURL=CeilingFan.d.ts.map