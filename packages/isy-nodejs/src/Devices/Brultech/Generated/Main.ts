/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Brultech } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = Main.Commands.Type;
type Drivers = Main.Drivers.Type;

class MainNode extends Base<Drivers, Commands> implements Main.Interface {
	public override readonly commands = {
		QUERY: this.query
	};
	static override nodeDefId = "BTMain";
	static override implements = ['BTMain'];
	declare readonly nodeDefId: 'BTMain';
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Watt, label: "Status", name: "status" });
		this.drivers.TPW = Driver.create("TPW", this, nodeInfo.state['TPW'], { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
		this.drivers.CV = Driver.create("CV", this, nodeInfo.state['CV'], { uom: UnitOfMeasure.Volt, label: "Current Voltage", name: "currentVoltage" });
		this.drivers.CC = Driver.create("CC", this, nodeInfo.state['CC'], { uom: UnitOfMeasure.Ampere, label: "Current Current", name: "currentCurrent" });
		this.drivers.PPW = Driver.create("PPW", this, nodeInfo.state['PPW'], { uom: UnitOfMeasure.Watt, label: "Polarized Power", name: "polarizedPower" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async query() { return this.sendCommand("QUERY"); }
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
	}
	export function is(node: ISYNode<any, any, any, any>): node is MainNode {
		return ['BTMain'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is MainNode {
		return ['BTMain'].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new MainNode(isy, nodeInfo);
	}
	export const Node = MainNode;
	export const Class = MainNode;
	export namespace Commands {
		export type Type = {
			QUERY: (() => Promise<boolean>) & {
				label: "Query";
				name: "query";
			};
		};
	}
	export enum Commands {
		query = 'QUERY'
	}
	export namespace Drivers {
		export type Type = {
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
	export enum Drivers {
		status = 'ST',
		totalEnergy = 'TPW',
		currentVoltage = 'CV',
		currentCurrent = 'CC',
		polarizedPower = 'PPW',
		responding = 'ERR'
	}
}
