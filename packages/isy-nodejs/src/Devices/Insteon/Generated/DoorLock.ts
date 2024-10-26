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

export const nodeDefId = "DoorLock";

type Commands = DoorLock.Commands;
type Drivers = DoorLock.Drivers;

export class DoorLockNode extends SirenAlert implements DoorLock.Interface {
	public readonly commands = {
		DON: this.lock,
		DOF: this.unlock,
		WDU: this.writeChanges
	};
	static nodeDefId = "DoorLock";
	declare readonly nodeDefId: "DoorLock";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async lock() {
		return this.sendCommand("DON");
	}
	async unlock() {
		return this.sendCommand("DOF");
	}
	async writeChanges() {
		return this.sendCommand("WDU");
	}
	public get status(): Insteon.Lock {
		return this.drivers.ST?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(DoorLockNode);

export namespace DoorLock {
	export interface Interface extends Omit<InstanceType<typeof DoorLockNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "DoorLock";
	}
	export function is(node: ISYNode<any, any, any, any>): node is DoorLockNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new DoorLockNode(isy, nodeInfo);
	}
	export const Node = DoorLockNode;
	export type Commands = {
		DON: (() => Promise<boolean>) & {
			label: "Lock";
			name: "lock";
		};
		DOF: (() => Promise<boolean>) & {
			label: "Unlock";
			name: "unlock";
		};
		WDU: (() => Promise<boolean>) & {
			label: "Write Changes";
			name: "writeChanges";
		};
	};
	export type Drivers = {
		ST: {
			uom: UnitOfMeasure.Percent;
			value: Insteon.Lock;
			label: "Status";
			name: "status";
		};
		ERR: {
			uom: UnitOfMeasure.Index;
			value: Insteon.Error;
			label: "Responding";
			name: "responding";
		};
	};
}
