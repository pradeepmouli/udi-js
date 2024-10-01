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

export const nodeDefId = "EZIO2x4_Input_ADV";

type Commands = Ezio2x4InputAdv.Commands;
type Drivers = Ezio2x4InputAdv.Drivers;

export class Ezio2x4InputAdvNode extends Base<Drivers, Commands> implements Ezio2x4InputAdv.Interface {
	public readonly commands = {
		WDU: this.writeChanges
	};
	static nodeDefId = "EZIO2x4_Input_ADV";
	declare readonly nodeDefId: "EZIO2x4_Input_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async writeChanges() {
		return this.sendCommand("WDU");
	}
	public get status(): Insteon.OnLevelRelay {
		return this.drivers.ST?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(Ezio2x4InputAdvNode);

export namespace Ezio2x4InputAdv {
	export interface Interface extends Omit<InstanceType<typeof Ezio2x4InputAdvNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "EZIO2x4_Input_ADV";
	}
	export function is(node: ISYNode<any, any, any, any>): node is Ezio2x4InputAdvNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new Ezio2x4InputAdvNode(isy, nodeInfo);
	}
	export const Node = Ezio2x4InputAdvNode;
	export type Commands = {
		WDU: (() => Promise<boolean>) & {
			label: "Write Changes";
			name: "writeChanges";
		};
	};
	export type Drivers = {
		ST: {
			uom: UnitOfMeasure.Percent;
			value: Insteon.OnLevelRelay;
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