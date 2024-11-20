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

const nodeDefId = "KeypadButton";

type Commands = KeypadButton.Commands;
type Drivers = KeypadButton.Drivers;

export class KeypadButtonNode extends Base<Drivers, Commands> implements KeypadButton.Interface {
	public override readonly commands = {
		QUERY: this.query,
		BL: this.backlight,
		WDU: this.writeChanges
	};
	static override nodeDefId = "KeypadButton";
	declare readonly nodeDefId: "KeypadButton" | "KeypadButton_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async query() {
		return this.sendCommand("QUERY");
	}
	async backlight(value: Insteon.Backlight) {
		return this.sendCommand("BL", { value: value });
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

NodeFactory.register(KeypadButtonNode);
NodeFactory.register(KeypadButtonNode, "KeypadButton_ADV");

export namespace KeypadButton {
	export interface Interface extends Omit<InstanceType<typeof KeypadButtonNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "KeypadButton" | "KeypadButton_ADV";
	}
	export function is(node: ISYNode<any, any, any, any>): node is KeypadButtonNode {
		return node.nodeDefId in ["KeypadButton", "KeypadButton_ADV"];
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is KeypadButtonNode {
		return node.nodeDefId in ["KeypadButton", "KeypadRelay", "KeypadRelay_ADV", "KeypadButton_ADV"];
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new KeypadButtonNode(isy, nodeInfo);
	}
	export const Node = KeypadButtonNode;
	export type Commands = {
		QUERY: (() => Promise<boolean>) & {
			label: "Query";
			name: "query";
		};
		BL: ((value: Insteon.Backlight) => Promise<boolean>) & {
			label: "Backlight";
			name: "backlight";
		};
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
