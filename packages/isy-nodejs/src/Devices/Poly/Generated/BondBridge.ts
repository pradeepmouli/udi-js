/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Poly } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = BondBridge.Commands.Type;
type Drivers = BondBridge.Drivers.Type;

class BondBridgeNode extends Base<Drivers, Commands> implements BondBridge.Interface {
	public override readonly commands = {
		UPDATE: this.forceUpdate
	};
	static override nodeDefId = "BRIDGE";
	static override implements = ['BRIDGE'];
	declare readonly nodeDefId: 'BRIDGE';
	constructor (isy: ISY, nodeInfo: NodeInfo<Family.Poly>) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Index, label: "Connected", name: "connected" });
		this.drivers.GPV = Driver.create("GPV", this, nodeInfo.state['GPV'], { uom: UnitOfMeasure.Index, label: "Plugin Status", name: "pluginStatus" });
	}
	async forceUpdate() { return this.sendCommand("UPDATE"); }
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
	}
	export function is(node: ISYNode<any, any, any, any>): node is BondBridgeNode {
		return ['BRIDGE'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is BondBridgeNode {
		return ['BRIDGE'].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.Poly>) {
		return new BondBridgeNode(isy, nodeInfo);
	}
	export const Node = BondBridgeNode;
	export const Class = BondBridgeNode;
	export namespace Commands {
		export type Type = {
			UPDATE: (() => Promise<boolean>) & {
				label: "Force Update";
				name: "forceUpdate";
			};
		};
	}
	export enum Commands {
		forceUpdate = 'UPDATE'
	}
	export namespace Drivers {
		export type Type = {
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
	export enum Drivers {
		connected = 'ST',
		pluginStatus = 'GPV'
	}
}
