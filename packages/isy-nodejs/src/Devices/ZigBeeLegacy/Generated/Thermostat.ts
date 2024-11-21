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
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Unknown, label: "Temperature", name: "temperature" });
		this.drivers.CLISPH = Driver.create("CLISPH", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Unknown, label: "Heat Setpoint", name: "heatSetpoint" });
		this.drivers.CLISPC = Driver.create("CLISPC", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Unknown, label: "Cool Setpoint", name: "coolSetpoint" });
		this.drivers.CLIMD = Driver.create("CLIMD", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Unknown, label: "Mode", name: "mode" });
		this.drivers.CLIFS = Driver.create("CLIFS", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Unknown, label: "Fan Mode", name: "fanMode" });
		this.drivers.CLIHCS = Driver.create("CLIHCS", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Unknown, label: "Heat/Cool State", name: "heatCoolState" });
		this.drivers.CLIFRS = Driver.create("CLIFRS", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Unknown, label: "Fan State", name: "fanState" });
		this.drivers.CLISMD = Driver.create("CLISMD", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Unknown, label: "Schedule Mode", name: "scheduleMode" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Unknown, label: "Responding", name: "responding" });
	}
	async updateHeatSetpoint(value: ) { return this.sendCommand("CLISPH", { value: value }); }
	async updateCoolSetpoint(value: ) { return this.sendCommand("CLISPC", { value: value }); }
	async updateMode(value: ) { return this.sendCommand("CLIMD", { value: value }); }
	async updateFanMode(value: ) { return this.sendCommand("CLIFS", { value: value }); }
	async updateScheduleMode(value: ) { return this.sendCommand("CLISMD", { value: value }); }
	async heatSetpointShift(value: ) { return this.sendCommand("CLISPHD", { value: value }); }
	async coolSetpointShift(value: ) { return this.sendCommand("CLISPCD", { value: value }); }
	async query() { return this.sendCommand("QUERY"); }
	async adr(value: ) { return this.sendCommand("ADRPST", { value: value }); }
	public get temperature(): {
        
return this.drivers.ST?.value;
    }
    public 
get heatSetpoint(): 
{
	return this.drivers.CLISPH?.value;
}
    public 
get coolSetpoint(): 
{
	return this.drivers.CLISPC?.value;
}
    public 
get mode(): 
{
	return this.drivers.CLIMD?.value;
}
    public 
get fanMode(): 
{
	return this.drivers.CLIFS?.value;
}
    public 
get heatCoolState(): 
{
	return this.drivers.CLIHCS?.value;
}
    public 
get fanState(): 
{
	return this.drivers.CLIFRS?.value;
}
    public 
get scheduleMode(): 
{
	return this.drivers.CLISMD?.value;
}
    public 
get responding(): 
{
	return this.drivers.ERR?.value;
}
}

NodeFactory.register(ThermostatNode);

export namespace Thermostat {
	export interface Interface extends Omit<InstanceType<typeof ThermostatNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "Thermostat";
	}
	export function is(node: ISYNode<any, any, any, any>): node is ThermostatNode { return ["Thermostat"].includes(node.nodeDefId); }
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is ThermostatNode {
		return ["Thermostat"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new ThermostatNode(isy, nodeInfo);
	}
	export const Node = ThermostatNode;
	export type Commands = {
		CLISPH: ((value: ) => Promise<boolean>) & {
			label: "Heat Setpoint";
			name: "updateHeatSetpoint";
		};
		CLISPC: ((value: ) => Promise<boolean>) & {
			label: "Cool Setpoint";
			name: "updateCoolSetpoint";
		};
		CLIMD: ((value: ) => Promise<boolean>) & {
			label: "Mode";
			name: "updateMode";
		};
		CLIFS: ((value: ) => Promise<boolean>) & {
			label: "Fan Mode";
			name: "updateFanMode";
		};
		CLISMD: ((value: ) => Promise<boolean>) & {
			label: "Schedule Mode";
			name: "updateScheduleMode";
		};
		CLISPHD: ((value: ) => Promise<boolean>) & {
			label: "Heat Setpoint Shift";
			name: "heatSetpointShift";
		};
		CLISPCD: ((value: ) => Promise<boolean>) & {
			label: "Cool Setpoint Shift";
			name: "coolSetpointShift";
		};
		QUERY: (() => Promise<boolean>) & {
			label: "Query";
			name: "query";
		};
		ADRPST: ((value: ) => Promise<boolean>) & {
			label: "ADR";
			name: "adr";
		};
	};
	export type Drivers = {
		ST: {
			uom: ;
			value: ;
			label: "Temperature";
			name: "temperature";
		};
		CLISPH: {
			uom: ;
			value: ;
			label: "Heat Setpoint";
			name: "heatSetpoint";
		};
		CLISPC: {
			uom: ;
			value: ;
			label: "Cool Setpoint";
			name: "coolSetpoint";
		};
		CLIMD: {
			uom: ;
			value: ;
			label: "Mode";
			name: "mode";
		};
		CLIFS: {
			uom: ;
			value: ;
			label: "Fan Mode";
			name: "fanMode";
		};
		CLIHCS: {
			uom: ;
			value: ;
			label: "Heat/Cool State";
			name: "heatCoolState";
		};
		CLIFRS: {
			uom: ;
			value: ;
			label: "Fan State";
			name: "fanState";
		};
		CLISMD: {
			uom: ;
			value: ;
			label: "Schedule Mode";
			name: "scheduleMode";
		};
		ERR: {
			uom: ;
			value: ;
			label: "Responding";
			name: "responding";
		};
	};
}
