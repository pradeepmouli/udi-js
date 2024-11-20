import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Poly } from "../../../Definitions/index.js";
export declare const nodeDefId = "BRIDGE";
type Commands = BondBridge.Commands;
type Drivers = BondBridge.Drivers;
export declare class BondBridgeNode extends Base<Drivers, Commands> implements BondBridge.Interface {
    readonly commands: {
        UPDATE: () => Promise<any>;
    };
    static nodeDefId: string;
    readonly nodeDefId: "BRIDGE";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    forceUpdate(): Promise<any>;
    get connected(): Poly.BridgeQuery;
    get pluginStatus(): Poly.NsStatus;
}
export declare namespace BondBridge {
    interface Interface extends Omit<InstanceType<typeof BondBridgeNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "BRIDGE";
    }
    function is(node: ISYNode<any, any, any, any>): node is BondBridgeNode;
    function create(isy: ISY, nodeInfo: NodeInfo): BondBridgeNode;
    const Node: typeof BondBridgeNode;
    type Commands = {
        UPDATE: (() => Promise<boolean>) & {
            label: "Force Update";
            name: "forceUpdate";
        };
    };
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.Index;
            value: Poly.BridgeQuery;
            label: "Connected";
            name: "connected";
        };
        GPV: {
            uom: UnitOfMeasure.Index;
            value: Poly.NsStatus;
            label: "Plugin Status";
            name: "pluginStatus";
        };
    };
}
export {};
//# sourceMappingURL=BondBridge.d.ts.map