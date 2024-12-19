/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { UDI } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = PulseCounter.Commands.Type;
type Drivers = PulseCounter.Drivers.Type;

class PulseCounterNode extends Base<Drivers, Commands> implements PulseCounter.Interface {
	public override readonly commands = {};
	static override nodeDefId = "EM3PulseCounter";
	static override implements = ['EM3PulseCounter'];
	declare readonly nodeDefId: 'EM3PulseCounter';
	constructor (isy: ISY, nodeInfo: NodeInfo<Family.UDI>) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.PulseCount, label: "Status", name: "status" });
		this.drivers.CPW = Driver.create("CPW", this, nodeInfo.state['CPW'], { uom: UnitOfMeasure.Watt, label: "Current Power", name: "currentPower" });
		this.drivers.TPW = Driver.create("TPW", this, nodeInfo.state['TPW'], { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	public get status(): number {
		return this.drivers.ST?.value;
	}
	public get currentPower(): number {
		return this.drivers.CPW?.value;
	}
	public get totalEnergy(): number {
		return this.drivers.TPW?.value;
	}
	public get responding(): UDI.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(PulseCounterNode);

export namespace PulseCounter {
	export interface Interface extends Omit<InstanceType<typeof PulseCounterNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is PulseCounterNode {
		return ['EM3PulseCounter'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is PulseCounterNode {
		return ['EM3PulseCounter'].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.UDI>) {
		return new PulseCounterNode(isy, nodeInfo);
	}
	export const Node = PulseCounterNode;
	export const Class = PulseCounterNode;
	export namespace Commands {
		export type Type = {};
	}
	export enum Commands {
	}
	export namespace Drivers {
		export type Type = {
			ST: {
				uom: UnitOfMeasure.PulseCount;
				value: number;
				label: "Status";
				name: "status";
			};
			CPW: {
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
				value: UDI.Error;
				label: "Responding";
				name: "responding";
			};
		};
	}
	export enum Drivers {
		status = 'ST',
		currentPower = 'CPW',
		totalEnergy = 'TPW',
		responding = 'ERR'
	}
}
