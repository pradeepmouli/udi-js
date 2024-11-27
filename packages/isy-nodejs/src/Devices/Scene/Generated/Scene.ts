/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Scene } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

const nodeDefId = "InsteonDimmer";

type Commands = Scene.Commands;
type Drivers = Scene.Drivers;

export class SceneNode extends Base<Drivers, Commands> implements Scene.Interface {
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
		BEEP: this.beep,
		QUERY: this.query,
		CLIMD: this.mode,
		CLIFS: this.fanMode,
		CLISPH: this.heatSetpoint,
		CLISPC: this.coolSetpoint,
		CLISPHD: this.heatSetpointShift,
		CLISPCD: this.coolSetpointShift
	};
	static override nodeDefId = "InsteonDimmer";
	static override implements = ["InsteonDimmer"];
	declare readonly nodeDefId: "InsteonDimmer";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
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
	async beep() { return this.sendCommand("BEEP"); }
	async query() { return this.sendCommand("QUERY"); }
	async mode(value: number) { return this.sendCommand("CLIMD", value); }
	async fanMode(value: (0 | 1)) { return this.sendCommand("CLIFS", value); }
	async heatSetpoint(value: number) { return this.sendCommand("CLISPH", value); }
	async coolSetpoint(value: number) { return this.sendCommand("CLISPC", value); }
	async heatSetpointShift(value: number) { return this.sendCommand("CLISPHD", value); }
	async coolSetpointShift(value: number) { return this.sendCommand("CLISPCD", value); }
}

NodeFactory.register(SceneNode);

export namespace Scene {
	export interface Interface extends Omit<InstanceType<typeof SceneNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "InsteonDimmer";
	}
	export function is(node: ISYNode<any, any, any, any>): node is SceneNode {
		return ["InsteonDimmer"].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is SceneNode {
		return ["InsteonDimmer"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new SceneNode(isy, nodeInfo);
	}
	export const Node = SceneNode;
	export type Commands = {
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
		BEEP: (() => Promise<boolean>) & {
			label: "Beep";
			name: "beep";
		};
		QUERY: (() => Promise<boolean>) & {
			label: "Query";
			name: "query";
		};
		CLIMD: ((value: number) => Promise<boolean>) & {
			label: "Mode";
			name: "mode";
		};
		CLIFS: ((value: (0 | 1)) => Promise<boolean>) & {
			label: "Fan Mode";
			name: "fanMode";
		};
		CLISPH: ((value: number) => Promise<boolean>) & {
			label: "Heat Setpoint";
			name: "heatSetpoint";
		};
		CLISPC: ((value: number) => Promise<boolean>) & {
			label: "Cool Setpoint";
			name: "coolSetpoint";
		};
		CLISPHD: ((value: number) => Promise<boolean>) & {
			label: "Heat Setpoint Shift";
			name: "heatSetpointShift";
		};
		CLISPCD: ((value: number) => Promise<boolean>) & {
			label: "Cool Setpoint Shift";
			name: "coolSetpointShift";
		};
	};
	export type Drivers = {};
}
