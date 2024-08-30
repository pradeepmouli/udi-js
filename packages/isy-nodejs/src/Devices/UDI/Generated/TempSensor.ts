/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { UDI } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

export const nodeDefId = "EM3TempSensor";

type Commands = TempSensor.Commands;
type Drivers = TempSensor.Drivers;

export class TempSensorNode extends Base<Drivers, Commands> implements TempSensor.Interface {
	public readonly commands = {};
	static nodeDefId = "EM3TempSensor";
	declare readonly nodeDefId: "EM3TempSensor";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Degree, label: "Temperature", name: "temperature" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	public get temperature(): number {
		return this.drivers.ST?.value;
	}
	public get responding(): UDI.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(TempSensorNode);

export namespace TempSensor {
	export interface Interface extends Omit<InstanceType<typeof TempSensorNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "EM3TempSensor";
	}
	export function is(node: ISYNode<any, any, any, any>): node is TempSensorNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new TempSensorNode(isy, nodeInfo);
	}
	export const Node = TempSensorNode;
	export type Commands = {};
	export type Drivers = {
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
