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

const nodeDefId = "RelaySwitchOnly";

type Commands = RelaySwitch.Commands;
type Drivers = RelaySwitch.Drivers;

export class RelaySwitchNode extends Base<Drivers, Commands> implements RelaySwitch.Interface {
	public override readonly commands = {
		BEEP: this.beep,
		BL: this.backlight,
		WDU: this.writeChanges
	};
	static override nodeDefId = "RelaySwitchOnly";
	static override implements = ["RelaySwitchOnly", "IRLincTx", "SirenAlert", "SirenArm"];
	declare readonly nodeDefId: "RelaySwitchOnly" | "RelaySwitchOnly_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async beep(value?: number) { return this.sendCommand("BEEP", value); }
	async backlight(value: number) { return this.sendCommand("BL", value); }
	async writeChanges() { return this.sendCommand("WDU"); }
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(RelaySwitchNode);
NodeFactory.register(RelaySwitchNode, "RelaySwitchOnly_ADV");

export namespace RelaySwitch {
	export interface Interface extends Omit<InstanceType<typeof RelaySwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "RelaySwitchOnly" | "RelaySwitchOnly_ADV";
	}
	export function is(node: ISYNode<any, any, any, any>): node is RelaySwitchNode {
		return ["RelaySwitchOnly", "RelaySwitchOnly_ADV"].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is RelaySwitchNode {
		return ["RelaySwitchOnly", "DimmerMotorSwitch", "DimmerMotorSwitch_ADV", "DimmerLampSwitch", "DimmerLampSwitch_ADV", "DimmerLampSwitchLED", "DimmerLampSwitchLED_ADV", "KeypadDimmer", "KeypadDimmer_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "RelaySwitchOnlyPlusQuery", "RelaySwitchOnlyPlusQuery_ADV", "RelaySwitchOnly_ADV"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new RelaySwitchNode(isy, nodeInfo);
	}
	export const Node = RelaySwitchNode;
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
