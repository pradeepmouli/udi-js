import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Lutron } from "../../../Definitions/index.js";
type Commands = LoadShed.Commands;
type Drivers = LoadShed.Drivers;
export declare class LoadShedNode extends Base<Drivers, Commands> implements LoadShed.Interface {
    readonly commands: {
        DON: (value?: (0 | 100)) => Promise<any>;
        DOF: () => Promise<any>;
        QUERY: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: "LUTLoadShed";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(value?: (0 | 100)): Promise<any>;
    off(): Promise<any>;
    query(): Promise<any>;
    get status(): (0 | 100);
    get responding(): Lutron.Error;
}
export declare namespace LoadShed {
    interface Interface extends Omit<InstanceType<typeof LoadShedNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "LUTLoadShed";
    }
    function is(node: ISYNode<any, any, any, any>): node is LoadShedNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is LoadShedNode;
    function create(isy: ISY, nodeInfo: NodeInfo): LoadShedNode;
    const Node: typeof LoadShedNode;
    type Commands = {
        DON: ((value?: (0 | 100)) => Promise<boolean>) & {
            label: "On";
            name: "on";
        };
        DOF: (() => Promise<boolean>) & {
            label: "Off";
            name: "off";
        };
        QUERY: (() => Promise<boolean>) & {
            label: "Query";
            name: "query";
        };
    };
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.Percent;
            value: (0 | 100);
            label: "Status";
            name: "status";
        };
        ERR: {
            uom: UnitOfMeasure.Index;
            value: Lutron.Error;
            label: "Responding";
            name: "responding";
        };
    };
}
export {};
//# sourceMappingURL=LoadShed.d.ts.map