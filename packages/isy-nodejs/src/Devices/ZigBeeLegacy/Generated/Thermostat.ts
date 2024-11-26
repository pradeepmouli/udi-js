/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { ZigBeeLegacy } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

const nodeDefId = "Thermostat";

type Commands = Thermostat.Commands;
type Drivers = Thermostat.Drivers;

export class ThermostatNode extends Base<Drivers, Commands> implements Thermostat.Interface {
	public override readonly commands = {
		CLISPH: this.updateHeatSetpoint,
		CLISPC: this.updateCoolSetpoint,
		CLIMD: this.updateMode,
		CLIFS: this.updateFanMode,
		CLISMD: this.updateScheduleMode,
		CLISPHD: this.heatSetpointShift,
		CLISPCD: this.coolSetpointShift,
		QUERY: this.query,
		ADRPST: this.adr
	};
	static override nodeDefId = "Thermostat";
	static override implements = ["Thermostat"];
	declare readonly nodeDefId: "Thermostat";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Degree, label: "Temperature", name: "temperature" });
		this.drivers.CLISPH = Driver.create("CLISPH", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Degree, label: "Heat Setpoint", name: "heatSetpoint" });
		this.drivers.CLISPC = Driver.create("CLISPC", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Degree, label: "Cool Setpoint", name: "coolSetpoint" });
		this.drivers.CLIMD = Driver.create("CLIMD", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.ThermostatMode, label: "Mode", name: "mode" });
		this.drivers.CLIFS = Driver.create("CLIFS", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.ThermostatFanMode, label: "Fan Mode", name: "fanMode" });
		this.drivers.CLIHCS = Driver.create("CLIHCS", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.ThermostatHeatCoolState, label: "Heat/Cool State", name: "heatCoolState" });
		this.drivers.CLIFRS = Driver.create("CLIFRS", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.ThermostatFanRunState, label: "Fan State", name: "fanState" });
		this.drivers.CLISMD = Driver.create("CLISMD", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Schedule Mode", name: "scheduleMode" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async updateHeatSetpoint(value: number) { return this.sendCommand("CLISPH", value); }
	async updateCoolSetpoint(value: number) { return this.sendCommand("CLISPC", value); }
	async updateMode(value: number) { return this.sendCommand("CLIMD", value); }
	async updateFanMode(value: (0 | 1)) { return this.sendCommand("CLIFS", value); }
	async updateScheduleMode(value: number) { return this.sendCommand("CLISMD", value); }
	async heatSetpointShift(value: number) { return this.sendCommand("CLISPHD", value); }
	async coolSetpointShift(value: number) { return this.sendCommand("CLISPCD", value); }
	async query() { return this.sendCommand("QUERY"); }
	async adr(value: (0 | 1)) { return this.sendCommand("ADRPST", value); }
	public get temperature(): number {
		return this.drivers.ST?.value;
	}
	public get heatSetpoint(): number {
		return this.drivers.CLISPH?.value;
	}
	public get coolSetpoint(): number {
		return this.drivers.CLISPC?.value;
	}
	public get mode(): number {
		return this.drivers.CLIMD?.value;
	}
	public get fanMode(): (0 | 1) {
		return this.drivers.CLIFS?.value;
	}
	public get heatCoolState(): number {
		return this.drivers.CLIHCS?.value;
	}
	public get fanState(): (0 | 1) {
		return this.drivers.CLIFRS?.value;
	}
	public get scheduleMode(): number {
		return this.drivers.CLISMD?.value;
	}
	public get responding(): ZigBeeLegacy.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(ThermostatNode);

export namespace Thermostat {
	export interface Interface extends Omit<InstanceType<typeof ThermostatNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "Thermostat";
	}
	export function is(node: ISYNode<any, any, any, any>): node is ThermostatNode {
		return ["Thermostat"].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is ThermostatNode {
		return ["Thermostat"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new ThermostatNode(isy, nodeInfo);
	}
	export const Node = ThermostatNode;
	export type Commands = {
		CLISPH: ((value: number) => Promise<boolean>) & {
			label: "Heat Setpoint";
			name: "updateHeatSetpoint";
		};
		CLISPC: ((value: number) => Promise<boolean>) & {
			label: "Cool Setpoint";
			name: "updateCoolSetpoint";
		};
		CLIMD: ((value: number) => Promise<boolean>) & {
			label: "Mode";
			name: "updateMode";
		};
		CLIFS: ((value: (0 | 1)) => Promise<boolean>) & {
			label: "Fan Mode";
			name: "updateFanMode";
		};
		CLISMD: ((value: number) => Promise<boolean>) & {
			label: "Schedule Mode";
			name: "updateScheduleMode";
		};
		CLISPHD: ((value: number) => Promise<boolean>) & {
			label: "Heat Setpoint Shift";
			name: "heatSetpointShift";
		};
		CLISPCD: ((value: number) => Promise<boolean>) & {
			label: "Cool Setpoint Shift";
			name: "coolSetpointShift";
		};
		QUERY: (() => Promise<boolean>) & {
			label: "Query";
			name: "query";
		};
		ADRPST: ((value: (0 | 1)) => Promise<boolean>) & {
			label: "ADR";
			name: "adr";
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
			uom: UnitOfMeasure.ThermostatMode;
			value: number;
			label: "Mode";
			name: "mode";
		};
		CLIFS: {
			uom: UnitOfMeasure.ThermostatFanMode;
			value: (0 | 1);
			label: "Fan Mode";
			name: "fanMode";
		};
		CLIHCS: {
			uom: UnitOfMeasure.ThermostatHeatCoolState;
			value: number;
			label: "Heat/Cool State";
			name: "heatCoolState";
		};
		CLIFRS: {
			uom: UnitOfMeasure.ThermostatFanRunState;
			value: (0 | 1);
			label: "Fan State";
			name: "fanState";
		};
		CLISMD: {
			uom: UnitOfMeasure.Index;
			value: number;
			label: "Schedule Mode";
			name: "scheduleMode";
		};
		ERR: {
			uom: UnitOfMeasure.Index;
			value: ZigBeeLegacy.Error;
			label: "Responding";
			name: "responding";
		};
	};
}
