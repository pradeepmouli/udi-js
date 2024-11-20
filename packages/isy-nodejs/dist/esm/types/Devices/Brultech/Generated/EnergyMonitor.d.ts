import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Brultech } from "../../../Definitions/index.js";
export declare const nodeDefId = "BTChannel";
type Commands = EnergyMonitor.Commands;
type Drivers = EnergyMonitor.Drivers;
export declare class EnergyMonitorNode extends Base<Drivers, Commands> implements EnergyMonitor.Interface {
    readonly commands: {};
    static nodeDefId: string;
    readonly nodeDefId: "BTChannel";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    get status(): number;
    get totalEnergy(): number;
    get responding(): Brultech.Error;
}
export declare namespace EnergyMonitor {
    interface Interface extends Omit<InstanceType<typeof EnergyMonitorNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "BTChannel";
    }
    function is(node: ISYNode<any, any, any, any>): node is EnergyMonitorNode;
    function create(isy: ISY, nodeInfo: NodeInfo): EnergyMonitorNode;
    const Node: typeof EnergyMonitorNode;
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
            value: Brultech.Error;
            label: "Responding";
            name: "responding";
        };
    };
}
export {};
//# sourceMappingURL=EnergyMonitor.d.ts.map