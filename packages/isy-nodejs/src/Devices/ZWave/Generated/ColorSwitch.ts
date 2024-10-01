/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { ZWave } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

export const nodeDefId = "186";

type Commands = ColorSwitch.Commands;
type Drivers = ColorSwitch.Drivers;

export class ColorSwitchNode extends Base<Drivers, Commands> implements ColorSwitch.Interface {
	public readonly commands = {
		DON: this.set,
		FDUP: this.fadeUp,
		FDDOWN: this.fadeDown,
		FDSTOP: this.fadeStop,
		QUERY: this.query
	};
	static nodeDefId = "186";
	declare readonly nodeDefId: "186";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.GV0 = Driver.create("GV0", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Warm White", name: "warmWhite" });
		this.drivers.GV2 = Driver.create("GV2", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Red", name: "red" });
		this.drivers.GV3 = Driver.create("GV3", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Green", name: "green" });
		this.drivers.GV4 = Driver.create("GV4", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Blue", name: "blue" });
	}
	async set(warmWhite?: number, red?: number, green?: number, blue?: number, duration?: number | number) {
		return this.sendCommand("DON", { GV0: warmWhite, GV2: red, GV3: green, GV4: blue, RR: duration });
	}
	async fadeUp(component: number, startLevel?: number, duration?: number | number) {
		return this.sendCommand("FDUP", { ID: component, STARTLEVEL: startLevel, RR: duration });
	}
	async fadeDown(component: number, startLevel?: number, duration?: number | number) {
		return this.sendCommand("FDDOWN", { ID: component, STARTLEVEL: startLevel, RR: duration });
	}
	async fadeStop(component: number) {
		return this.sendCommand("FDSTOP", { ID: component });
	}
	async query() {
		return this.sendCommand("QUERY");
	}
	public get warmWhite(): number {
		return this.drivers.GV0?.value;
	}
	public get red(): number {
		return this.drivers.GV2?.value;
	}
	public get green(): number {
		return this.drivers.GV3?.value;
	}
	public get blue(): number {
		return this.drivers.GV4?.value;
	}
}

NodeFactory.register(ColorSwitchNode);

export namespace ColorSwitch {
	export interface Interface extends Omit<InstanceType<typeof ColorSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "186";
	}
	export function is(node: ISYNode<any, any, any, any>): node is ColorSwitchNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new ColorSwitchNode(isy, nodeInfo);
	}
	export const Node = ColorSwitchNode;
	export type Commands = {
		DON: ((GV0?: number, GV2?: number, GV3?: number, GV4?: number, RR?: number | number) => Promise<boolean>) & {
			label: "Set";
			name: "set";
		};
		FDUP: ((ID: number, STARTLEVEL?: number, RR?: number | number) => Promise<boolean>) & {
			label: "Fade Up";
			name: "fadeUp";
		};
		FDDOWN: ((ID: number, STARTLEVEL?: number, RR?: number | number) => Promise<boolean>) & {
			label: "Fade Down";
			name: "fadeDown";
		};
		FDSTOP: ((ID: number) => Promise<boolean>) & {
			label: "Fade Stop";
			name: "fadeStop";
		};
		QUERY: (() => Promise<boolean>) & {
			label: "Query";
			name: "query";
		};
	};
	export type Drivers = {
		GV0: {
			uom: UnitOfMeasure.Raw1ByteUnsignedValue;
			value: number;
			label: "Warm White";
			name: "warmWhite";
		};
		GV2: {
			uom: UnitOfMeasure.Raw1ByteUnsignedValue;
			value: number;
			label: "Red";
			name: "red";
		};
		GV3: {
			uom: UnitOfMeasure.Raw1ByteUnsignedValue;
			value: number;
			label: "Green";
			name: "green";
		};
		GV4: {
			uom: UnitOfMeasure.Raw1ByteUnsignedValue;
			value: number;
			label: "Blue";
			name: "blue";
		};
	};
}
