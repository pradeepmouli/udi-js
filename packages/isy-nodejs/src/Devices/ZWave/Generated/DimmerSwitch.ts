/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { ZWave } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

const nodeDefId = "119";

type Commands = DimmerSwitch.Commands;
type Drivers = DimmerSwitch.Drivers;

export class DimmerSwitchNode extends Base<Drivers, Commands> implements DimmerSwitch.Interface {
	public override readonly commands = {
		DON: this.on,
		DOF: this.off,
		DFON: this.fastOn,
		DFOF: this.fastOff,
		BRT: this.brighten,
		DIM: this.dim,
		FDUP: this.fadeUp,
		FDDOWN: this.fadeDown,
		FADE: this.fade,
		FDSTOP: this.fadeStop,
		QUERY: this.query,
		CONFIG: this.setConfiguration,
		WDU: this.writeChanges
	};
	static override nodeDefId = "119";
	static override implements = ["119"];
	declare readonly nodeDefId: "119";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async on(value?: number | ZWave.PercentOpt, rampRate?: number) { return this.sendCommand("DON", value, { RR: rampRate }); }
	async off() { return this.sendCommand("DOF"); }
	async fastOn() { return this.sendCommand("DFON"); }
	async fastOff() { return this.sendCommand("DFOF"); }
	async brighten() { return this.sendCommand("BRT"); }
	async dim() { return this.sendCommand("DIM"); }
	async fadeUp(startLevel?: number | ZWave.PercentOpt, rampRate?: number) { return this.sendCommand("FDUP", { STARTLEVEL: startLevel, RR: rampRate }); }
	async fadeDown(startLevel?: number | ZWave.PercentOpt, rampRate?: number) { return this.sendCommand("FDDOWN", { STARTLEVEL: startLevel, RR: rampRate }); }
	async fade(direction: ZWave.FadeDirection, startLevel?: number | ZWave.PercentOpt, rampRate?: number, direction2?: ZWave.FadeDirection, fadeRate2?: number) { return this.sendCommand("FADE", { DIR: direction, STARTLEVEL: startLevel, RR: rampRate, DIR2: direction2, STEP2: fadeRate2 }); }
	async fadeStop() { return this.sendCommand("FDSTOP"); }
	async query() { return this.sendCommand("QUERY"); }
	async setConfiguration(parameterNumber: number, parameterValue: number) { return this.sendCommand("CONFIG", { NUM: parameterNumber, VAL: parameterValue }); }
	async writeChanges() { return this.sendCommand("WDU"); }
	public get status(): number {
		return this.drivers.ST?.value;
	}
	public get responding(): ZWave.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(DimmerSwitchNode);

export namespace DimmerSwitch {
	export interface Interface extends Omit<InstanceType<typeof DimmerSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "119";
	}
	export function is(node: ISYNode<any, any, any, any>): node is DimmerSwitchNode {
		return ["119"].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is DimmerSwitchNode {
		return ["119"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new DimmerSwitchNode(isy, nodeInfo);
	}
	export const Node = DimmerSwitchNode;
	export type Commands = {
		DON: ((value?: number | ZWave.PercentOpt, RR?: number) => Promise<boolean>) & {
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
		BRT: (() => Promise<boolean>) & {
			label: "Brighten";
			name: "brighten";
		};
		DIM: (() => Promise<boolean>) & {
			label: "Dim";
			name: "dim";
		};
		FDUP: ((STARTLEVEL?: number | ZWave.PercentOpt, RR?: number) => Promise<boolean>) & {
			label: "Fade Up";
			name: "fadeUp";
		};
		FDDOWN: ((STARTLEVEL?: number | ZWave.PercentOpt, RR?: number) => Promise<boolean>) & {
			label: "Fade Down";
			name: "fadeDown";
		};
		FADE: ((DIR: ZWave.FadeDirection, STARTLEVEL?: number | ZWave.PercentOpt, RR?: number, DIR2?: ZWave.FadeDirection, STEP2?: number) => Promise<boolean>) & {
			label: "Fade";
			name: "fade";
		};
		FDSTOP: (() => Promise<boolean>) & {
			label: "Fade Stop";
			name: "fadeStop";
		};
		QUERY: (() => Promise<boolean>) & {
			label: "Query";
			name: "query";
		};
		CONFIG: ((NUM: number, VAL: number) => Promise<boolean>) & {
			label: "Set Configuration";
			name: "setConfiguration";
		};
		WDU: (() => Promise<boolean>) & {
			label: "Write Changes";
			name: "writeChanges";
		};
	};
	export type Drivers = {
		ST: {
			uom: UnitOfMeasure.Percent;
			value: number;
			label: "Status";
			name: "status";
		};
		ERR: {
			uom: UnitOfMeasure.Index;
			value: ZWave.Error;
			label: "Responding";
			name: "responding";
		};
	};
}
