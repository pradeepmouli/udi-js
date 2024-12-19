/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = Light.Commands.Type;
type Drivers = Light.Drivers.Type;

class LightNode extends Base<Drivers, Commands> implements Light.Interface {
	public override readonly commands = {
		DON: this.on,
		DOF: this.off,
		DFON: this.fastOn,
		DFOF: this.fastOff
	};
	static override nodeDefId = "NODIM_LIGHT";
	static override implements = ['NODIM_LIGHT'];
	declare readonly nodeDefId: 'NODIM_LIGHT';
	constructor (isy: ISY, nodeInfo: NodeInfo<Family.Poly>) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.OffOn, label: "Light", name: "light" });
	}
	async on() { return this.sendCommand("DON"); }
	async off() { return this.sendCommand("DOF"); }
	async fastOn() { return this.sendCommand("DFON"); }
	async fastOff() { return this.sendCommand("DFOF"); }
	public get light(): (0 | 100 | 101) {
		return this.drivers.ST?.value;
	}
}

NodeFactory.register(LightNode);

export namespace Light {
	export interface Interface extends Omit<InstanceType<typeof LightNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is LightNode {
		return ['NODIM_LIGHT'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is LightNode {
		return ['NODIM_LIGHT'].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.Poly>) {
		return new LightNode(isy, nodeInfo);
	}
	export const Node = LightNode;
	export const Class = LightNode;
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
			DFON: (() => Promise<boolean>) & {
				label: "Fast On";
				name: "fastOn";
			};
			DFOF: (() => Promise<boolean>) & {
				label: "Fast Off";
				name: "fastOff";
			};
		};
	}
	export enum Commands {
		on = 'DON',
		off = 'DOF',
		fastOn = 'DFON',
		fastOff = 'DFOF'
	}
	export namespace Drivers {
		export type Type = {
			ST: {
				uom: UnitOfMeasure.OffOn;
				value: (0 | 100 | 101);
				label: "Light";
				name: "light";
			};
		};
	}
	export enum Drivers {
		light = 'ST'
	}
}
