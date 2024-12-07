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

type Commands = Channel.Commands.Type;
type Drivers = Channel.Drivers.Type;

class ChannelNode extends Base<Drivers, Commands> implements Channel.Interface {
	public override readonly commands = {};
	static override nodeDefId = "BTChannel";
	static override implements = ['BTChannel'];
	declare readonly nodeDefId: 'BTChannel';
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Watt, label: "Status", name: "status" });
		this.drivers.TPW = Driver.create("TPW", this, nodeInfo.state['TPW'], { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
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

NodeFactory.register(ChannelNode);

export namespace Channel {
	export interface Interface extends Omit<InstanceType<typeof ChannelNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is ChannelNode {
		return ['BTChannel'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is ChannelNode {
		return ['BTChannel', "BTMain"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new ChannelNode(isy, nodeInfo);
	}
	export const Node = ChannelNode;
	export const Class = ChannelNode;
	export namespace Commands {
		export type Type = {};
	}
	export enum Commands {
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
		responding = 'ERR'
	}
}
