import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { UDI } from "../../../Definitions/index.js";
type Commands = TemperatureSensor.Commands.Type;
type Drivers = TemperatureSensor.Drivers.Type;
declare class TemperatureSensorNode extends Base<Drivers, Commands> implements TemperatureSensor.Interface {
    readonly commands: {};
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'EM3TempSensor';
    constructor(isy: ISY, nodeInfo: NodeInfo);
    get temperature(): number;
    get responding(): UDI.Error;
}
export declare namespace TemperatureSensor {
    interface Interface extends Omit<InstanceType<typeof TemperatureSensorNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is TemperatureSensorNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is TemperatureSensorNode;
    function create(isy: ISY, nodeInfo: NodeInfo): TemperatureSensorNode;
    const Node: typeof TemperatureSensorNode;
    const Class: typeof TemperatureSensorNode;
    namespace Commands {
        type Type = {};
    }
    enum Commands {
    }
    namespace Drivers {
        type Type = {
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
    enum Drivers {
        temperature = "ST",
        responding = "ERR"
    }
}
export {};
//# sourceMappingURL=TemperatureSensor.d.ts.map