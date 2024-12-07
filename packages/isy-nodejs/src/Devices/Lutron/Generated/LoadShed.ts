/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Lutron } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = LoadShed.Commands.Type;
type Drivers = LoadShed.Drivers.Type;

class LoadShedNode extends Base<Drivers, Commands> implements LoadShed.Interface {
	public override readonly commands = {
		DON: this.on,
		DOF: this.off,
		QUERY: this.query
	};
	static override nodeDefId = "LUTLoadShed";
	static override implements = ['LUTLoadShed'];
	declare readonly nodeDefId: 'LUTLoadShed';
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async on(value?: (0 | 100)) { return this.sendCommand("DON", value); }
	async off() { return this.sendCommand("DOF"); }
	async query() { return this.sendCommand("QUERY"); }
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
	}
	export function is(node: ISYNode<any, any, any, any>): node is LoadShedNode {
		return ['LUTLoadShed'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is LoadShedNode {
		return ['LUTLoadShed'].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new LoadShedNode(isy, nodeInfo);
	}
	export const Node = LoadShedNode;
	export const Class = LoadShedNode;
	export namespace Commands {
		export type Type = {
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
	}
	export enum Commands {
		on = 'DON',
		off = 'DOF',
		query = 'QUERY'
	}
	export namespace Drivers {
		export type Type = {
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
	export enum Drivers {
		status = 'ST',
		responding = 'ERR'
	}
}
