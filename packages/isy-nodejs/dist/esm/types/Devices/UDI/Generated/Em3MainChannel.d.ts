import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { UDI } from "../../../Definitions/index.js";
type Commands = Em3MainChannel.Commands;
type Drivers = Em3MainChannel.Drivers;
export declare class Em3MainChannelNode extends Base<Drivers, Commands> implements Em3MainChannel.Interface {
    readonly commands: {};
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: "EM3MainChannel";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    get status(): number;
    get totalEnergy(): number;
    get currentVoltage(): number;
    get currentCurrent(): number;
    get powerFactor(): number;
    get responding(): UDI.Error;
}
export declare namespace Em3MainChannel {
    interface Interface extends Omit<InstanceType<typeof Em3MainChannelNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "EM3MainChannel";
    }
    function is(node: ISYNode<any, any, any, any>): node is Em3MainChannelNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is Em3MainChannelNode;
    function create(isy: ISY, nodeInfo: NodeInfo): Em3MainChannelNode;
    const Node: typeof Em3MainChannelNode;
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
        CV: {
            uom: UnitOfMeasure.Volt;
            value: number;
            label: "Current Voltage";
            name: "currentVoltage";
        };
        CC: {
            uom: UnitOfMeasure.Ampere;
            value: number;
            label: "Current Current";
            name: "currentCurrent";
        };
        PF: {
            uom: UnitOfMeasure.PowerFactor;
            value: number;
            label: "Power Factor";
            name: "powerFactor";
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
//# sourceMappingURL=Em3MainChannel.d.ts.map