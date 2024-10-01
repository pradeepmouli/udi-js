/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NCD } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

export const nodeDefId = "NCDRelay";

type Commands = LampAndSwitch.Commands;
type Drivers = LampAndSwitch.Drivers;

export class LampAndSwitchNode extends Base<Drivers, Commands> implements LampAndSwitch.Interface {
	public readonly commands = {
		DON: this.on,
		DOF: this.off,
		QUERY: this.query,
		ADRPST: this.adr
	};
	static nodeDefId = "NCDRelay";
	declare readonly nodeDefId: "NCDRelay";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async on() {
		return this.sendCommand("DON");
	}
	async off() {
		return this.sendCommand("DOF");
	}
	async query() {
		return this.sendCommand("QUERY");
	}
	async adr(value: (0 | 1)) {
		return this.sendCommand("ADRPST", { value: value });
	}
	public get status(): (0 | 100) {
		return this.drivers.ST?.value;
	}
	public get responding(): NCD.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(LampAndSwitchNode);

export namespace LampAndSwitch {
	export interface Interface extends Omit<InstanceType<typeof LampAndSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "NCDRelay";
	}
	export function is(node: ISYNode<any, any, any, any>): node is LampAndSwitchNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new LampAndSwitchNode(isy, nodeInfo);
	}
	export const Node = LampAndSwitchNode;
	export type Commands = {
		DON: (() => Promise<boolean>) & {
			label: "On";
			name: "on";
		};
		DOF: (() => Promise<boolean>) & {
			label: "Off";
			name: "off";
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
			uom: UnitOfMeasure.Percent;
			value: (0 | 100);
			label: "Status";
			name: "status";
		};
		ERR: {
			uom: UnitOfMeasure.Index;
			value: NCD.Error;
			label: "Responding";
			name: "responding";
		};
	};
}
