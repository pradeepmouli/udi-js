import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
export declare const nodeDefId = "GENERIC";
type Commands = GenericDevice.Commands;
type Drivers = GenericDevice.Drivers;
export declare class GenericDeviceNode extends Base<Drivers, Commands> implements GenericDevice.Interface {
    readonly commands: {
        DON: () => Promise<any>;
        DOF: () => Promise<any>;
    };
    static nodeDefId: string;
    readonly nodeDefId: "GENERIC";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(): Promise<any>;
    off(): Promise<any>;
    get status(): (0 | 100 | 101);
}
export declare namespace GenericDevice {
    interface Interface extends Omit<InstanceType<typeof GenericDeviceNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "GENERIC";
    }
    function is(node: ISYNode<any, any, any, any>): node is GenericDeviceNode;
    function create(isy: ISY, nodeInfo: NodeInfo): GenericDeviceNode;
    const Node: typeof GenericDeviceNode;
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
//# sourceMappingURL=GenericDevice.d.ts.map