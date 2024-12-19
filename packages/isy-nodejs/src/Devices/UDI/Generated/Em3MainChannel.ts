/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import type { IntRange } from "type-fest";
import { UDI } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = Em3MainChannel.Commands.Type;
type Drivers = Em3MainChannel.Drivers.Type;

class Em3MainChannelNode extends Base<Drivers, Commands> implements Em3MainChannel.Interface {
	public override readonly commands = {};
	static override nodeDefId = "EM3MainChannel";
	static override implements = ['EM3MainChannel'];
	declare readonly nodeDefId: 'EM3MainChannel';
	constructor (isy: ISY, nodeInfo: NodeInfo<Family.UDI>) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Watt, label: "Status", name: "status" });
		this.drivers.TPW = Driver.create("TPW", this, nodeInfo.state['TPW'], { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
		this.drivers.CV = Driver.create("CV", this, nodeInfo.state['CV'], { uom: UnitOfMeasure.Volt, label: "Current Voltage", name: "currentVoltage" });
		this.drivers.CC = Driver.create("CC", this, nodeInfo.state['CC'], { uom: UnitOfMeasure.Ampere, label: "Current Current", name: "currentCurrent" });
		this.drivers.PF = Driver.create("PF", this, nodeInfo.state['PF'], { uom: UnitOfMeasure.PowerFactor, label: "Power Factor", name: "powerFactor" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	public get status(): number {
		return this.drivers.ST?.value;
	}
	public get totalEnergy(): number {
		return this.drivers.TPW?.value;
	}
	public get currentVoltage(): number {
		return this.drivers.CV?.value;
	}
	public get currentCurrent(): number {
		return this.drivers.CC?.value;
	}
	public get powerFactor(): IntRange<0, 1> {
		return this.drivers.PF?.value;
	}
	public get responding(): UDI.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(Em3MainChannelNode);

export namespace Em3MainChannel {
	export interface Interface extends Omit<InstanceType<typeof Em3MainChannelNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is Em3MainChannelNode {
		return ['EM3MainChannel'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is Em3MainChannelNode {
		return ['EM3MainChannel'].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.UDI>) {
		return new Em3MainChannelNode(isy, nodeInfo);
	}
	export const Node = Em3MainChannelNode;
	export const Class = Em3MainChannelNode;
	export namespace Commands {
		export type Type = {};
	}
	export enum Commands {
	}
	export namespace Drivers {
		export type Type = {
			ST: {
				uom: UnitOfMeasure.Watt;
				value: number;
				label: "Status";
				name: "status";
			};
			TPW: {
				uom: UnitOfMeasure.KilowattsPerHour;
				value: number;
				label: "Total Energy";
				name: "totalEnergy";
			};
			CV: {
				uom: UnitOfMeasure.Volt;
				value: number;
				label: "Current Voltage";
				name: "currentVoltage";
			};
			CC: {
				uom: UnitOfMeasure.Ampere;
				value: number;
				label: "Current Current";
				name: "currentCurrent";
			};
			PF: {
				uom: UnitOfMeasure.PowerFactor;
				value: IntRange<0, 1>;
				label: "Power Factor";
				name: "powerFactor";
			};
			ERR: {
				uom: UnitOfMeasure.Index;
				value: UDI.Error;
				label: "Responding";
				name: "responding";
			};
		};
	}
	export enum Drivers {
		status = 'ST',
		totalEnergy = 'TPW',
		currentVoltage = 'CV',
		currentCurrent = 'CC',
		powerFactor = 'PF',
		responding = 'ERR'
	}
}
