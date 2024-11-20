import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
export declare const nodeDefId = "FIREPLACE";
type Commands = Fireplace.Commands;
type Drivers = Fireplace.Drivers;
export declare class FireplaceNode extends Base<Drivers, Commands> implements Fireplace.Interface {
    readonly commands: {
        DON: () => Promise<any>;
        DOF: () => Promise<any>;
    };
    static nodeDefId: string;
    readonly nodeDefId: "FIREPLACE";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(): Promise<any>;
    off(): Promise<any>;
    get status(): (0 | 100 | 101);
}
export declare namespace Fireplace {
    interface Interface extends Omit<InstanceType<typeof FireplaceNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "FIREPLACE";
    }
    function is(node: ISYNode<any, any, any, any>): node is FireplaceNode;
    function create(isy: ISY, nodeInfo: NodeInfo): FireplaceNode;
    const Node: typeof FireplaceNode;
    type Commands = {
        DON: (() => Promise<boolean>) & {
            label: "On";
            name: "on";
        };
        DOF: (() => Promise<boolean>) & {
            label: "Off";
            name: "off";
        };
    };
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.OffOn;
            value: (0 | 100 | 101);
            label: "Status";
            name: "status";
        };
    };
}
export {};
//# sourceMappingURL=Fireplace.d.ts.map