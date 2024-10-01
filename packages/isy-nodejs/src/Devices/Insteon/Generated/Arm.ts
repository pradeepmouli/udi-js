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

export const nodeDefId = "SirenArm";

type Commands = Arm.Commands;
type Drivers = Arm.Drivers;

export class ArmNode extends Base<Drivers, Commands> implements Arm.Interface {
	public readonly commands = {};
	static nodeDefId = "SirenArm";
	declare readonly nodeDefId: "SirenArm";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(ArmNode);

export namespace Arm {
	export interface Interface extends Omit<InstanceType<typeof ArmNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "SirenArm";
	}
	export function is(node: ISYNode<any, any, any, any>): node is ArmNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new ArmNode(isy, nodeInfo);
	}
	export const Node = ArmNode;
	export type Commands = {};
	export type Drivers = {
		ERR: {
			uom: UnitOfMeasure.Index;
			value: Insteon.Error;
			label: "Responding";
			name: "responding";
		};
	};
}
