/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { UDI } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

const nodeDefId = "EM3PulseCounter";

type Commands = PulseCounter.Commands;
type Drivers = PulseCounter.Drivers;

class PulseCounterNode extends Base<Drivers, Commands> implements PulseCounter.Interface {
	public override readonly commands = {};
	static override nodeDefId = "EM3PulseCounter";
	static override implements = ['EM3PulseCounter'];
	declare readonly nodeDefId: 'EM3PulseCounter';
	constructor (isy: ISY, nodeInfo: NodeInfo) {
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
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new PulseCounterNode(isy, nodeInfo);
	}
	export const Node = PulseCounterNode;
	export type Commands = {};
	export type Drivers = {
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
