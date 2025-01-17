import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = OnOffControl.Commands.Type;
type Drivers = OnOffControl.Drivers.Type;
declare class OnOffControlNode extends Base<Drivers, Commands> implements OnOffControl.Interface {
    readonly commands: {};
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'OnOffControl' | "OnOffControl_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>);
    get status(): Insteon.OnLevelRelay;
    get responding(): Insteon.Error;
}
export declare namespace OnOffControl {
    interface Interface extends Omit<InstanceType<typeof OnOffControlNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is OnOffControlNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is OnOffControlNode;
    function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>): OnOffControlNode;
    const Node: typeof OnOffControlNode;
    const Class: typeof OnOffControlNode;
    namespace Commands {
        type Type = {};
    }
    enum Commands {
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
//# sourceMappingURL=OnOffControl.d.ts.map