/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { UDI } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = TemperatureSensor.Commands.Type;
type Drivers = TemperatureSensor.Drivers.Type;

class TemperatureSensorNode extends Base<Drivers, Commands> implements TemperatureSensor.Interface {
	public override readonly commands = {};
	static override nodeDefId = "EM3TempSensor";
	static override implements = ['EM3TempSensor'];
	declare readonly nodeDefId: 'EM3TempSensor';
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Degree, label: "Temperature", name: "temperature" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	public get temperature(): number {
		return this.drivers.ST?.value;
	}
	public get responding(): UDI.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(TemperatureSensorNode);

export namespace TemperatureSensor {
	export interface Interface extends Omit<InstanceType<typeof TemperatureSensorNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is TemperatureSensorNode {
		return ['EM3TempSensor'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is TemperatureSensorNode {
		return ['EM3TempSensor'].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new TemperatureSensorNode(isy, nodeInfo);
	}
	export const Node = TemperatureSensorNode;
	export const Class = TemperatureSensorNode;
	export namespace Commands {
		export type Type = {};
	}
	export enum Commands {
	}
	export namespace Drivers {
		export type Type = {
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
	export enum Drivers {
		temperature = 'ST',
		responding = 'ERR'
	}
}
