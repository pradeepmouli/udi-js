import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = OnOffControl.Commands;
type Drivers = OnOffControl.Drivers;
export declare class OnOffControlNode extends Base<Drivers, Commands> implements OnOffControl.Interface {
    readonly commands: {};
    static nodeDefId: string;
    readonly nodeDefId: "OnOffControl" | "OnOffControl_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    get status(): Insteon.OnLevelRelay | Insteon.OnLevelRelay;
    get responding(): Insteon.Error;
}
export declare namespace OnOffControl {
    interface Interface extends Omit<InstanceType<typeof OnOffControlNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "OnOffControl" | "OnOffControl_ADV";
    }
    function is(node: ISYNode<any, any, any, any>): node is OnOffControlNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is OnOffControlNode;
    function create(isy: ISY, nodeInfo: NodeInfo): OnOffControlNode;
    const Node: typeof OnOffControlNode;
    type Commands = {};
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.Boolean | UnitOfMeasure.Percent;
            value: Insteon.OnLevelRelay | Insteon.OnLevelRelay;
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
//# sourceMappingURL=OnOffControl.d.ts.map