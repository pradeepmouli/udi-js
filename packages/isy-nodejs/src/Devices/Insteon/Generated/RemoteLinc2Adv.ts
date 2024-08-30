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

export const nodeDefId = "RemoteLinc2_ADV";

type Commands = RemoteLinc2Adv.Commands;
type Drivers = RemoteLinc2Adv.Drivers;

export class RemoteLinc2AdvNode extends Base<Drivers, Commands> implements RemoteLinc2Adv.Interface {
	public readonly commands = {
		WDU: this.writeChanges
	};
	static nodeDefId = "RemoteLinc2_ADV";
	declare readonly nodeDefId: "RemoteLinc2_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async writeChanges() {
		return this.sendCommand("WDU");
	}
	public get status(): number {
		return this.drivers.ST?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(RemoteLinc2AdvNode);

export namespace RemoteLinc2Adv {
	export interface Interface extends Omit<InstanceType<typeof RemoteLinc2AdvNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "RemoteLinc2_ADV";
	}
	export function is(node: ISYNode<any, any, any, any>): node is RemoteLinc2AdvNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new RemoteLinc2AdvNode(isy, nodeInfo);
	}
	export const Node = RemoteLinc2AdvNode;
	export type Commands = {
		WDU: (() => Promise<boolean>) & {
			label: "Write Changes";
			name: "writeChanges";
		};
	};
	export type Drivers = {
		ST: {
			uom: UnitOfMeasure.Percent;
			value: number;
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
