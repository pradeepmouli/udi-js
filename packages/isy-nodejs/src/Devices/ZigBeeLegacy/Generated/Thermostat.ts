/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = Thermostat.Commands.Type;
type Drivers = Thermostat.Drivers.Type;

class ThermostatNode extends Base<Drivers, Commands> implements Thermostat.Interface {
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
	static override implements = ['Thermostat'];
	declare readonly nodeDefId: 'Thermostat';
	constructor (isy: ISY, nodeInfo: NodeInfo<Family.ZigBeeLegacy>) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Unknown, label: "Temperature", name: "temperature" });
		this.drivers.CLISPH = Driver.create("CLISPH", this, nodeInfo.state['CLISPH'], { uom: UnitOfMeasure.Unknown, label: "Heat Setpoint", name: "heatSetpoint" });
		this.drivers.CLISPC = Driver.create("CLISPC", this, nodeInfo.state['CLISPC'], { uom: UnitOfMeasure.Unknown, label: "Cool Setpoint", name: "coolSetpoint" });
		this.drivers.CLIMD = Driver.create("CLIMD", this, nodeInfo.state['CLIMD'], { uom: UnitOfMeasure.Unknown, label: "Mode", name: "mode" });
		this.drivers.CLIFS = Driver.create("CLIFS", this, nodeInfo.state['CLIFS'], { uom: UnitOfMeasure.Unknown, label: "Fan Mode", name: "fanMode" });
		this.drivers.CLIHCS = Driver.create("CLIHCS", this, nodeInfo.state['CLIHCS'], { uom: UnitOfMeasure.Unknown, label: "Heat/Cool State", name: "heatCoolState" });
		this.drivers.CLIFRS = Driver.create("CLIFRS", this, nodeInfo.state['CLIFRS'], { uom: UnitOfMeasure.Unknown, label: "Fan State", name: "fanState" });
		this.drivers.CLISMD = Driver.create("CLISMD", this, nodeInfo.state['CLISMD'], { uom: UnitOfMeasure.Unknown, label: "Schedule Mode", name: "scheduleMode" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Unknown, label: "Responding", name: "responding" });
	}
	async updateHeatSetpoint(value: ) { return this.sendCommand("CLISPH", value); }
	async updateCoolSetpoint(value: ) { return this.sendCommand("CLISPC", value); }
	async updateMode(value: ) { return this.sendCommand("CLIMD", value); }
	async updateFanMode(value: ) { return this.sendCommand("CLIFS", value); }
	async updateScheduleMode(value: ) { return this.sendCommand("CLISMD", value); }
	async heatSetpointShift(value: ) { return this.sendCommand("CLISPHD", value); }
	async coolSetpointShift(value: ) { return this.sendCommand("CLISPCD", value); }
	async query() { return this.sendCommand("QUERY"); }
	async adr(value: ) { return this.sendCommand("ADRPST", value); }
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
	}
	export function is(node: ISYNode<any, any, any, any>): node is ThermostatNode {
		return ['Thermostat'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is ThermostatNode {
		return ['Thermostat'].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.ZigBeeLegacy>) {
		return new ThermostatNode(isy, nodeInfo);
	}
	export const Node = ThermostatNode;
	export const Class = ThermostatNode;
	export namespace Commands {
		export type Type = {
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
	}
	export enum Commands {
		updateHeatSetpoint = 'CLISPH',
		updateCoolSetpoint = 'CLISPC',
		updateMode = 'CLIMD',
		updateFanMode = 'CLIFS',
		updateScheduleMode = 'CLISMD',
		heatSetpointShift = 'CLISPHD',
		coolSetpointShift = 'CLISPCD',
		query = 'QUERY',
		adr = 'ADRPST'
	}
	export namespace Drivers {
		export type Type = {
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
	export enum Drivers {
		temperature = 'ST',
		heatSetpoint = 'CLISPH',
		coolSetpoint = 'CLISPC',
		mode = 'CLIMD',
		fanMode = 'CLIFS',
		heatCoolState = 'CLIHCS',
		fanState = 'CLIFRS',
		scheduleMode = 'CLISMD',
		responding = 'ERR'
	}
}
