/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Insteon } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = Siren.Commands.Type;
type Drivers = Siren.Drivers.Type;

class SirenNode extends Base<Drivers, Commands> implements Siren.Interface {
	public override readonly commands = {
		DON: this.on,
		DOF: this.off,
		ARM: this.arm,
		DISARM: this.disarm,
		QUERY: this.query,
		BEEP: this.beep,
		WDU: this.writeChanges
	};
	static override nodeDefId = "Siren";
	static override implements = ['Siren', "SirenAlert", "SirenArm"];
	declare readonly nodeDefId: 'Siren' | "Siren_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Siren", name: "siren" });
		this.drivers.MODE = Driver.create("MODE", this, nodeInfo.state['MODE'], { uom: UnitOfMeasure.Index, label: "Mode", name: "mode" });
		this.drivers.DELAY = Driver.create("DELAY", this, nodeInfo.state['DELAY'], { uom: UnitOfMeasure.DurationInSeconds, label: "Arm Countdown", name: "armCountdown" });
		this.drivers.DUR = Driver.create("DUR", this, nodeInfo.state['DUR'], { uom: UnitOfMeasure.DurationInSeconds, label: "Siren Duration", name: "sirenDuration" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async on(duration?: number) { return this.sendCommand("DON", { DUR: duration }); }
	async off() { return this.sendCommand("DOF"); }
	async arm(value: Insteon.SirenMode) { return this.sendCommand("ARM", value); }
	async disarm() { return this.sendCommand("DISARM"); }
	async query() { return this.sendCommand("QUERY"); }
	async beep(value?: number) { return this.sendCommand("BEEP", value); }
	async writeChanges() { return this.sendCommand("WDU"); }
	public get siren(): Insteon.OnLevelRelay {
		return this.drivers.ST?.value;
	}
	public get mode(): Insteon.SirenModeQuery {
		return this.drivers.MODE?.value;
	}
	public get armCountdown(): number {
		return this.drivers.DELAY?.value;
	}
	public get sirenDuration(): number {
		return this.drivers.DUR?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(SirenNode);
NodeFactory.register(SirenNode, "Siren_ADV");

export namespace Siren {
	export interface Interface extends Omit<InstanceType<typeof SirenNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is SirenNode {
		return ['Siren', "Siren_ADV"].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is SirenNode {
		return ['Siren', "Siren_ADV"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new SirenNode(isy, nodeInfo);
	}
	export const Node = SirenNode;
	export const Class = SirenNode;
	export namespace Commands {
		export type Type = {
			DON: ((DUR?: number) => Promise<boolean>) & {
				label: "On";
				name: "on";
			};
			DOF: (() => Promise<boolean>) & {
				label: "Off";
				name: "off";
			};
			ARM: ((value: Insteon.SirenMode) => Promise<boolean>) & {
				label: "Arm";
				name: "arm";
			};
			DISARM: (() => Promise<boolean>) & {
				label: "Disarm";
				name: "disarm";
			};
			QUERY: (() => Promise<boolean>) & {
				label: "Query";
				name: "query";
			};
			BEEP: ((value?: number) => Promise<boolean>) & {
				label: "Beep";
				name: "beep";
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
		arm = 'ARM',
		disarm = 'DISARM',
		query = 'QUERY',
		beep = 'BEEP',
		writeChanges = 'WDU'
	}
	export namespace Drivers {
		export type Type = {
			ST: {
				uom: UnitOfMeasure.Percent;
				value: Insteon.OnLevelRelay;
				label: "Siren";
				name: "siren";
			};
			MODE: {
				uom: UnitOfMeasure.Index;
				value: Insteon.SirenModeQuery;
				label: "Mode";
				name: "mode";
			};
			DELAY: {
				uom: UnitOfMeasure.DurationInSeconds;
				value: number;
				label: "Arm Countdown";
				name: "armCountdown";
			};
			DUR: {
				uom: UnitOfMeasure.DurationInSeconds;
				value: number;
				label: "Siren Duration";
				name: "sirenDuration";
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
		siren = 'ST',
		mode = 'MODE',
		armCountdown = 'DELAY',
		sirenDuration = 'DUR',
		responding = 'ERR'
	}
}
