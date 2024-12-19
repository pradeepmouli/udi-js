/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = Fireplace.Commands.Type;
type Drivers = Fireplace.Drivers.Type;

class FireplaceNode extends Base<Drivers, Commands> implements Fireplace.Interface {
	public override readonly commands = {
		DON: this.on,
		DOF: this.off
	};
	static override nodeDefId = "FIREPLACE";
	static override implements = ['FIREPLACE'];
	declare readonly nodeDefId: 'FIREPLACE' | "GENERIC";
	constructor (isy: ISY, nodeInfo: NodeInfo<Family.Poly>) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.OffOn, label: "Status", name: "status" });
	}
	async on() { return this.sendCommand("DON"); }
	async off() { return this.sendCommand("DOF"); }
	public get status(): (0 | 100 | 101) {
		return this.drivers.ST?.value;
	}
}

NodeFactory.register(FireplaceNode);
NodeFactory.register(FireplaceNode, "GENERIC");

export namespace Fireplace {
	export interface Interface extends Omit<InstanceType<typeof FireplaceNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is FireplaceNode {
		return ['FIREPLACE', "GENERIC"].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is FireplaceNode {
		return ['FIREPLACE', "NODIM_LIGHT", "SHADE", "GENERIC"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.Poly>) {
		return new FireplaceNode(isy, nodeInfo);
	}
	export const Node = FireplaceNode;
	export const Class = FireplaceNode;
	export namespace Commands {
		export type Type = {
			DON: (() => Promise<boolean>) & {
				label: "On";
				name: "on";
			};
			DOF: (() => Promise<boolean>) & {
				label: "Off";
				name: "off";
			};
		};
	}
	export enum Commands {
		on = 'DON',
		off = 'DOF'
	}
	export namespace Drivers {
		export type Type = {
			ST: {
				uom: UnitOfMeasure.OffOn;
				value: (0 | 100 | 101);
				label: "Status";
				name: "status";
			};
		};
	}
	export enum Drivers {
		status = 'ST'
	}
}
