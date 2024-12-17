/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Insteon } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = DimmerSwitch.Commands.Type;
type Drivers = DimmerSwitch.Drivers.Type;

class DimmerSwitchNode extends Base<Drivers, Commands> implements DimmerSwitch.Interface {
	public override readonly commands = {
		BL: this.backlight,
		WDU: this.writeChanges
	};
	static override nodeDefId = "DimmerSwitchOnly";
	static override implements = ['DimmerSwitchOnly', "SirenAlert", "SirenArm"];
	declare readonly nodeDefId: 'DimmerSwitchOnly' | "DimmerSwitchOnly_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async backlight(value: number) { return this.sendCommand("BL", value); }
	async writeChanges() { return this.sendCommand("WDU"); }
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(DimmerSwitchNode);
NodeFactory.register(DimmerSwitchNode, "DimmerSwitchOnly_ADV");

export namespace DimmerSwitch {
	export interface Interface extends Omit<InstanceType<typeof DimmerSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is DimmerSwitchNode {
		return ['DimmerSwitchOnly', "DimmerSwitchOnly_ADV"].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is DimmerSwitchNode {
		return ['DimmerSwitchOnly', "DimmerLampSwitch", "DimmerLampSwitch_ADV", "DimmerLampSwitchLED", "DimmerLampSwitchLED_ADV", "DimmerSwitchOnly_ADV"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new DimmerSwitchNode(isy, nodeInfo);
	}
	export const Node = DimmerSwitchNode;
	export const Class = DimmerSwitchNode;
	export namespace Commands {
		export type Type = {
			BL: ((value: number) => Promise<boolean>) & {
				label: "Backlight";
				name: "backlight";
			};
			WDU: (() => Promise<boolean>) & {
				label: "Write Changes";
				name: "writeChanges";
			};
		};
	}
	export enum Commands {
		backlight = 'BL',
		writeChanges = 'WDU'
	}
	export namespace Drivers {
		export type Type = {
			ERR: {
				uom: UnitOfMeasure.Index;
				value: Insteon.Error;
				label: "Responding";
				name: "responding";
			};
		};
	}
	export enum Drivers {
		responding = 'ERR'
	}
}
