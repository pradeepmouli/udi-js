/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { IntRange } from "type-fest";
import { ZWave } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = ColorSwitch.Commands.Type;
type Drivers = ColorSwitch.Drivers.Type;

class ColorSwitchNode extends Base<Drivers, Commands> implements ColorSwitch.Interface {
	public override readonly commands = {
		DON: this.set,
		FDUP: this.fadeUp,
		FDDOWN: this.fadeDown,
		FDSTOP: this.fadeStop,
		QUERY: this.query
	};
	static override nodeDefId = "186";
	static override implements = ['186'];
	declare readonly nodeDefId: '186';
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.GV0 = Driver.create("GV0", this, nodeInfo.state['GV0'], { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Warm White", name: "warmWhite" });
		this.drivers.GV2 = Driver.create("GV2", this, nodeInfo.state['GV2'], { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Red", name: "red" });
		this.drivers.GV3 = Driver.create("GV3", this, nodeInfo.state['GV3'], { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Green", name: "green" });
		this.drivers.GV4 = Driver.create("GV4", this, nodeInfo.state['GV4'], { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Blue", name: "blue" });
		this.drivers.GV1 = Driver.create("GV1", this, nodeInfo.state['GV1'], { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Cold White", name: "coldWhite" });
	}
	async set(warmWhite?: number, coldWhite?: number, red?: number, green?: number, blue?: number, duration?: number) { return this.sendCommand("DON", { GV0: warmWhite, GV1: coldWhite, GV2: red, GV3: green, GV4: blue, RR: duration }); }
	async fadeUp(component: ZWave.ColorComponent, startLevel?: number, duration?: number) { return this.sendCommand("FDUP", { ID: component, STARTLEVEL: startLevel, RR: duration }); }
	async fadeDown(component: ZWave.ColorComponent, startLevel?: number, duration?: number) { return this.sendCommand("FDDOWN", { ID: component, STARTLEVEL: startLevel, RR: duration }); }
	async fadeStop(component: ZWave.ColorComponent) { return this.sendCommand("FDSTOP", { ID: component }); }
	async query() { return this.sendCommand("QUERY"); }
	public get warmWhite(): IntRange<0, 255> {
		return this.drivers.GV0?.value;
	}
	public get red(): IntRange<0, 255> {
		return this.drivers.GV2?.value;
	}
	public get green(): IntRange<0, 255> {
		return this.drivers.GV3?.value;
	}
	public get blue(): IntRange<0, 255> {
		return this.drivers.GV4?.value;
	}
	public get coldWhite(): IntRange<0, 255> {
		return this.drivers.GV1?.value;
	}
}

NodeFactory.register(ColorSwitchNode);

export namespace ColorSwitch {
	export interface Interface extends Omit<InstanceType<typeof ColorSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is ColorSwitchNode {
		return ['186'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is ColorSwitchNode {
		return ['186'].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new ColorSwitchNode(isy, nodeInfo);
	}
	export const Node = ColorSwitchNode;
	export const Class = ColorSwitchNode;
	export namespace Commands {
		export type Type = {
			DON: ((GV0?: number, GV1?: number, GV2?: number, GV3?: number, GV4?: number, RR?: number) => Promise<boolean>) & {
				label: "Set";
				name: "set";
			};
			FDUP: ((ID: ZWave.ColorComponent, STARTLEVEL?: number, RR?: number) => Promise<boolean>) & {
				label: "Fade Up";
				name: "fadeUp";
			};
			FDDOWN: ((ID: ZWave.ColorComponent, STARTLEVEL?: number, RR?: number) => Promise<boolean>) & {
				label: "Fade Down";
				name: "fadeDown";
			};
			FDSTOP: ((ID: ZWave.ColorComponent) => Promise<boolean>) & {
				label: "Fade Stop";
				name: "fadeStop";
			};
			QUERY: (() => Promise<boolean>) & {
				label: "Query";
				name: "query";
			};
		};
	}
	export enum Commands {
		set = 'DON',
		fadeUp = 'FDUP',
		fadeDown = 'FDDOWN',
		fadeStop = 'FDSTOP',
		query = 'QUERY'
	}
	export namespace Drivers {
		export type Type = {
			GV0: {
				uom: UnitOfMeasure.Raw1ByteUnsignedValue;
				value: IntRange<0, 255>;
				label: "Warm White";
				name: "warmWhite";
			};
			GV2: {
				uom: UnitOfMeasure.Raw1ByteUnsignedValue;
				value: IntRange<0, 255>;
				label: "Red";
				name: "red";
			};
			GV3: {
				uom: UnitOfMeasure.Raw1ByteUnsignedValue;
				value: IntRange<0, 255>;
				label: "Green";
				name: "green";
			};
			GV4: {
				uom: UnitOfMeasure.Raw1ByteUnsignedValue;
				value: IntRange<0, 255>;
				label: "Blue";
				name: "blue";
			};
			GV1: {
				uom: UnitOfMeasure.Raw1ByteUnsignedValue;
				value: IntRange<0, 255>;
				label: "Cold White";
				name: "coldWhite";
			};
		};
	}
	export enum Drivers {
		warmWhite = 'GV0',
		red = 'GV2',
		green = 'GV3',
		blue = 'GV4',
		coldWhite = 'GV1'
	}
}
