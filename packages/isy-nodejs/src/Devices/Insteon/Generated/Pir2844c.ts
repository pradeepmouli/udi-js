/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Insteon } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

const nodeDefId = "PIR2844C";

type Commands = Pir2844c.Commands;
type Drivers = Pir2844c.Drivers;

export class Pir2844cNode extends Base<Drivers, Commands> implements Pir2844c.Interface {
	public override readonly commands = {
		CLITEMP: this.calibrateTemperature,
		QUERY: this.query,
		BEEP: this.beep,
		WDU: this.writeChanges
	};
	static override nodeDefId = "PIR2844C";
	declare readonly nodeDefId: "PIR2844C" | "PIR2844C_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.CLITEMP = Driver.create("CLITEMP", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Celsius, label: "Temperature", name: "temperature" });
		this.drivers.LUMIN = Driver.create("LUMIN", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Luminance", name: "luminance" });
		this.drivers.BATLVL = Driver.create("BATLVL", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Battery Level", name: "batteryLevel" });
		this.drivers.GV1 = Driver.create("GV1", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Boolean, label: "Battery Powered", name: "batteryPowered" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async calibrateTemperature(value: number) {
		return this.sendCommand("CLITEMP", { value: value });
	}
	async query() {
		return this.sendCommand("QUERY");
	}
	async beep(value?: number) {
		return this.sendCommand("BEEP", { value: value });
	}
	async writeChanges() {
		return this.sendCommand("WDU");
	}
	public get status(): Insteon.OnLevelRelay {
		return this.drivers.ST?.value;
	}
	public get temperature(): number {
		return this.drivers.CLITEMP?.value;
	}
	public get luminance(): number {
		return this.drivers.LUMIN?.value;
	}
	public get batteryLevel(): number {
		return this.drivers.BATLVL?.value;
	}
	public get batteryPowered(): Insteon.Boolean {
		return this.drivers.GV1?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(Pir2844cNode);
NodeFactory.register(Pir2844cNode, "PIR2844C_ADV");

export namespace Pir2844c {
	export interface Interface extends Omit<InstanceType<typeof Pir2844cNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "PIR2844C" | "PIR2844C_ADV";
	}
	export function is(node: ISYNode<any, any, any, any>): node is Pir2844cNode {
		return node.nodeDefId in ["PIR2844C", "PIR2844C_ADV"];
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is Pir2844cNode {
		return node.nodeDefId in ["PIR2844C", "PIR2844C_ADV"];
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new Pir2844cNode(isy, nodeInfo);
	}
	export const Node = Pir2844cNode;
	export type Commands = {
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
	export type Drivers = {
		ST: {
			uom: UnitOfMeasure.Percent;
			value: Insteon.OnLevelRelay;
			label: "Status";
			name: "status";
		};
		CLITEMP: {
			uom: UnitOfMeasure.Celsius;
			value: number;
			label: "Temperature";
			name: "temperature";
		};
		LUMIN: {
			uom: UnitOfMeasure.Percent;
			value: number;
			label: "Luminance";
			name: "luminance";
		};
		BATLVL: {
			uom: UnitOfMeasure.Percent;
			value: number;
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
