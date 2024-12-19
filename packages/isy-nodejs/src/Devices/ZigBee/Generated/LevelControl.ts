/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { IntRange } from "type-fest";
import { ZigBee } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = LevelControl.Commands.Type;
type Drivers = LevelControl.Drivers.Type;

class LevelControlNode extends Base<Drivers, Commands> implements LevelControl.Interface {
	public override readonly commands = {
		DON: this.on,
		DOF: this.off,
		DFON: this.fastOn,
		DFOF: this.fastOff,
		TOGGLE: this.toggle,
		BRT: this.brighten,
		DIM: this.dim,
		OL: this.updateOnLevel,
		RR: this.updateRampRate,
		IDENTIFY: this.identify,
		QUERY: this.query
	};
	static override nodeDefId = "LEVEL_CONTROL";
	static override implements = ['LEVEL_CONTROL'];
	declare readonly nodeDefId: 'LEVEL_CONTROL';
	constructor (isy: ISY, nodeInfo: NodeInfo<Family.ZigBee>) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.OffOn, label: "Status", name: "status" });
		this.drivers.OL = Driver.create("OL", this, nodeInfo.state['OL'], { uom: UnitOfMeasure.Percent, label: "On Level", name: "onLevel" });
		this.drivers.RR = Driver.create("RR", this, nodeInfo.state['RR'], { uom: UnitOfMeasure.DurationInSeconds, label: "Ramp Rate", name: "rampRate" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async on(value?: number, rampRate?: number) { return this.sendCommand("DON", value, { RR: rampRate }); }
	async off() { return this.sendCommand("DOF"); }
	async fastOn() { return this.sendCommand("DFON"); }
	async fastOff() { return this.sendCommand("DFOF"); }
	async toggle() { return this.sendCommand("TOGGLE"); }
	async brighten() { return this.sendCommand("BRT"); }
	async dim() { return this.sendCommand("DIM"); }
	async updateOnLevel(value: number) { return this.sendCommand("OL", value); }
	async updateRampRate(value: number) { return this.sendCommand("RR", value); }
	async identify(value?: number) { return this.sendCommand("IDENTIFY", value); }
	async query() { return this.sendCommand("QUERY"); }
	public get status(): (0 | 100 | 101) {
		return this.drivers.ST?.value;
	}
	public get onLevel(): number | IntRange<0, 255> {
		return this.drivers.OL?.value;
	}
	public get rampRate(): number {
		return this.drivers.RR?.value;
	}
	public get responding(): ZigBee.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(LevelControlNode);

export namespace LevelControl {
	export interface Interface extends Omit<InstanceType<typeof LevelControlNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is LevelControlNode {
		return ['LEVEL_CONTROL'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is LevelControlNode {
		return ['LEVEL_CONTROL'].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.ZigBee>) {
		return new LevelControlNode(isy, nodeInfo);
	}
	export const Node = LevelControlNode;
	export const Class = LevelControlNode;
	export namespace Commands {
		export type Type = {
			DON: ((value?: number, RR?: number) => Promise<boolean>) & {
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
			TOGGLE: (() => Promise<boolean>) & {
				label: "Toggle";
				name: "toggle";
			};
			BRT: (() => Promise<boolean>) & {
				label: "Brighten";
				name: "brighten";
			};
			DIM: (() => Promise<boolean>) & {
				label: "Dim";
				name: "dim";
			};
			OL: ((value: number) => Promise<boolean>) & {
				label: "On Level";
				name: "updateOnLevel";
			};
			RR: ((value: number) => Promise<boolean>) & {
				label: "Ramp Rate";
				name: "updateRampRate";
			};
			IDENTIFY: ((value?: number) => Promise<boolean>) & {
				label: "Identify";
				name: "identify";
			};
			QUERY: (() => Promise<boolean>) & {
				label: "Query";
				name: "query";
			};
		};
	}
	export enum Commands {
		on = 'DON',
		off = 'DOF',
		fastOn = 'DFON',
		fastOff = 'DFOF',
		toggle = 'TOGGLE',
		brighten = 'BRT',
		dim = 'DIM',
		updateOnLevel = 'OL',
		updateRampRate = 'RR',
		identify = 'IDENTIFY',
		query = 'QUERY'
	}
	export namespace Drivers {
		export type Type = {
			ST: {
				uom: UnitOfMeasure.OffOn;
				value: (0 | 100 | 101);
				label: "Status";
				name: "status";
			};
			OL: {
				uom: UnitOfMeasure.Percent | UnitOfMeasure.LevelFrom0To255;
				value: number | IntRange<0, 255>;
				label: "On Level";
				name: "onLevel";
			};
			RR: {
				uom: UnitOfMeasure.DurationInSeconds;
				value: number;
				label: "Ramp Rate";
				name: "rampRate";
			};
			ERR: {
				uom: UnitOfMeasure.Index;
				value: ZigBee.Error;
				label: "Responding";
				name: "responding";
			};
		};
	}
	export enum Drivers {
		status = 'ST',
		onLevel = 'OL',
		rampRate = 'RR',
		responding = 'ERR'
	}
}
