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

export const nodeDefId = "CEILING_FAN";

type Commands = CeilingFan.Commands;
type Drivers = CeilingFan.Drivers;

export class CeilingFanNode extends Base<Drivers, Commands> implements CeilingFan.Interface {
	public readonly commands = {
		DON: this.on,
		DOF: this.off,
		BRT: this.increaseSpeed,
		DIM: this.decreaseSpeed,
		INC_SPEED: this.increaseSpeed,
		DEC_SPEED: this.decreaseSpeed,
		SET_SPEED: this.setSpeed,
		SET_DIRECTION: this.setDirection
	};
	static nodeDefId = "CEILING_FAN";
	declare readonly nodeDefId: "CEILING_FAN";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Fan Speed (%)", name: "fanSpeed" });
		this.drivers.GV0 = Driver.create("GV0", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Fan Direction", name: "fanDirection" });
		this.drivers.GV1 = Driver.create("GV1", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.RawValue, label: "Fan Speed (#)", name: "fanSpeed" });
	}
	async on(value?: Poly.ConfigurationQuery) {
		return this.sendCommand("DON", { value: value });
	}
	async off() {
		return this.sendCommand("DOF");
	}
	async increaseSpeed() {
		return this.sendCommand("BRT");
	}
	async decreaseSpeed() {
		return this.sendCommand("DIM");
	}
	async increaseSpeed() {
		return this.sendCommand("INC_SPEED");
	}
	async decreaseSpeed() {
		return this.sendCommand("DEC_SPEED");
	}
	async setSpeed(fanSpeed: number) {
		return this.sendCommand("SET_SPEED", { FAN_SPEED: fanSpeed });
	}
	async setDirection(value: number) {
		return this.sendCommand("SET_DIRECTION", { value: value });
	}
	public get fanSpeed(): Poly.ConfigurationQuery {
		return this.drivers.ST?.value;
	}
	public get fanDirection(): number {
		return this.drivers.GV0?.value;
	}
	public get fanSpeed(): number {
		return this.drivers.GV1?.value;
	}
}

NodeFactory.register(CeilingFanNode);

export namespace CeilingFan {
	export interface Interface extends Omit<InstanceType<typeof CeilingFanNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "CEILING_FAN";
	}
	export function is(node: ISYNode<any, any, any, any>): node is CeilingFanNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new CeilingFanNode(isy, nodeInfo);
	}
	export const Node = CeilingFanNode;
	export type Commands = {
		DON: ((value?: Poly.ConfigurationQuery) => Promise<boolean>) & {
			label: "On";
			name: "on";
		};
		DOF: (() => Promise<boolean>) & {
			label: "Off";
			name: "off";
		};
		BRT: (() => Promise<boolean>) & {
			label: "Increase Speed (%)";
			name: "increaseSpeed";
		};
		DIM: (() => Promise<boolean>) & {
			label: "Decrease Speed (%)";
			name: "decreaseSpeed";
		};
		INC_SPEED: (() => Promise<boolean>) & {
			label: "Increase Speed (#)";
			name: "increaseSpeed";
		};
		DEC_SPEED: (() => Promise<boolean>) & {
			label: "Decrease Speed (#)";
			name: "decreaseSpeed";
		};
		SET_SPEED: ((FAN_SPEED: number) => Promise<boolean>) & {
			label: "Set Speed";
			name: "setSpeed";
		};
		SET_DIRECTION: ((value: number) => Promise<boolean>) & {
			label: "Set Direction";
			name: "setDirection";
		};
	};
	export type Drivers = {
		ST: {
			uom: UnitOfMeasure.Percent;
			value: Poly.ConfigurationQuery;
			label: "Fan Speed (%)";
			name: "fanSpeed";
		};
		GV0: {
			uom: UnitOfMeasure.Index;
			value: number;
			label: "Fan Direction";
			name: "fanDirection";
		};
		GV1: {
			uom: UnitOfMeasure.RawValue;
			value: number;
			label: "Fan Speed (#)";
			name: "fanSpeed";
		};
	};
}
