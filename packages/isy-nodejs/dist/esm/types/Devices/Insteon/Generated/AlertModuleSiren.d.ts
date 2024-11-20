import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = AlertModuleSiren.Commands;
type Drivers = AlertModuleSiren.Drivers;
export declare class AlertModuleSirenNode extends Base<Drivers, Commands> implements AlertModuleSiren.Interface {
    readonly commands: {
        DON: (onLevel?: number) => Promise<any>;
        DOF: () => Promise<any>;
        DFOF: () => Promise<any>;
        DFON: () => Promise<any>;
        QUERY: () => Promise<any>;
        BEEP: (value?: number) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    readonly nodeDefId: "AlertModuleSiren" | "AlertModuleSiren_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(onLevel?: number): Promise<any>;
    off(): Promise<any>;
    fastOff(): Promise<any>;
    fastOn(): Promise<any>;
    query(): Promise<any>;
    beep(value?: number): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): Insteon.OnLevelRelay;
    get responding(): Insteon.Error;
}
export declare namespace AlertModuleSiren {
    interface Interface extends Omit<InstanceType<typeof AlertModuleSirenNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "AlertModuleSiren" | "AlertModuleSiren_ADV";
    }
    function is(node: ISYNode<any, any, any, any>): node is AlertModuleSirenNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is AlertModuleSirenNode;
    function create(isy: ISY, nodeInfo: NodeInfo): AlertModuleSirenNode;
    const Node: typeof AlertModuleSirenNode;
    type Commands = {
        DON: ((OL?: number) => Promise<boolean>) & {
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
            value: Insteon.OnLevelRelay;
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
//# sourceMappingURL=AlertModuleSiren.d.ts.map