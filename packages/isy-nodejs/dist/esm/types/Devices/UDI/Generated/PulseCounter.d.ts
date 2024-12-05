import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { UDI } from "../../../Definitions/index.js";
type Commands = PulseCounter.Commands;
type Drivers = PulseCounter.Drivers;
declare class PulseCounterNode extends Base<Drivers, Commands> implements PulseCounter.Interface {
    readonly commands: {};
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'EM3PulseCounter';
    constructor(isy: ISY, nodeInfo: NodeInfo);
    get status(): number;
    get currentPower(): number;
    get totalEnergy(): number;
    get responding(): UDI.Error;
}
export declare namespace PulseCounter {
    interface Interface extends Omit<InstanceType<typeof PulseCounterNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is PulseCounterNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is PulseCounterNode;
    function create(isy: ISY, nodeInfo: NodeInfo): PulseCounterNode;
    const Node: typeof PulseCounterNode;
    type Commands = {};
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.PulseCount;
            value: number;
            label: "Status";
            name: "status";
        };
        CPW: {
            uom: UnitOfMeasure.Watt;
            value: number;
            label: "Current Power";
            name: "currentPower";
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
//# sourceMappingURL=PulseCounter.d.ts.map