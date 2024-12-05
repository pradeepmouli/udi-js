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

const nodeDefId = "DoorLock";

type Commands = DoorLock.Commands;
type Drivers = DoorLock.Drivers;

class DoorLockNode extends Base<Drivers, Commands> implements DoorLock.Interface {
	public override readonly commands = {
		DON: this.lock,
		DOF: this.unlock,
		WDU: this.writeChanges
	};
	static override nodeDefId = "DoorLock";
	static override implements = ['DoorLock', "SirenAlert", "SirenArm"];
	declare readonly nodeDefId: 'DoorLock';
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async lock() { return this.sendCommand("DON"); }
	async unlock() { return this.sendCommand("DOF"); }
	async writeChanges() { return this.sendCommand("WDU"); }
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
	}
	export function is(node: ISYNode<any, any, any, any>): node is DoorLockNode {
		return ['DoorLock'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is DoorLockNode {
		return ['DoorLock', "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "KeypadRelay", "KeypadRelay_ADV", "FanLincMotor"].includes(node.nodeDefId);
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
