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

export const nodeDefId = "NODIM_LIGHT";

type Commands = Light.Commands;
type Drivers = Light.Drivers;

export class LightNode extends Fireplace implements Light.Interface {
	public readonly commands = {
		DON: this.on,
		DOF: this.off,
		DFON: this.fastOn,
		DFOF: this.fastOff
	};
	static nodeDefId = "NODIM_LIGHT";
	declare readonly nodeDefId: "NODIM_LIGHT";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.OffOn, label: "Light", name: "light" });
	}
	async on() {
		return this.sendCommand("DON");
	}
	async off() {
		return this.sendCommand("DOF");
	}
	async fastOn() {
		return this.sendCommand("DFON");
	}
	async fastOff() {
		return this.sendCommand("DFOF");
	}
	public get light(): (0 | 100 | 101) {
		return this.drivers.ST?.value;
	}
}

NodeFactory.register(LightNode);

export namespace Light {
	export interface Interface extends Omit<InstanceType<typeof LightNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "NODIM_LIGHT";
	}
	export function is(node: ISYNode<any, any, any, any>): node is LightNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new LightNode(isy, nodeInfo);
	}
	export const Node = LightNode;
	export type Commands = {
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
	export type Drivers = {
		ST: {
			uom: UnitOfMeasure.OffOn;
			value: (0 | 100 | 101);
			label: "Light";
			name: "light";
		};
	};
}
