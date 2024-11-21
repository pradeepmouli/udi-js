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

const nodeDefId = "DimmerSwitchOnly";

type Commands = DimmerSwitch.Commands;
type Drivers = DimmerSwitch.Drivers;

export class DimmerSwitchNode extends Base<Drivers, Commands> implements DimmerSwitch.Interface {
	public override readonly commands = {
		BL: this.backlight,
		WDU: this.writeChanges
	};
	static override nodeDefId = "DimmerSwitchOnly";
	static override implements = ["DimmerSwitchOnly", "SirenAlert", "SirenArm"];
	declare readonly nodeDefId: "DimmerSwitchOnly" | "DimmerSwitchOnly_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async backlight(value: number) { return this.sendCommand("BL", { value: value }); }
	async writeChanges() { return this.sendCommand("WDU"); }
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(DimmerSwitchNode);
NodeFactory.register(DimmerSwitchNode, "DimmerSwitchOnly_ADV");

export namespace DimmerSwitch {
	export interface Interface extends Omit<InstanceType<typeof DimmerSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "DimmerSwitchOnly" | "DimmerSwitchOnly_ADV";
	}
	export function is(node: ISYNode<any, any, any, any>): node is DimmerSwitchNode { return ["DimmerSwitchOnly", "DimmerSwitchOnly_ADV"].includes(node.nodeDefId); }
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is DimmerSwitchNode {
		return ["DimmerSwitchOnly", "DimmerLampSwitch", "DimmerLampSwitch_ADV", "DimmerLampSwitchLED", "DimmerLampSwitchLED_ADV", "DimmerSwitchOnly_ADV"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new DimmerSwitchNode(isy, nodeInfo);
	}
	export const Node = DimmerSwitchNode;
	export type Commands = {
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
