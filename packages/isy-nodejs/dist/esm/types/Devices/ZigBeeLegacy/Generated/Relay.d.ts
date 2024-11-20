import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
export declare const nodeDefId = "RelayLoadControl";
type Commands = Relay.Commands;
type Drivers = Relay.Drivers;
export declare class RelayNode extends Base<Drivers, Commands> implements Relay.Interface {
    readonly commands: {
        DON: () => Promise<any>;
        DOF: () => Promise<any>;
        QUERY: () => Promise<any>;
        ADRPST: (value: any) => Promise<any>;
    };
    static nodeDefId: string;
    readonly nodeDefId: "RelayLoadControl";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(): Promise<any>;
    off(): Promise<any>;
    query(): Promise<any>;
    adr(value: ): Promise<any>;
    get status(): {};
}
export declare namespace Relay {
    interface Interface extends Omit<InstanceType<typeof RelayNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "RelayLoadControl";
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
        ADRPST: ((value: ) => Promise<boolean>) & {
            label: "ADR";
            name: "adr";
        };
    };
    type Drivers = {
        ST: {
            uom: ;
            value: ;
            label: "Status";
            name: "status";
        };
        ERR: {
            uom: ;
            value: ;
            label: "Responding";
            name: "responding";
        };
    };
}
export {};
//# sourceMappingURL=Relay.d.ts.map