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

export const nodeDefId = "FIREPLACE";

type Commands = Fireplace.Commands;
type Drivers = Fireplace.Drivers;

export class FireplaceNode extends Base<Drivers, Commands> implements Fireplace.Interface {
	public readonly commands = {
		DON: this.on,
		DOF: this.off
	};
	static nodeDefId = "FIREPLACE";
	declare readonly nodeDefId: "FIREPLACE";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.OffOn, label: "Status", name: "status" });
	}
	async on() {
		return this.sendCommand("DON");
	}
	async off() {
		return this.sendCommand("DOF");
	}
	public get status(): (0 | 100 | 101) {
		return this.drivers.ST?.value;
	}
}

NodeFactory.register(FireplaceNode);

export namespace Fireplace {
	export interface Interface extends Omit<InstanceType<typeof FireplaceNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "FIREPLACE";
	}
	export function is(node: ISYNode<any, any, any, any>): node is FireplaceNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new FireplaceNode(isy, nodeInfo);
	}
	export const Node = FireplaceNode;
	export type Commands = {
		DON: (() => Promise<boolean>) & {
			label: "On";
			name: "on";
		};
		DOF: (() => Promise<boolean>) & {
			label: "Off";
			name: "off";
		};
	};
	export type Drivers = {
		ST: {
			uom: UnitOfMeasure.OffOn;
			value: (0 | 100 | 101);
			label: "Status";
			name: "status";
		};
	};
}
