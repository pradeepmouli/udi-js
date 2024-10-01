/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Brultech } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

export const nodeDefId = "BTChannel";

type Commands = EnergyMonitor.Commands;
type Drivers = EnergyMonitor.Drivers;

export class EnergyMonitorNode extends Base<Drivers, Commands> implements EnergyMonitor.Interface {
	public readonly commands = {};
	static nodeDefId = "BTChannel";
	declare readonly nodeDefId: "BTChannel";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Watt, label: "Status", name: "status" });
		this.drivers.TPW = Driver.create("TPW", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	public get status(): number {
		return this.drivers.ST?.value;
	}
	public get totalEnergy(): number {
		return this.drivers.TPW?.value;
	}
	public get responding(): Brultech.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(EnergyMonitorNode);

export namespace EnergyMonitor {
	export interface Interface extends Omit<InstanceType<typeof EnergyMonitorNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "BTChannel";
	}
	export function is(node: ISYNode<any, any, any, any>): node is EnergyMonitorNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new EnergyMonitorNode(isy, nodeInfo);
	}
	export const Node = EnergyMonitorNode;
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
		ERR: {
			uom: UnitOfMeasure.Index;
			value: Brultech.Error;
			label: "Responding";
			name: "responding";
		};
	};
}
