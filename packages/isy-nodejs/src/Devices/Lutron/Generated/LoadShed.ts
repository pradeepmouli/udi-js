/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Lutron } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

const nodeDefId = "LUTLoadShed";

type Commands = LoadShed.Commands;
type Drivers = LoadShed.Drivers;

export class LoadShedNode extends Base<Drivers, Commands> implements LoadShed.Interface {
	public override readonly commands = {
		DON: this.on,
		DOF: this.off,
		QUERY: this.query
	};
	static override nodeDefId = "LUTLoadShed";
	declare readonly nodeDefId: "LUTLoadShed";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async on(value?: (0 | 100)) {
		return this.sendCommand("DON", { value: value });
	}
	async off() {
		return this.sendCommand("DOF");
	}
	async query() {
		return this.sendCommand("QUERY");
	}
	public get status(): (0 | 100) {
		return this.drivers.ST?.value;
	}
	public get responding(): Lutron.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(LoadShedNode);

export namespace LoadShed {
	export interface Interface extends Omit<InstanceType<typeof LoadShedNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "LUTLoadShed";
	}
	export function is(node: ISYNode<any, any, any, any>): node is LoadShedNode {
		return node.nodeDefId in ["LUTLoadShed"];
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is LoadShedNode {
		return node.nodeDefId in ["LUTLoadShed"];
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new LoadShedNode(isy, nodeInfo);
	}
	export const Node = LoadShedNode;
	export type Commands = {
		DON: ((value?: (0 | 100)) => Promise<boolean>) & {
			label: "On";
			name: "on";
		};
		DOF: (() => Promise<boolean>) & {
			label: "Off";
			name: "off";
		};
		QUERY: (() => Promise<boolean>) & {
			label: "Query";
			name: "query";
		};
	};
	export type Drivers = {
		ST: {
			uom: UnitOfMeasure.Percent;
			value: (0 | 100);
			label: "Status";
			name: "status";
		};
		ERR: {
			uom: UnitOfMeasure.Index;
			value: Lutron.Error;
			label: "Responding";
			name: "responding";
		};
	};
}
