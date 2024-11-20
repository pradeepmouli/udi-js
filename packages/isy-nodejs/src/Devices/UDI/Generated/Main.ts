/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { UDI } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

const nodeDefId = "EM3Main";

type Commands = Main.Commands;
type Drivers = Main.Drivers;

export class MainNode extends Base<Drivers, Commands> implements Main.Interface {
	public override readonly commands = {
		QUERY: this.query
	};
	static override nodeDefId = "EM3Main";
	declare readonly nodeDefId: "EM3Main";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Watt, label: "Status", name: "status" });
		this.drivers.TPW = Driver.create("TPW", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
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
	public get responding(): UDI.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(MainNode);

export namespace Main {
	export interface Interface extends Omit<InstanceType<typeof MainNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "EM3Main";
	}
	export function is(node: ISYNode<any, any, any, any>): node is MainNode {
		return node.nodeDefId in ["EM3Main"];
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is MainNode {
		return node.nodeDefId in ["EM3Main"];
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
		ERR: {
			uom: UnitOfMeasure.Index;
			value: UDI.Error;
			label: "Responding";
			name: "responding";
		};
	};
}
