/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Poly } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

export const nodeDefId = "BRIDGE";

type Commands = Output.Commands;
type Drivers = Output.Drivers;

export class OutputNode extends Base<Drivers, Commands> implements Output.Interface {
	public readonly commands = {
		UPDATE: this.forceUpdate
	};
	static nodeDefId = "BRIDGE";
	declare readonly nodeDefId: "BRIDGE";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Connected", name: "connected" });
	}
	async forceUpdate() {
		return this.sendCommand("UPDATE");
	}
	public get connected(): Poly.BridgeQuery {
		return this.drivers.ST?.value;
	}
}

NodeFactory.register(OutputNode);

export namespace Output {
	export interface Interface extends Omit<InstanceType<typeof OutputNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "BRIDGE";
	}
	export function is(node: ISYNode<any, any, any, any>): node is OutputNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new OutputNode(isy, nodeInfo);
	}
	export const Node = OutputNode;
	export type Commands = {
		UPDATE: (() => Promise<boolean>) & {
			label: "Force Update";
			name: "forceUpdate";
		};
	};
	export type Drivers = {
		ST: {
			uom: UnitOfMeasure.Index;
			value: Poly.BridgeQuery;
			label: "Connected";
			name: "connected";
		};
	};
}
