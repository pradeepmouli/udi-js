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

export const nodeDefId = "KEYPAD_BTN";

type Commands = Switch.Commands;
type Drivers = Switch.Drivers;

export class SwitchNode extends Base<Drivers, Commands> implements Switch.Interface {
	public readonly commands = {};
	static nodeDefId = "KEYPAD_BTN";
	declare readonly nodeDefId: "KEYPAD_BTN";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
	}
}

NodeFactory.register(SwitchNode);

export namespace Switch {
	export interface Interface extends Omit<InstanceType<typeof SwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "KEYPAD_BTN";
	}
	export function is(node: ISYNode<any, any, any, any>): node is SwitchNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new SwitchNode(isy, nodeInfo);
	}
	export const Node = SwitchNode;
	export type Commands = {};
	export type Drivers = {};
}
