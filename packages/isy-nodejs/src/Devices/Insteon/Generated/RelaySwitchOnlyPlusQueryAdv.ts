/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Insteon } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

export const nodeDefId = "RelaySwitchOnlyPlusQuery_ADV";

type Commands = RelaySwitchOnlyPlusQueryAdv.Commands;
type Drivers = RelaySwitchOnlyPlusQueryAdv.Drivers;

export class RelaySwitchOnlyPlusQueryAdvNode extends Base<Drivers, Commands> implements RelaySwitchOnlyPlusQueryAdv.Interface {
	public readonly commands = {
		QUERY: this.query,
		BEEP: this.beep,
		BL: this.backlight,
		WDU: this.writeChanges
	};
	static nodeDefId = "RelaySwitchOnlyPlusQuery_ADV";
	declare readonly nodeDefId: "RelaySwitchOnlyPlusQuery_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async query() {
		return this.sendCommand("QUERY");
	}
	async beep(value?: number) {
		return this.sendCommand("BEEP", { value: value });
	}
	async backlight(value: number) {
		return this.sendCommand("BL", { value: value });
	}
	async writeChanges() {
		return this.sendCommand("WDU");
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(RelaySwitchOnlyPlusQueryAdvNode);

export namespace RelaySwitchOnlyPlusQueryAdv {
	export interface Interface extends Omit<InstanceType<typeof RelaySwitchOnlyPlusQueryAdvNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "RelaySwitchOnlyPlusQuery_ADV";
	}
	export function is(node: ISYNode<any, any, any, any>): node is RelaySwitchOnlyPlusQueryAdvNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new RelaySwitchOnlyPlusQueryAdvNode(isy, nodeInfo);
	}
	export const Node = RelaySwitchOnlyPlusQueryAdvNode;
	export type Commands = {
		QUERY: (() => Promise<boolean>) & {
			label: "Query";
			name: "query";
		};
		BEEP: ((value?: number) => Promise<boolean>) & {
			label: "Beep";
			name: "beep";
		};
		BL: ((value: number) => Promise<boolean>) & {
			label: "Backlight";
			name: "backlight";
		};
		WDU: (() => Promise<boolean>) & {
			label: "Write Changes";
			name: "writeChanges";
		};
	};
	export type Drivers = {
		ERR: {
			uom: UnitOfMeasure.Index;
			value: Insteon.Error;
			label: "Responding";
			name: "responding";
		};
	};
}
