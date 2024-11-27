import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { UDI } from "../../../Definitions/index.js";
type Commands = Relay.Commands;
type Drivers = Relay.Drivers;
export declare class RelayNode extends Base<Drivers, Commands> implements Relay.Interface {
    readonly commands: {
        DON: () => Promise<any>;
        DOF: () => Promise<any>;
        QUERY: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: "EM3Relay";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(): Promise<any>;
    off(): Promise<any>;
    query(): Promise<any>;
    get status(): (0 | 100);
    get responding(): UDI.Error;
}
export declare namespace Relay {
    interface Interface extends Omit<InstanceType<typeof RelayNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "EM3Relay";
    }
    function is(node: ISYNode<any, any, any, any>): node is RelayNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is RelayNode;
    function create(isy: ISY, nodeInfo: NodeInfo): RelayNode;
    const Node: typeof RelayNode;
    type Commands = {
        DON: (() => Promise<boolean>) & {
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
            value: UDI.Error;
            label: "Responding";
            name: "responding";
        };
    };
}
export {};
//# sourceMappingURL=Relay.d.ts.map