/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Insteon } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

export const nodeDefId = "X10";

type Commands = X10.Commands;
type Drivers = X10.Drivers;

export class X10Node extends OnOffControl implements X10.Interface {
	public readonly commands = {
		DON: this.on,
		DOF: this.off,
		BRT: this.brighten,
		DIM: this.dim,
		QUERY: this.query
	};
	static nodeDefId = "X10";
	declare readonly nodeDefId: "X10";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async on() {
		return this.sendCommand("DON");
	}
	async off() {
		return this.sendCommand("DOF");
	}
	async brighten() {
		return this.sendCommand("BRT");
	}
	async dim() {
		return this.sendCommand("DIM");
	}
	async query() {
		return this.sendCommand("QUERY");
	}
	public get status(): Insteon.OnLevelRelay {
		return this.drivers.ST?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(X10Node);

export namespace X10 {
	export interface Interface extends Omit<InstanceType<typeof X10Node>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "X10";
	}
	export function is(node: ISYNode<any, any, any, any>): node is X10Node {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new X10Node(isy, nodeInfo);
	}
	export const Node = X10Node;
	export type Commands = {
		DON: (() => Promise<boolean>) & {
			label: "On";
			name: "on";
		};
		DOF: (() => Promise<boolean>) & {
			label: "Off";
			name: "off";
		};
		BRT: (() => Promise<boolean>) & {
			label: "Brighten";
			name: "brighten";
		};
		DIM: (() => Promise<boolean>) & {
			label: "Dim";
			name: "dim";
		};
		QUERY: (() => Promise<boolean>) & {
			label: "Query";
			name: "query";
		};
	};
	export type Drivers = {
		ST: {
			uom: UnitOfMeasure.Percent;
			value: Insteon.OnLevelRelay;
			label: "Status";
			name: "status";
		};
		ERR: {
			uom: UnitOfMeasure.Index;
			value: Insteon.Error;
			label: "Responding";
			name: "responding";
		};
	};
}
