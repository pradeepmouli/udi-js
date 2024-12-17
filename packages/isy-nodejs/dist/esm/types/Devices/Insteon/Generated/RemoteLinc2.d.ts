import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import type { IntRange } from "type-fest";
import { Insteon } from "../../../Definitions/index.js";
type Commands = RemoteLinc2.Commands.Type;
type Drivers = RemoteLinc2.Drivers.Type;
declare class RemoteLinc2Node extends Base<Drivers, Commands> implements RemoteLinc2.Interface {
    readonly commands: {
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'RemoteLinc2' | "RemoteLinc2_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    writeChanges(): Promise<any>;
    get status(): IntRange<0, 100>;
    get responding(): Insteon.Error;
}
export declare namespace RemoteLinc2 {
    interface Interface extends Omit<InstanceType<typeof RemoteLinc2Node>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is RemoteLinc2Node;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is RemoteLinc2Node;
    function create(isy: ISY, nodeInfo: NodeInfo): RemoteLinc2Node;
    const Node: typeof RemoteLinc2Node;
    const Class: typeof RemoteLinc2Node;
    namespace Commands {
        type Type = {
            WDU: (() => Promise<boolean>) & {
                label: "Write Changes";
                name: "writeChanges";
            };
        };
    }
    enum Commands {
        writeChanges = "WDU"
    }
    namespace Drivers {
        type Type = {
            ST: {
                uom: UnitOfMeasure.Percent;
                value: IntRange<0, 100>;
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
//# sourceMappingURL=RemoteLinc2.d.ts.map