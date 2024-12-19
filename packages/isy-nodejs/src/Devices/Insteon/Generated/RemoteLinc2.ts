/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { IntRange } from "type-fest";
import { Insteon } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = RemoteLinc2.Commands.Type;
type Drivers = RemoteLinc2.Drivers.Type;

class RemoteLinc2Node extends Base<Drivers, Commands> implements RemoteLinc2.Interface {
	public override readonly commands = {
		WDU: this.writeChanges
	};
	static override nodeDefId = "RemoteLinc2";
	static override implements = ['RemoteLinc2', "SirenAlert", "SirenArm"];
	declare readonly nodeDefId: 'RemoteLinc2' | "RemoteLinc2_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo<Family.Insteon>) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async writeChanges() { return this.sendCommand("WDU"); }
	public get status(): IntRange<0, 100> {
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
	}
	export function is(node: ISYNode<any, any, any, any>): node is RemoteLinc2Node {
		return ['RemoteLinc2', "RemoteLinc2_ADV"].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is RemoteLinc2Node {
		return ['RemoteLinc2', "DimmerMotorSwitch", "DimmerMotorSwitch_ADV", "DimmerLampSwitch", "DimmerLampSwitch_ADV", "DimmerLampSwitchLED", "DimmerLampSwitchLED_ADV", "KeypadDimmer", "KeypadDimmer_ADV", "RemoteLinc2_ADV"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>) {
		return new RemoteLinc2Node(isy, nodeInfo);
	}
	export const Node = RemoteLinc2Node;
	export const Class = RemoteLinc2Node;
	export namespace Commands {
		export type Type = {
			WDU: (() => Promise<boolean>) & {
				label: "Write Changes";
				name: "writeChanges";
			};
		};
	}
	export enum Commands {
		writeChanges = 'WDU'
	}
	export namespace Drivers {
		export type Type = {
			ST: {
				uom: UnitOfMeasure.Percent;
				value: IntRange<0, 100>;
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
	export enum Drivers {
		status = 'ST',
		responding = 'ERR'
	}
}
