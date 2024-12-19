/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { IntRange } from "type-fest";
import { Insteon } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = DimmerLamp.Commands.Type;
type Drivers = DimmerLamp.Drivers.Type;

class DimmerLampNode extends Base<Drivers, Commands> implements DimmerLamp.Interface {
	public override readonly commands = {
		DON: this.on,
		DOF: this.off,
		DFOF: this.fastOff,
		DFON: this.fastOn,
		BRT: this.brighten,
		DIM: this.dim,
		FDUP: this.fadeUp,
		FDDOWN: this.fadeDown,
		FDSTOP: this.fadeStop,
		QUERY: this.query,
		BEEP: this.beep,
		OL: this.updateOnLevel,
		RR: this.updateRampRate,
		WDU: this.writeChanges
	};
	static override nodeDefId = "DimmerLampOnly";
	static override implements = ['DimmerLampOnly', "IRLincTx", "SirenAlert", "SirenArm"];
	declare readonly nodeDefId: 'DimmerLampOnly';
	constructor (isy: ISY, nodeInfo: NodeInfo<Family.Insteon>) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.OL = Driver.create("OL", this, nodeInfo.state['OL'], { uom: UnitOfMeasure.Percent, label: "On Level", name: "onLevel" });
		this.drivers.RR = Driver.create("RR", this, nodeInfo.state['RR'], { uom: UnitOfMeasure.Index, label: "Ramp Rate", name: "rampRate" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async on(value?: number) { return this.sendCommand("DON", value); }
	async off() { return this.sendCommand("DOF"); }
	async fastOff() { return this.sendCommand("DFOF"); }
	async fastOn() { return this.sendCommand("DFON"); }
	async brighten() { return this.sendCommand("BRT"); }
	async dim() { return this.sendCommand("DIM"); }
	async fadeUp() { return this.sendCommand("FDUP"); }
	async fadeDown() { return this.sendCommand("FDDOWN"); }
	async fadeStop() { return this.sendCommand("FDSTOP"); }
	async query() { return this.sendCommand("QUERY"); }
	async beep(value?: number) { return this.sendCommand("BEEP", value); }
	async updateOnLevel(value: number) { return this.sendCommand("OL", value); }
	async updateRampRate(value: Insteon.RampRate) { return this.sendCommand("RR", value); }
	async writeChanges() { return this.sendCommand("WDU"); }
	public get status(): IntRange<0, 100> {
		return this.drivers.ST?.value;
	}
	public get onLevel(): IntRange<0, 100> {
		return this.drivers.OL?.value;
	}
	public get rampRate(): Insteon.RampRate {
		return this.drivers.RR?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(DimmerLampNode);

export namespace DimmerLamp {
	export interface Interface extends Omit<InstanceType<typeof DimmerLampNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is DimmerLampNode {
		return ['DimmerLampOnly'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is DimmerLampNode {
		return ['DimmerLampOnly', "DimmerLampSwitch", "DimmerLampSwitch_ADV", "DimmerLampSwitchLED", "DimmerLampSwitchLED_ADV"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>) {
		return new DimmerLampNode(isy, nodeInfo);
	}
	export const Node = DimmerLampNode;
	export const Class = DimmerLampNode;
	export namespace Commands {
		export type Type = {
			DON: ((value?: number) => Promise<boolean>) & {
				label: "On";
				name: "on";
			};
			DOF: (() => Promise<boolean>) & {
				label: "Off";
				name: "off";
			};
			DFOF: (() => Promise<boolean>) & {
				label: "Fast Off";
				name: "fastOff";
			};
			DFON: (() => Promise<boolean>) & {
				label: "Fast On";
				name: "fastOn";
			};
			BRT: (() => Promise<boolean>) & {
				label: "Brighten";
				name: "brighten";
			};
			DIM: (() => Promise<boolean>) & {
				label: "Dim";
				name: "dim";
			};
			FDUP: (() => Promise<boolean>) & {
				label: "Fade Up";
				name: "fadeUp";
			};
			FDDOWN: (() => Promise<boolean>) & {
				label: "Fade Down";
				name: "fadeDown";
			};
			FDSTOP: (() => Promise<boolean>) & {
				label: "Fade Stop";
				name: "fadeStop";
			};
			QUERY: (() => Promise<boolean>) & {
				label: "Query";
				name: "query";
			};
			BEEP: ((value?: number) => Promise<boolean>) & {
				label: "Beep";
				name: "beep";
			};
			OL: ((value: number) => Promise<boolean>) & {
				label: "On Level";
				name: "updateOnLevel";
			};
			RR: ((value: Insteon.RampRate) => Promise<boolean>) & {
				label: "Ramp Rate";
				name: "updateRampRate";
			};
			WDU: (() => Promise<boolean>) & {
				label: "Write Changes";
				name: "writeChanges";
			};
		};
	}
	export enum Commands {
		on = 'DON',
		off = 'DOF',
		fastOff = 'DFOF',
		fastOn = 'DFON',
		brighten = 'BRT',
		dim = 'DIM',
		fadeUp = 'FDUP',
		fadeDown = 'FDDOWN',
		fadeStop = 'FDSTOP',
		query = 'QUERY',
		beep = 'BEEP',
		updateOnLevel = 'OL',
		updateRampRate = 'RR',
		writeChanges = 'WDU'
	}
	export namespace Drivers {
		export type Type = {
			ST: {
				uom: UnitOfMeasure.Percent;
				value: IntRange<0, 100>;
				label: "Status";
				name: "status";
			};
			OL: {
				uom: UnitOfMeasure.Percent;
				value: IntRange<0, 100>;
				label: "On Level";
				name: "onLevel";
			};
			RR: {
				uom: UnitOfMeasure.Index;
				value: Insteon.RampRate;
				label: "Ramp Rate";
				name: "rampRate";
			};
			ERR: {
				uom: UnitOfMeasure.Index;
				value: Insteon.Error;
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
