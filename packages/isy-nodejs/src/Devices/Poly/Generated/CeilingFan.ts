/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { IntRange } from "type-fest";
import { Poly } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = CeilingFan.Commands.Type;
type Drivers = CeilingFan.Drivers.Type;

class CeilingFanNode extends Base<Drivers, Commands> implements CeilingFan.Interface {
	public override readonly commands = {
		DON: this.on,
		DOF: this.off,
		BRT: this.increaseSpeed,
		DIM: this.decreaseSpeed,
		INC_SPEED: this.increaseSpeed,
		DEC_SPEED: this.decreaseSpeed,
		SET_SPEED: this.setSpeed,
		SET_DIRECTION: this.setDirection
	};
	static override nodeDefId = "CEILING_FAN";
	static override implements = ['CEILING_FAN'];
	declare readonly nodeDefId: 'CEILING_FAN';
	constructor (isy: ISY, nodeInfo: NodeInfo<Family.Poly>) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Fan Speed (%)", name: "fanSpeed" });
		this.drivers.GV0 = Driver.create("GV0", this, nodeInfo.state['GV0'], { uom: UnitOfMeasure.Index, label: "Fan Direction", name: "fanDirection" });
		this.drivers.GV1 = Driver.create("GV1", this, nodeInfo.state['GV1'], { uom: UnitOfMeasure.RawValue, label: "Fan Speed (#)", name: "fanSpeed" });
	}
	async on(value?: Poly.ConfigurationQuery) { return this.sendCommand("DON", value); }
	async off() { return this.sendCommand("DOF"); }
	async increaseSpeed() { return this.sendCommand("BRT"); }
	async decreaseSpeed() { return this.sendCommand("DIM"); }
	async increaseSpeed() { return this.sendCommand("INC_SPEED"); }
	async decreaseSpeed() { return this.sendCommand("DEC_SPEED"); }
	async setSpeed(fanSpeed: number) { return this.sendCommand("SET_SPEED", { FAN_SPEED: fanSpeed }); }
	async setDirection(value: Poly.ConfigurationDirection) { return this.sendCommand("SET_DIRECTION", value); }
	public get fanSpeed(): Poly.ConfigurationQuery {
		return this.drivers.ST?.value;
	}
	public get fanDirection(): Poly.ConfigurationDirection {
		return this.drivers.GV0?.value;
	}
	public get fanSpeed(): IntRange<1, 10> {
		return this.drivers.GV1?.value;
	}
}

NodeFactory.register(CeilingFanNode);

export namespace CeilingFan {
	export interface Interface extends Omit<InstanceType<typeof CeilingFanNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is CeilingFanNode {
		return ['CEILING_FAN'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is CeilingFanNode {
		return ['CEILING_FAN'].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.Poly>) {
		return new CeilingFanNode(isy, nodeInfo);
	}
	export const Node = CeilingFanNode;
	export const Class = CeilingFanNode;
	export namespace Commands {
		export type Type = {
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
			SET_DIRECTION: ((value: Poly.ConfigurationDirection) => Promise<boolean>) & {
				label: "Set Direction";
				name: "setDirection";
			};
		};
	}
	export enum Commands {
		on = 'DON',
		off = 'DOF',
		increaseSpeed = 'BRT',
		decreaseSpeed = 'DIM',
		increaseSpeed = 'INC_SPEED',
		decreaseSpeed = 'DEC_SPEED',
		setSpeed = 'SET_SPEED',
		setDirection = 'SET_DIRECTION'
	}
	export namespace Drivers {
		export type Type = {
			ST: {
				uom: UnitOfMeasure.Percent;
				value: Poly.ConfigurationQuery;
				label: "Fan Speed (%)";
				name: "fanSpeed";
			};
			GV0: {
				uom: UnitOfMeasure.Index;
				value: Poly.ConfigurationDirection;
				label: "Fan Direction";
				name: "fanDirection";
			};
			GV1: {
				uom: UnitOfMeasure.RawValue;
				value: IntRange<1, 10>;
				label: "Fan Speed (#)";
				name: "fanSpeed";
			};
		};
	}
	export enum Drivers {
		fanSpeed = 'ST',
		fanDirection = 'GV0',
		fanSpeed = 'GV1'
	}
}
