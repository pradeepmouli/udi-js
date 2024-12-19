/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Insteon } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = BinaryAlarm.Commands.Type;
type Drivers = BinaryAlarm.Drivers.Type;

class BinaryAlarmNode extends Base<Drivers, Commands> implements BinaryAlarm.Interface {
	public override readonly commands = {
		QUERY: this.query,
		BEEP: this.beep,
		WDU: this.writeChanges
	};
	static override nodeDefId = "BinaryAlarm";
	static override implements = ['BinaryAlarm', "BinaryControl", "BinaryControl_ADV", "SirenAlert", "SirenArm"];
	declare readonly nodeDefId: 'BinaryAlarm' | "BinaryAlarm_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo<Family.Insteon>) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
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

NodeFactory.register(BinaryAlarmNode);
NodeFactory.register(BinaryAlarmNode, "BinaryAlarm_ADV");

export namespace BinaryAlarm {
	export interface Interface extends Omit<InstanceType<typeof BinaryAlarmNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is BinaryAlarmNode {
		return ['BinaryAlarm', "BinaryAlarm_ADV"].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is BinaryAlarmNode {
		return ['BinaryAlarm', "BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "KeypadRelay", "KeypadRelay_ADV", "BinaryAlarm_ADV"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>) {
		return new BinaryAlarmNode(isy, nodeInfo);
	}
	export const Node = BinaryAlarmNode;
	export const Class = BinaryAlarmNode;
	export namespace Commands {
		export type Type = {
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
	}
	export enum Commands {
		query = 'QUERY',
		beep = 'BEEP',
		writeChanges = 'WDU'
	}
	export namespace Drivers {
		export type Type = {
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
	export enum Drivers {
		status = 'ST',
		responding = 'ERR'
	}
}
