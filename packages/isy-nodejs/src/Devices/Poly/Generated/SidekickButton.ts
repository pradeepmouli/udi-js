/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { Family } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = SidekickButton.Commands.Type;
type Drivers = SidekickButton.Drivers.Type;

class SidekickButtonNode extends Base<Drivers, Commands> implements SidekickButton.Interface {
	public override readonly commands = {};
	static override nodeDefId = "KEYPAD_BTN";
	static override implements = ['KEYPAD_BTN'];
	declare readonly nodeDefId: 'KEYPAD_BTN';
	constructor (isy: ISY, nodeInfo: NodeInfo<Family.Poly>) {
		super(isy, nodeInfo);
	}
}

NodeFactory.register(SidekickButtonNode);

export namespace SidekickButton {
	export interface Interface extends Omit<InstanceType<typeof SidekickButtonNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is SidekickButtonNode {
		return ['KEYPAD_BTN'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is SidekickButtonNode {
		return ['KEYPAD_BTN'].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.Poly>) {
		return new SidekickButtonNode(isy, nodeInfo);
	}
	export const Node = SidekickButtonNode;
	export const Class = SidekickButtonNode;
	export namespace Commands {
		export type Type = {};
	}
	export enum Commands {
	}
	export namespace Drivers {
		export type Type = {};
	}
	export enum Drivers {
	}
}
