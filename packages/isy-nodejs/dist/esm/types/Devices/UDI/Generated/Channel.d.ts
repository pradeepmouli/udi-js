import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { UDI } from "../../../Definitions/index.js";
type Commands = Channel.Commands;
type Drivers = Channel.Drivers;
declare class ChannelNode extends Base<Drivers, Commands> implements Channel.Interface {
    readonly commands: {};
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'EM3Channel';
    constructor(isy: ISY, nodeInfo: NodeInfo);
    get status(): number;
    get totalEnergy(): number;
    get responding(): UDI.Error;
}
export declare namespace Channel {
    interface Interface extends Omit<InstanceType<typeof ChannelNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is ChannelNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is ChannelNode;
    function create(isy: ISY, nodeInfo: NodeInfo): ChannelNode;
    const Node: typeof ChannelNode;
    type Commands = {};
    type Drivers = {
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
export {};
//# sourceMappingURL=Channel.d.ts.map