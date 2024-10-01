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

export const nodeDefId = "RelaySwitchOnly_ADV";

type Commands = RelaySwitchOnlyAdv.Commands;
type Drivers = RelaySwitchOnlyAdv.Drivers;

export class RelaySwitchOnlyAdvNode extends Base<Drivers, Commands> implements RelaySwitchOnlyAdv.Interface {
	public readonly commands = {
		BEEP: this.beep,
		BL: this.backlight,
		WDU: this.writeChanges
	};
	static nodeDefId = "RelaySwitchOnly_ADV";
	declare readonly nodeDefId: "RelaySwitchOnly_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
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

NodeFactory.register(RelaySwitchOnlyAdvNode);

export namespace RelaySwitchOnlyAdv {
	export interface Interface extends Omit<InstanceType<typeof RelaySwitchOnlyAdvNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "RelaySwitchOnly_ADV";
	}
	export function is(node: ISYNode<any, any, any, any>): node is RelaySwitchOnlyAdvNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new RelaySwitchOnlyAdvNode(isy, nodeInfo);
	}
	export const Node = RelaySwitchOnlyAdvNode;
	export type Commands = {
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