import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Lutron } from "../../../Definitions/index.js";
type Commands = LoadShed.Commands.Type;
type Drivers = LoadShed.Drivers.Type;
declare class LoadShedNode extends Base<Drivers, Commands> implements LoadShed.Interface {
    readonly commands: {
        DON: (value?: (0 | 100)) => Promise<any>;
        DOF: () => Promise<any>;
        QUERY: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'LUTLoadShed';
    constructor(isy: ISY, nodeInfo: NodeInfo<Family.Lutron>);
    on(value?: (0 | 100)): Promise<any>;
    off(): Promise<any>;
    query(): Promise<any>;
    get status(): (0 | 100);
    get responding(): Lutron.Error;
}
export declare namespace LoadShed {
    interface Interface extends Omit<InstanceType<typeof LoadShedNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is LoadShedNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is LoadShedNode;
    function create(isy: ISY, nodeInfo: NodeInfo<Family.Lutron>): LoadShedNode;
    const Node: typeof LoadShedNode;
    const Class: typeof LoadShedNode;
    namespace Commands {
        type Type = {
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
    }
    enum Commands {
        on = "DON",
        off = "DOF",
        query = "QUERY"
    }
    namespace Drivers {
        type Type = {
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
    enum Drivers {
        status = "ST",
        responding = "ERR"
    }
}
export {};
//# sourceMappingURL=LoadShed.d.ts.map