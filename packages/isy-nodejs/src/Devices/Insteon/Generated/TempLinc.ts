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

const nodeDefId = "TempLinc";

type Commands = TempLinc.Commands;
type Drivers = TempLinc.Drivers;

export class TempLincNode extends Base<Drivers, Commands> implements TempLinc.Interface {
	public override readonly commands = {
		CLISPH: this.updateHeatSetpoint,
		CLISPC: this.updateCoolSetpoint,
		CLIMD: this.updateMode,
		CLIFS: this.updateFanMode,
		BRT: this.setpointUp,
		DIM: this.setpointDown,
		BEEP: this.beep,
		QUERY: this.query,
		SETTIME: this.setTime,
		WDU: this.writeChanges
	};
	static override nodeDefId = "TempLinc";
	static override implements = ["TempLinc", "IRLincTx", "SirenAlert", "SirenArm"];
	declare readonly nodeDefId: "TempLinc";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Degree, label: "Temperature", name: "temperature" });
		this.drivers.CLISPH = Driver.create("CLISPH", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Degree, label: "Heat Setpoint", name: "heatSetpoint" });
		this.drivers.CLISPC = Driver.create("CLISPC", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Degree, label: "Cool Setpoint", name: "coolSetpoint" });
		this.drivers.CLIMD = Driver.create("CLIMD", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.InsteonThermostatMode, label: "Mode", name: "mode" });
		this.drivers.CLIFS = Driver.create("CLIFS", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.InsteonThermostatFanMode, label: "Fan Mode", name: "fanMode" });
		this.drivers.CLIHUM = Driver.create("CLIHUM", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Humidity", name: "humidity" });
		this.drivers.CLIHCS = Driver.create("CLIHCS", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.ThermostatHeatCoolState, label: "Heat/Cool State", name: "heatCoolState" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async updateHeatSetpoint(value: number) { return this.sendCommand("CLISPH", value); }
	async updateCoolSetpoint(value: number) { return this.sendCommand("CLISPC", value); }
	async updateMode(value: (0 | 1 | 2 | 3 | 5)) { return this.sendCommand("CLIMD", value); }
	async updateFanMode(value: (7 | 8)) { return this.sendCommand("CLIFS", value); }
	async setpointUp() { return this.sendCommand("BRT"); }
	async setpointDown() { return this.sendCommand("DIM"); }
	async beep(value?: number) { return this.sendCommand("BEEP", value); }
	async query() { return this.sendCommand("QUERY"); }
	async setTime() { return this.sendCommand("SETTIME"); }
	async writeChanges() { return this.sendCommand("WDU"); }
	public get temperature(): number {
		return this.drivers.ST?.value;
	}
	public get heatSetpoint(): number {
		return this.drivers.CLISPH?.value;
	}
	public get coolSetpoint(): number {
		return this.drivers.CLISPC?.value;
	}
	public get mode(): (0 | 1 | 2 | 3 | 5) {
		return this.drivers.CLIMD?.value;
	}
	public get fanMode(): (7 | 8) {
		return this.drivers.CLIFS?.value;
	}
	public get humidity(): number {
		return this.drivers.CLIHUM?.value;
	}
	public get heatCoolState(): number {
		return this.drivers.CLIHCS?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(TempLincNode);

export namespace TempLinc {
	export interface Interface extends Omit<InstanceType<typeof TempLincNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "TempLinc";
	}
	export function is(node: ISYNode<any, any, any, any>): node is TempLincNode {
		return ["TempLinc"].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is TempLincNode {
		return ["TempLinc", "Thermostat"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new TempLincNode(isy, nodeInfo);
	}
	export const Node = TempLincNode;
	export type Commands = {
		CLISPH: ((value: number) => Promise<boolean>) & {
			label: "Heat Setpoint";
			name: "updateHeatSetpoint";
		};
		CLISPC: ((value: number) => Promise<boolean>) & {
			label: "Cool Setpoint";
			name: "updateCoolSetpoint";
		};
		CLIMD: ((value: (0 | 1 | 2 | 3 | 5)) => Promise<boolean>) & {
			label: "Mode";
			name: "updateMode";
		};
		CLIFS: ((value: (7 | 8)) => Promise<boolean>) & {
			label: "Fan Mode";
			name: "updateFanMode";
		};
		BRT: (() => Promise<boolean>) & {
			label: "Setpoint Up";
			name: "setpointUp";
		};
		DIM: (() => Promise<boolean>) & {
			label: "Setpoint Down";
			name: "setpointDown";
		};
		BEEP: ((value?: number) => Promise<boolean>) & {
			label: "Beep";
			name: "beep";
		};
		QUERY: (() => Promise<boolean>) & {
			label: "Query";
			name: "query";
		};
		SETTIME: (() => Promise<boolean>) & {
			label: "Set Time";
			name: "setTime";
		};
		WDU: (() => Promise<boolean>) & {
			label: "Write Changes";
			name: "writeChanges";
		};
	};
	export type Drivers = {
		ST: {
			uom: UnitOfMeasure.Degree;
			value: number;
			label: "Temperature";
			name: "temperature";
		};
		CLISPH: {
			uom: UnitOfMeasure.Degree;
			value: number;
			label: "Heat Setpoint";
			name: "heatSetpoint";
		};
		CLISPC: {
			uom: UnitOfMeasure.Degree;
			value: number;
			label: "Cool Setpoint";
			name: "coolSetpoint";
		};
		CLIMD: {
			uom: UnitOfMeasure.InsteonThermostatMode;
			value: (0 | 1 | 2 | 3 | 5);
			label: "Mode";
			name: "mode";
		};
		CLIFS: {
			uom: UnitOfMeasure.InsteonThermostatFanMode;
			value: (7 | 8);
			label: "Fan Mode";
			name: "fanMode";
		};
		CLIHUM: {
			uom: UnitOfMeasure.Percent;
			value: number;
			label: "Humidity";
			name: "humidity";
		};
		CLIHCS: {
			uom: UnitOfMeasure.ThermostatHeatCoolState;
			value: number;
			label: "Heat/Cool State";
			name: "heatCoolState";
		};
		ERR: {
			uom: UnitOfMeasure.Index;
			value: Insteon.Error;
			label: "Responding";
			name: "responding";
		};
	};
}
