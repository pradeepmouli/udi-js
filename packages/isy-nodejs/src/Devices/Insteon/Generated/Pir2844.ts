/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { IntRange } from "type-fest";
import { Insteon } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = Pir2844.Commands.Type;
type Drivers = Pir2844.Drivers.Type;

class Pir2844Node extends Base<Drivers, Commands> implements Pir2844.Interface {
	public override readonly commands = {
		CLITEMP: this.calibrateTemperature,
		QUERY: this.query,
		BEEP: this.beep,
		WDU: this.writeChanges
	};
	static override nodeDefId = "PIR2844";
	static override implements = ['PIR2844', "PIR2844C", "PIR2844C_ADV"];
	declare readonly nodeDefId: 'PIR2844' | "PIR2844_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.CLITEMP = Driver.create("CLITEMP", this, nodeInfo.state['CLITEMP'], { uom: UnitOfMeasure.Fahrenheit, label: "Temperature", name: "temperature" });
		this.drivers.LUMIN = Driver.create("LUMIN", this, nodeInfo.state['LUMIN'], { uom: UnitOfMeasure.Percent, label: "Luminance", name: "luminance" });
		this.drivers.BATLVL = Driver.create("BATLVL", this, nodeInfo.state['BATLVL'], { uom: UnitOfMeasure.Percent, label: "Battery Level", name: "batteryLevel" });
		this.drivers.GV1 = Driver.create("GV1", this, nodeInfo.state['GV1'], { uom: UnitOfMeasure.Boolean, label: "Battery Powered", name: "batteryPowered" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async calibrateTemperature(value: number) { return this.sendCommand("CLITEMP", value); }
	async query() { return this.sendCommand("QUERY"); }
	async beep(value?: number) { return this.sendCommand("BEEP", value); }
	async writeChanges() { return this.sendCommand("WDU"); }
	public get status(): Insteon.OnLevelRelay {
		return this.drivers.ST?.value;
	}
	public get temperature(): IntRange<-25, 170> {
		return this.drivers.CLITEMP?.value;
	}
	public get luminance(): IntRange<0, 100> {
		return this.drivers.LUMIN?.value;
	}
	public get batteryLevel(): IntRange<0, 100> {
		return this.drivers.BATLVL?.value;
	}
	public get batteryPowered(): Insteon.Boolean {
		return this.drivers.GV1?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(Pir2844Node);
NodeFactory.register(Pir2844Node, "PIR2844_ADV");

export namespace Pir2844 {
	export interface Interface extends Omit<InstanceType<typeof Pir2844Node>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is Pir2844Node {
		return ['PIR2844', "PIR2844_ADV"].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is Pir2844Node {
		return ['PIR2844', "PIR2844_ADV"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new Pir2844Node(isy, nodeInfo);
	}
	export const Node = Pir2844Node;
	export const Class = Pir2844Node;
	export namespace Commands {
		export type Type = {
			CLITEMP: ((value: number) => Promise<boolean>) & {
				label: "Calibrate Temperature";
				name: "calibrateTemperature";
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
		calibrateTemperature = 'CLITEMP',
		query = 'QUERY',
		beep = 'BEEP',
		writeChanges = 'WDU'
	}
	export namespace Drivers {
		export type Type = {
			ST: {
				uom: UnitOfMeasure.Percent;
				value: Insteon.OnLevelRelay;
				label: "Status";
				name: "status";
			};
			CLITEMP: {
				uom: UnitOfMeasure.Fahrenheit;
				value: IntRange<-25, 170>;
				label: "Temperature";
				name: "temperature";
			};
			LUMIN: {
				uom: UnitOfMeasure.Percent;
				value: IntRange<0, 100>;
				label: "Luminance";
				name: "luminance";
			};
			BATLVL: {
				uom: UnitOfMeasure.Percent;
				value: IntRange<0, 100>;
				label: "Battery Level";
				name: "batteryLevel";
			};
			GV1: {
				uom: UnitOfMeasure.Boolean;
				value: Insteon.Boolean;
				label: "Battery Powered";
				name: "batteryPowered";
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
		temperature = 'CLITEMP',
		luminance = 'LUMIN',
		batteryLevel = 'BATLVL',
		batteryPowered = 'GV1',
		responding = 'ERR'
	}
}
