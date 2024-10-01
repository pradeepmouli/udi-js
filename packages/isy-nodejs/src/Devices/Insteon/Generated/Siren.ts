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

export const nodeDefId = "SirenAlert";

type Commands = Siren.Commands;
type Drivers = Siren.Drivers;

export class SirenNode extends Base<Drivers, Commands> implements Siren.Interface {
	public readonly commands = {};
	static nodeDefId = "SirenAlert";
	declare readonly nodeDefId: "SirenAlert";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(SirenNode);

export namespace Siren {
	export interface Interface extends Omit<InstanceType<typeof SirenNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "SirenAlert";
	}
	export function is(node: ISYNode<any, any, any, any>): node is SirenNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new SirenNode(isy, nodeInfo);
	}
	export const Node = SirenNode;
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
