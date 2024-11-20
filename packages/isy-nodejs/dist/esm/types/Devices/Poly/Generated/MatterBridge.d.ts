import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
export declare const nodeDefId = "CONTROLLER";
type Commands = MatterBridge.Commands;
type Drivers = MatterBridge.Drivers;
export declare class MatterBridgeNode extends Base<Drivers, Commands> implements MatterBridge.Interface {
    readonly commands: {
        DISCOVER: () => Promise<any>;
        QUERY: () => Promise<any>;
        START_BRIDGE: () => Promise<any>;
        STOP_BRIDGE: () => Promise<any>;
    };
    static nodeDefId: string;
    readonly nodeDefId: "CONTROLLER";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    discover(): Promise<any>;
    query(): Promise<any>;
    startBridge(): Promise<any>;
    stopBridge(): Promise<any>;
    get status(): {};
}
export declare namespace MatterBridge {
    interface Interface extends Omit<InstanceType<typeof MatterBridgeNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "CONTROLLER";
    }
    function is(node: ISYNode<any, any, any, any>): node is MatterBridgeNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is MatterBridgeNode;
    function create(isy: ISY, nodeInfo: NodeInfo): MatterBridgeNode;
    const Node: typeof MatterBridgeNode;
    type Commands = {
        DISCOVER: (() => Promise<boolean>) & {
            label: "Discover";
            name: "discover";
        };
        QUERY: (() => Promise<boolean>) & {
            label: "Query";
            name: "query";
        };
        START_BRIDGE: (() => Promise<boolean>) & {
            label: "Start Bridge";
            name: "startBridge";
        };
        STOP_BRIDGE: (() => Promise<boolean>) & {
            label: "Stop Bridge";
            name: "stopBridge";
        };
    };
    type Drivers = {
        ST: {
            uom: ;
            value: ;
            label: "Status";
            name: "status";
        };
    };
}
export {};
//# sourceMappingURL=MatterBridge.d.ts.map