/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { IntRange } from "type-fest";
import { ZigBee } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = ColorControl.Commands.Type;
type Drivers = ColorControl.Drivers.Type;

class ColorControlNode extends Base<Drivers, Commands> implements ColorControl.Interface {
	public override readonly commands = {
		MOVETOCT: this.moveToTemperature,
		MOVECT: this.moveTemperature,
		STEPCT: this.stepTemperature,
		UNITS: this.updatePreferredUnits,
		STOP: this.stop,
		QUERY: this.query
	};
	static override nodeDefId = "COLOR_CONTROL";
	static override implements = ['COLOR_CONTROL'];
	declare readonly nodeDefId: 'COLOR_CONTROL';
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.GV2 = Driver.create("GV2", this, nodeInfo.state['GV2'], { uom: UnitOfMeasure.Kelvin, label: "Color Temperature K", name: "colorTemperatureK" });
		this.drivers.GV3 = Driver.create("GV3", this, nodeInfo.state['GV3'], { uom: UnitOfMeasure.Unknown, label: "Color Temperature Mired", name: "colorTemperatureMired" });
		this.drivers.GV4 = Driver.create("GV4", this, nodeInfo.state['GV4'], { uom: UnitOfMeasure.Index, label: "Preferred Units", name: "preferredUnits" });
	}
	async moveToTemperature(color: number, dur?: number) { return this.sendCommand("MOVETOCT", { COLOR: color, DUR: dur }); }
	async moveTemperature(min?: number, max?: number, mode: ZigBee.Cmm, rate?: number) { return this.sendCommand("MOVECT", { MIN: min, MAX: max, MODE: mode, RATE: rate }); }
	async stepTemperature(min?: number, max?: number, size?: number, mode?: ZigBee.Csm, dur?: number) { return this.sendCommand("STEPCT", { MIN: min, MAX: max, SIZE: size, MODE: mode, DUR: dur }); }
	async updatePreferredUnits(value: ZigBee.Ctunit) { return this.sendCommand("UNITS", value); }
	async stop() { return this.sendCommand("STOP"); }
	async query() { return this.sendCommand("QUERY"); }
	public get colorTemperatureK(): IntRange<0, 1> {
		return this.drivers.GV2?.value;
	}
	public get colorTemperatureMired(): IntRange<0, 1> {
		return this.drivers.GV3?.value;
	}
	public get preferredUnits(): ZigBee.Ctunit {
		return this.drivers.GV4?.value;
	}
}

NodeFactory.register(ColorControlNode);

export namespace ColorControl {
	export interface Interface extends Omit<InstanceType<typeof ColorControlNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is ColorControlNode {
		return ['COLOR_CONTROL'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is ColorControlNode {
		return ['COLOR_CONTROL'].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new ColorControlNode(isy, nodeInfo);
	}
	export const Node = ColorControlNode;
	export const Class = ColorControlNode;
	export namespace Commands {
		export type Type = {
			MOVETOCT: ((COLOR: number, DUR?: number) => Promise<boolean>) & {
				label: "Move To Temperature";
				name: "moveToTemperature";
			};
			MOVECT: ((MIN?: number, MAX?: number, MODE: ZigBee.Cmm, RATE?: number) => Promise<boolean>) & {
				label: "Move Temperature";
				name: "moveTemperature";
			};
			STEPCT: ((MIN?: number, MAX?: number, SIZE?: number, MODE?: ZigBee.Csm, DUR?: number) => Promise<boolean>) & {
				label: "Step Temperature";
				name: "stepTemperature";
			};
			UNITS: ((value: ZigBee.Ctunit) => Promise<boolean>) & {
				label: "Preferred Units";
				name: "updatePreferredUnits";
			};
			STOP: (() => Promise<boolean>) & {
				label: "Stop";
				name: "stop";
			};
			QUERY: (() => Promise<boolean>) & {
				label: "Query";
				name: "query";
			};
		};
	}
	export enum Commands {
		moveToTemperature = 'MOVETOCT',
		moveTemperature = 'MOVECT',
		stepTemperature = 'STEPCT',
		updatePreferredUnits = 'UNITS',
		stop = 'STOP',
		query = 'QUERY'
	}
	export namespace Drivers {
		export type Type = {
			GV2: {
				uom: UnitOfMeasure.Kelvin;
				value: IntRange<0, 1>;
				label: "Color Temperature K";
				name: "colorTemperatureK";
			};
			GV3: {
				uom: UnitOfMeasure.Unknown;
				value: IntRange<0, 1>;
				label: "Color Temperature Mired";
				name: "colorTemperatureMired";
			};
			GV4: {
				uom: UnitOfMeasure.Index;
				value: ZigBee.Ctunit;
				label: "Preferred Units";
				name: "preferredUnits";
			};
		};
	}
	export enum Drivers {
		colorTemperatureK = 'GV2',
		colorTemperatureMired = 'GV3',
		preferredUnits = 'GV4'
	}
}
