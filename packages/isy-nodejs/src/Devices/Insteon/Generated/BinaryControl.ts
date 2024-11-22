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

const nodeDefId = "BinaryControl";

type Commands = BinaryControl.Commands;
type Drivers = BinaryControl.Drivers;

export class BinaryControlNode extends Base<Drivers, Commands> implements BinaryControl.Interface {
	public override readonly commands = {
		QUERY: this.query,
		BEEP: this.beep,
		WDU: this.writeChanges
	};
	static override nodeDefId = "BinaryControl";
	static override implements = ["BinaryControl", "SirenAlert", "SirenArm"];
	declare readonly nodeDefId: "BinaryControl" | "BinaryControl_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async query() { return this.sendCommand("QUERY"); }
	async beep(value?: number) { return this.sendCommand("BEEP", value); }
	async writeChanges() { return this.sendCommand("WDU"); }
	public get status(): Insteon.OnLevelRelay {
		return this.drivers.ST?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(BinaryControlNode);
NodeFactory.register(BinaryControlNode, "BinaryControl_ADV");

export namespace BinaryControl {
	export interface Interface extends Omit<InstanceType<typeof BinaryControlNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "BinaryControl" | "BinaryControl_ADV";
	}
	export function is(node: ISYNode<any, any, any, any>): node is BinaryControlNode { return ["BinaryControl", "BinaryControl_ADV"].includes(node.nodeDefId); }
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is BinaryControlNode {
		return ["BinaryControl", "BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "KeypadRelay", "KeypadRelay_ADV", "BinaryAlarm", "BinaryAlarm_ADV", "BinaryControl_ADV"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new BinaryControlNode(isy, nodeInfo);
	}
	export const Node = BinaryControlNode;
	export type Commands = {
		QUERY: (() => Promise<boolean>) & {
			label: "Query";
			name: "query";
		};
		BEEP: ((value?: number) => Promise<boolean>) & {
			label: "Beep";
			name: "beep";
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
