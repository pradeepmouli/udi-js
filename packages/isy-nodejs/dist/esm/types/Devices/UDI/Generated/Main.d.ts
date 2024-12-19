import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { UDI } from "../../../Definitions/index.js";
type Commands = Main.Commands.Type;
type Drivers = Main.Drivers.Type;
declare class MainNode extends Base<Drivers, Commands> implements Main.Interface {
    readonly commands: {
        QUERY: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'EM3Main';
    constructor(isy: ISY, nodeInfo: NodeInfo<Family.UDI>);
    query(): Promise<any>;
    get status(): number;
    get totalEnergy(): number;
    get responding(): UDI.Error;
}
export declare namespace Main {
    interface Interface extends Omit<InstanceType<typeof MainNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is MainNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is MainNode;
    function create(isy: ISY, nodeInfo: NodeInfo<Family.UDI>): MainNode;
    const Node: typeof MainNode;
    const Class: typeof MainNode;
    namespace Commands {
        type Type = {
            QUERY: (() => Promise<boolean>) & {
                label: "Query";
                name: "query";
            };
        };
    }
    enum Commands {
        query = "QUERY"
    }
    namespace Drivers {
        type Type = {
            ST: {
                uom: UnitOfMeasure.Watt;
                value: number;
                label: "Status";
                name: "status";
            };
            TPW: {
                uom: UnitOfMeasure.KilowattsPerHour;
                value: number;
                label: "Total Energy";
                name: "totalEnergy";
            };
            ERR: {
                uom: UnitOfMeasure.Index;
                value: UDI.Error;
                label: "Responding";
                name: "responding";
            };
        };
    }
    enum Drivers {
        status = "ST",
        totalEnergy = "TPW",
        responding = "ERR"
    }
}
export {};
//# sourceMappingURL=Main.d.ts.map