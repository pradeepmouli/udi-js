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

export const nodeDefId = "EM3MainChannel";

type Commands = Em3MainChannel.Commands;
type Drivers = Em3MainChannel.Drivers;

export class Em3MainChannelNode extends Base<Drivers, Commands> implements Em3MainChannel.Interface {
	public readonly commands = {};
	static nodeDefId = "EM3MainChannel";
	declare readonly nodeDefId: "EM3MainChannel";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Watt, label: "Status", name: "status" });
		this.drivers.TPW = Driver.create("TPW", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
		this.drivers.CV = Driver.create("CV", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Volt, label: "Current Voltage", name: "currentVoltage" });
		this.drivers.CC = Driver.create("CC", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Ampere, label: "Current Current", name: "currentCurrent" });
		this.drivers.PF = Driver.create("PF", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.PowerFactor, label: "Power Factor", name: "powerFactor" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	public get status(): number {
		return this.drivers.ST?.value;
	}
	public get totalEnergy(): number {
		return this.drivers.TPW?.value;
	}
	public get currentVoltage(): number {
		return this.drivers.CV?.value;
	}
	public get currentCurrent(): number {
		return this.drivers.CC?.value;
	}
	public get powerFactor(): number {
		return this.drivers.PF?.value;
	}
	public get responding(): UDI.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(Em3MainChannelNode);

export namespace Em3MainChannel {
	export interface Interface extends Omit<InstanceType<typeof Em3MainChannelNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "EM3MainChannel";
	}
	export function is(node: ISYNode<any, any, any, any>): node is Em3MainChannelNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new Em3MainChannelNode(isy, nodeInfo);
	}
	export const Node = Em3MainChannelNode;
	export type Commands = {};
	export type Drivers = {
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
