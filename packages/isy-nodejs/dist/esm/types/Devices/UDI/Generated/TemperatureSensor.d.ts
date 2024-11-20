import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { UDI } from "../../../Definitions/index.js";
type Commands = TemperatureSensor.Commands;
type Drivers = TemperatureSensor.Drivers;
export declare class TemperatureSensorNode extends Base<Drivers, Commands> implements TemperatureSensor.Interface {
    readonly commands: {};
    static nodeDefId: string;
    readonly nodeDefId: "EM3TempSensor";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    get temperature(): number;
    get responding(): UDI.Error;
}
export declare namespace TemperatureSensor {
    interface Interface extends Omit<InstanceType<typeof TemperatureSensorNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "EM3TempSensor";
    }
    function is(node: ISYNode<any, any, any, any>): node is TemperatureSensorNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is TemperatureSensorNode;
    function create(isy: ISY, nodeInfo: NodeInfo): TemperatureSensorNode;
    const Node: typeof TemperatureSensorNode;
    type Commands = {};
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.Degree;
            value: number;
            label: "Temperature";
            name: "temperature";
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
//# sourceMappingURL=TemperatureSensor.d.ts.map