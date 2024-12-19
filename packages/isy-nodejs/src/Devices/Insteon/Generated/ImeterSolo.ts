/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Insteon } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = ImeterSolo.Commands.Type;
type Drivers = ImeterSolo.Drivers.Type;

class ImeterSoloNode extends Base<Drivers, Commands> implements ImeterSolo.Interface {
	public override readonly commands = {
		RESET: this.resetTotalEnergy,
		QUERY: this.query,
		WDU: this.writeChanges
	};
	static override nodeDefId = "IMETER_SOLO";
	static override implements = ['IMETER_SOLO'];
	declare readonly nodeDefId: 'IMETER_SOLO';
	constructor (isy: ISY, nodeInfo: NodeInfo<Family.Insteon>) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Watt, label: "Current Power", name: "currentPower" });
		this.drivers.TPW = Driver.create("TPW", this, nodeInfo.state['TPW'], { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async resetTotalEnergy() { return this.sendCommand("RESET"); }
	async query() { return this.sendCommand("QUERY"); }
	async writeChanges() { return this.sendCommand("WDU"); }
	public get currentPower(): number {
		return this.drivers.ST?.value;
	}
	public get totalEnergy(): number {
		return this.drivers.TPW?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(ImeterSoloNode);

export namespace ImeterSolo {
	export interface Interface extends Omit<InstanceType<typeof ImeterSoloNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is ImeterSoloNode {
		return ['IMETER_SOLO'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is ImeterSoloNode {
		return ['IMETER_SOLO'].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>) {
		return new ImeterSoloNode(isy, nodeInfo);
	}
	export const Node = ImeterSoloNode;
	export const Class = ImeterSoloNode;
	export namespace Commands {
		export type Type = {
			RESET: (() => Promise<boolean>) & {
				label: "Reset Total Energy";
				name: "resetTotalEnergy";
			};
			QUERY: (() => Promise<boolean>) & {
				label: "Query";
				name: "query";
			};
			WDU: (() => Promise<boolean>) & {
				label: "Write Changes";
				name: "writeChanges";
			};
		};
	}
	export enum Commands {
		resetTotalEnergy = 'RESET',
		query = 'QUERY',
		writeChanges = 'WDU'
	}
	export namespace Drivers {
		export type Type = {
			ST: {
				uom: UnitOfMeasure.Watt;
				value: number;
				label: "Current Power";
				name: "currentPower";
			};
			TPW: {
				uom: UnitOfMeasure.KilowattsPerHour;
				value: number;
				label: "Total Energy";
				name: "totalEnergy";
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
		currentPower = 'ST',
		totalEnergy = 'TPW',
		responding = 'ERR'
	}
}
