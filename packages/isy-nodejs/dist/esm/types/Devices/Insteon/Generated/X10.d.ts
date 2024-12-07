import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = X10.Commands.Type;
type Drivers = X10.Drivers.Type;
declare class X10Node extends Base<Drivers, Commands> implements X10.Interface {
    readonly commands: {
        DON: () => Promise<any>;
        DOF: () => Promise<any>;
        BRT: () => Promise<any>;
        DIM: () => Promise<any>;
        QUERY: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'X10';
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(): Promise<any>;
    off(): Promise<any>;
    brighten(): Promise<any>;
    dim(): Promise<any>;
    query(): Promise<any>;
    get status(): Insteon.OnLevelRelay;
    get responding(): Insteon.Error;
}
export declare namespace X10 {
    interface Interface extends Omit<InstanceType<typeof X10Node>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is X10Node;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is X10Node;
    function create(isy: ISY, nodeInfo: NodeInfo): X10Node;
    const Node: typeof X10Node;
    const Class: typeof X10Node;
    namespace Commands {
        type Type = {
            DON: (() => Promise<boolean>) & {
                label: "On";
                name: "on";
            };
            DOF: (() => Promise<boolean>) & {
                label: "Off";
                name: "off";
            };
            BRT: (() => Promise<boolean>) & {
                label: "Brighten";
                name: "brighten";
            };
            DIM: (() => Promise<boolean>) & {
                label: "Dim";
                name: "dim";
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
        brighten = "BRT",
        dim = "DIM",
        query = "QUERY"
    }
    namespace Drivers {
        type Type = {
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
    enum Drivers {
        status = "ST",
        responding = "ERR"
    }
}
export {};
//# sourceMappingURL=X10.d.ts.map