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

type Commands = BallastRelayLampSwitch.Commands.Type;
type Drivers = BallastRelayLampSwitch.Drivers.Type;

class BallastRelayLampSwitchNode extends Base<Drivers, Commands> implements BallastRelayLampSwitch.Interface {
	public override readonly commands = {
		DON: this.on,
		DOF: this.off,
		DFOF: this.fastOff,
		DFON: this.fastOn,
		QUERY: this.query,
		BEEP: this.beep,
		WDU: this.writeChanges
	};
	static override nodeDefId = "BallastRelayLampSwitch";
	static override implements = ['BallastRelayLampSwitch', "RelayLampOnly", "RelayLampOnly_ADV", "IRLincTx", "EZRAIN_Output", "EZIO2x4_Output", "EZIO2x4_Input", "EZIO2x4_Input_ADV", "BinaryAlarm", "BinaryAlarm_ADV", "BinaryControl", "BinaryControl_ADV", "AlertModuleArmed", "SirenAlert", "SirenArm"];
	declare readonly nodeDefId: 'BallastRelayLampSwitch' | "BallastRelayLampSwitch_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo<Family.Insteon>) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async on(value?: (0 | 100)) { return this.sendCommand("DON", value); }
	async off() { return this.sendCommand("DOF"); }
	async fastOff() { return this.sendCommand("DFOF"); }
	async fastOn() { return this.sendCommand("DFON"); }
	async query() { return this.sendCommand("QUERY"); }
	async beep(value?: number) { return this.sendCommand("BEEP", value); }
	async writeChanges() { return this.sendCommand("WDU"); }
	public get status(): Insteon.Sml {
		return this.drivers.ST?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(BallastRelayLampSwitchNode);
NodeFactory.register(BallastRelayLampSwitchNode, "BallastRelayLampSwitch_ADV");

export namespace BallastRelayLampSwitch {
	export interface Interface extends Omit<InstanceType<typeof BallastRelayLampSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is BallastRelayLampSwitchNode {
		return ['BallastRelayLampSwitch', "BallastRelayLampSwitch_ADV"].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is BallastRelayLampSwitchNode {
		return ['BallastRelayLampSwitch', "BallastRelayLampSwitch_ADV"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>) {
		return new BallastRelayLampSwitchNode(isy, nodeInfo);
	}
	export const Node = BallastRelayLampSwitchNode;
	export const Class = BallastRelayLampSwitchNode;
	export namespace Commands {
		export type Type = {
			DON: ((value?: (0 | 100)) => Promise<boolean>) & {
				label: "On";
				name: "on";
			};
			DOF: (() => Promise<boolean>) & {
				label: "Off";
				name: "off";
			};
			DFOF: (() => Promise<boolean>) & {
				label: "Fast Off";
				name: "fastOff";
			};
			DFON: (() => Promise<boolean>) & {
				label: "Fast On";
				name: "fastOn";
			};
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
		on = 'DON',
		off = 'DOF',
		fastOff = 'DFOF',
		fastOn = 'DFON',
		query = 'QUERY',
		beep = 'BEEP',
		writeChanges = 'WDU'
	}
	export namespace Drivers {
		export type Type = {
			ST: {
				uom: UnitOfMeasure.Percent;
				value: Insteon.Sml;
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
