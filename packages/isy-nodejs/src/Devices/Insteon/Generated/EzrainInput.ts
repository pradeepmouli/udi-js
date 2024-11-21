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

const nodeDefId = "EZRAIN_Input";

type Commands = EzrainInput.Commands;
type Drivers = EzrainInput.Drivers;

export class EzrainInputNode extends Base<Drivers, Commands> implements EzrainInput.Interface {
	public override readonly commands = {
		WDU: this.writeChanges
	};
	static override nodeDefId = "EZRAIN_Input";
	static override implements = ["EZRAIN_Input", "EZIO2x4_Input", "EZIO2x4_Input_ADV", "SirenAlert", "SirenArm"];
	declare readonly nodeDefId: "EZRAIN_Input" | "EZRAIN_Input_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async writeChanges() { return this.sendCommand("WDU"); }
	public get status(): Insteon.OnLevelRelay {
		return this.drivers.ST?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(EzrainInputNode);
NodeFactory.register(EzrainInputNode, "EZRAIN_Input_ADV");

export namespace EzrainInput {
	export interface Interface extends Omit<InstanceType<typeof EzrainInputNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "EZRAIN_Input" | "EZRAIN_Input_ADV";
	}
	export function is(node: ISYNode<any, any, any, any>): node is EzrainInputNode { return ["EZRAIN_Input", "EZRAIN_Input_ADV"].includes(node.nodeDefId); }
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is EzrainInputNode {
		return ["EZRAIN_Input", "EZRAIN_Input_ADV"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new EzrainInputNode(isy, nodeInfo);
	}
	export const Node = EzrainInputNode;
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
