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

type Commands = RelayLampSwitchLed.Commands.Type;
type Drivers = RelayLampSwitchLed.Drivers.Type;

class RelayLampSwitchLedNode extends Base<Drivers, Commands> implements RelayLampSwitchLed.Interface {
	public override readonly commands = {
		DON: this.on,
		DOF: this.off,
		DFOF: this.fastOff,
		DFON: this.fastOn,
		QUERY: this.query,
		BEEP: this.beep,
		LED: this.led,
		BL: this.backlight,
		WDU: this.writeChanges
	};
	static override nodeDefId = "RelayLampSwitchLED";
	static override implements = ['RelayLampSwitchLED', "RelaySwitchOnlyPlusQuery", "RelaySwitchOnlyPlusQuery_ADV", "RelaySwitchOnly", "RelaySwitchOnly_ADV", "RelayLampOnly", "RelayLampOnly_ADV", "IRLincTx", "EZRAIN_Output", "EZIO2x4_Output", "EZIO2x4_Input", "EZIO2x4_Input_ADV", "DoorLock", "BinaryAlarm", "BinaryAlarm_ADV", "BinaryControl", "BinaryControl_ADV", "AlertModuleArmed", "SirenAlert", "SirenArm", "PIR2844OnOff", "PIR2844OnOff_ADV"];
	declare readonly nodeDefId: 'RelayLampSwitchLED' | "RelayLampSwitchLED_ADV";
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
	async led(value: Insteon.I3RgbLed) { return this.sendCommand("LED", value); }
	async backlight(value: number) { return this.sendCommand("BL", value); }
	async writeChanges() { return this.sendCommand("WDU"); }
	public get status(): Insteon.OnLevelRelay {
		return this.drivers.ST?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(RelayLampSwitchLedNode);
NodeFactory.register(RelayLampSwitchLedNode, "RelayLampSwitchLED_ADV");

export namespace RelayLampSwitchLed {
	export interface Interface extends Omit<InstanceType<typeof RelayLampSwitchLedNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is RelayLampSwitchLedNode {
		return ['RelayLampSwitchLED', "RelayLampSwitchLED_ADV"].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is RelayLampSwitchLedNode {
		return ['RelayLampSwitchLED', "RelayLampSwitchLED_ADV"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>) {
		return new RelayLampSwitchLedNode(isy, nodeInfo);
	}
	export const Node = RelayLampSwitchLedNode;
	export const Class = RelayLampSwitchLedNode;
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
			LED: ((value: Insteon.I3RgbLed) => Promise<boolean>) & {
				label: "LED";
				name: "led";
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
	}
	export enum Commands {
		on = 'DON',
		off = 'DOF',
		fastOff = 'DFOF',
		fastOn = 'DFON',
		query = 'QUERY',
		beep = 'BEEP',
		led = 'LED',
		backlight = 'BL',
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
