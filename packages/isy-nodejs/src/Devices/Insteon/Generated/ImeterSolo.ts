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

const nodeDefId = "IMETER_SOLO";

type Commands = ImeterSolo.Commands;
type Drivers = ImeterSolo.Drivers;

export class ImeterSoloNode extends Base<Drivers, Commands> implements ImeterSolo.Interface {
	public override readonly commands = {
		RESET: this.resetTotalEnergy,
		QUERY: this.query,
		WDU: this.writeChanges
	};
	static override nodeDefId = "IMETER_SOLO";
	declare readonly nodeDefId: "IMETER_SOLO";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Watt, label: "Current Power", name: "currentPower" });
		this.drivers.TPW = Driver.create("TPW", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async resetTotalEnergy() {
		return this.sendCommand("RESET");
	}
	async query() {
		return this.sendCommand("QUERY");
	}
	async writeChanges() {
		return this.sendCommand("WDU");
	}
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
		nodeDefId: "IMETER_SOLO";
	}
	export function is(node: ISYNode<any, any, any, any>): node is ImeterSoloNode {
		return node.nodeDefId in ["IMETER_SOLO"];
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is ImeterSoloNode {
		return node.nodeDefId in ["IMETER_SOLO"];
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new ImeterSoloNode(isy, nodeInfo);
	}
	export const Node = ImeterSoloNode;
	export type Commands = {
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
	export type Drivers = {
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
