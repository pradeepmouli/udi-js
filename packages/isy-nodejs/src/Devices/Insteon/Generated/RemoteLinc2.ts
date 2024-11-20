/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Insteon } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

const nodeDefId = "RemoteLinc2";

type Commands = RemoteLinc2.Commands;
type Drivers = RemoteLinc2.Drivers;

export class RemoteLinc2Node extends Base<Drivers, Commands> implements RemoteLinc2.Interface {
	public override readonly commands = {
		WDU: this.writeChanges
	};
	static override nodeDefId = "RemoteLinc2";
	declare readonly nodeDefId: "RemoteLinc2" | "RemoteLinc2_ADV";
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

NodeFactory.register(RemoteLinc2Node);
NodeFactory.register(RemoteLinc2Node, "RemoteLinc2_ADV");

export namespace RemoteLinc2 {
	export interface Interface extends Omit<InstanceType<typeof RemoteLinc2Node>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "RemoteLinc2" | "RemoteLinc2_ADV";
	}
	export function is(node: ISYNode<any, any, any, any>): node is RemoteLinc2Node {
		return node.nodeDefId in ["RemoteLinc2", "RemoteLinc2_ADV"];
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is RemoteLinc2Node {
		return node.nodeDefId in ["RemoteLinc2", "DimmerMotorSwitch", "DimmerMotorSwitch_ADV", "DimmerLampSwitch", "DimmerLampSwitch_ADV", "DimmerLampSwitchLED", "DimmerLampSwitchLED_ADV", "KeypadDimmer", "KeypadDimmer_ADV", "RemoteLinc2_ADV"];
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new RemoteLinc2Node(isy, nodeInfo);
	}
	export const Node = RemoteLinc2Node;
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
