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

type Commands = BondBridge.Commands;
type Drivers = BondBridge.Drivers;

export class BondBridgeNode extends Base<Drivers, Commands> implements BondBridge.Interface {
	public readonly commands = {
		UPDATE: this.forceUpdate
	};
	static nodeDefId = "BRIDGE";
	declare readonly nodeDefId: "BRIDGE";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Connected", name: "connected" });
		this.drivers.GPV = Driver.create("GPV", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Plugin Status", name: "pluginStatus" });
	}
	async forceUpdate() {
		return this.sendCommand("UPDATE");
	}
	public get connected(): Poly.BridgeQuery {
		return this.drivers.ST?.value;
	}
	public get pluginStatus(): Poly.NsStatus {
		return this.drivers.GPV?.value;
	}
}

NodeFactory.register(BondBridgeNode);

export namespace BondBridge {
	export interface Interface extends Omit<InstanceType<typeof BondBridgeNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "BRIDGE";
	}
	export function is(node: ISYNode<any, any, any, any>): node is BondBridgeNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new BondBridgeNode(isy, nodeInfo);
	}
	export const Node = BondBridgeNode;
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
		GPV: {
			uom: UnitOfMeasure.Index;
			value: Poly.NsStatus;
			label: "Plugin Status";
			name: "pluginStatus";
		};
	};
}
