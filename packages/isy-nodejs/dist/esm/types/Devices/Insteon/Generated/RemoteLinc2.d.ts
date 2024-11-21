import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = RemoteLinc2.Commands;
type Drivers = RemoteLinc2.Drivers;
export declare class RemoteLinc2Node extends Base<Drivers, Commands> implements RemoteLinc2.Interface {
    readonly commands: {
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: "RemoteLinc2" | "RemoteLinc2_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    writeChanges(): Promise<any>;
    get status(): number;
    get responding(): Insteon.Error;
}
export declare namespace RemoteLinc2 {
    interface Interface extends Omit<InstanceType<typeof RemoteLinc2Node>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "RemoteLinc2" | "RemoteLinc2_ADV";
    }
    function is(node: ISYNode<any, any, any, any>): node is RemoteLinc2Node;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is RemoteLinc2Node;
    function create(isy: ISY, nodeInfo: NodeInfo): RemoteLinc2Node;
    const Node: typeof RemoteLinc2Node;
    type Commands = {
        WDU: (() => Promise<boolean>) & {
            label: "Write Changes";
            name: "writeChanges";
        };
    };
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.Percent;
            value: number;
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
//# sourceMappingURL=RemoteLinc2.d.ts.map