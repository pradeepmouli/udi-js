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

export const nodeDefId = "BTMain";

type Commands = Main.Commands;
type Drivers = Main.Drivers;

export class MainNode extends Base<Drivers, Commands> implements Main.Interface {
	public readonly commands = {
		QUERY: this.query
	};
	static nodeDefId = "BTMain";
	declare readonly nodeDefId: "BTMain";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Watt, label: "Status", name: "status" });
		this.drivers.TPW = Driver.create("TPW", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
		this.drivers.CV = Driver.create("CV", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Volt, label: "Current Voltage", name: "currentVoltage" });
		this.drivers.CC = Driver.create("CC", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Ampere, label: "Current Current", name: "currentCurrent" });
		this.drivers.PPW = Driver.create("PPW", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Watt, label: "Polarized Power", name: "polarizedPower" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async query() {
		return this.sendCommand("QUERY");
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
	public get polarizedPower(): number {
		return this.drivers.PPW?.value;
	}
	public get responding(): Brultech.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(MainNode);

export namespace Main {
	export interface Interface extends Omit<InstanceType<typeof MainNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "BTMain";
	}
	export function is(node: ISYNode<any, any, any, any>): node is MainNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new MainNode(isy, nodeInfo);
	}
	export const Node = MainNode;
	export type Commands = {
		QUERY: (() => Promise<boolean>) & {
			label: "Query";
			name: "query";
		};
	};
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
		PPW: {
			uom: UnitOfMeasure.Watt;
			value: number;
			label: "Polarized Power";
			name: "polarizedPower";
		};
		ERR: {
			uom: UnitOfMeasure.Index;
			value: Brultech.Error;
			label: "Responding";
			name: "responding";
		};
	};
}
