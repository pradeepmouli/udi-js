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

type Commands = EzrainOutput.Commands.Type;
type Drivers = EzrainOutput.Drivers.Type;

class EzrainOutputNode extends Base<Drivers, Commands> implements EzrainOutput.Interface {
	public override readonly commands = {
		DON: this.on,
		DOF: this.off,
		QUERY: this.query,
		WDU: this.writeChanges,
		BEEP: this.beep
	};
	static override nodeDefId = "EZRAIN_Output";
	static override implements = ['EZRAIN_Output', "EZIO2x4_Output", "AlertModuleArmed", "SirenAlert", "SirenArm"];
	declare readonly nodeDefId: 'EZRAIN_Output';
	constructor (isy: ISY, nodeInfo: NodeInfo<Family.Insteon>) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async on(value?: (0 | 100)) { return this.sendCommand("DON", value); }
	async off() { return this.sendCommand("DOF"); }
	async query() { return this.sendCommand("QUERY"); }
	async writeChanges() { return this.sendCommand("WDU"); }
	async beep(value?: number) { return this.sendCommand("BEEP", value); }
	public get status(): Insteon.OnLevelRelay {
		return this.drivers.ST?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(EzrainOutputNode);

export namespace EzrainOutput {
	export interface Interface extends Omit<InstanceType<typeof EzrainOutputNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is EzrainOutputNode {
		return ['EZRAIN_Output'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is EzrainOutputNode {
		return ['EZRAIN_Output', "BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "RelayLampOnly", "RelayLampOnly_ADV", "KeypadRelay", "KeypadRelay_ADV", "FanLincMotor"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>) {
		return new EzrainOutputNode(isy, nodeInfo);
	}
	export const Node = EzrainOutputNode;
	export const Class = EzrainOutputNode;
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
			QUERY: (() => Promise<boolean>) & {
				label: "Query";
				name: "query";
			};
			WDU: (() => Promise<boolean>) & {
				label: "Write Changes";
				name: "writeChanges";
			};
			BEEP: ((value?: number) => Promise<boolean>) & {
				label: "Beep";
				name: "beep";
			};
		};
	}
	export enum Commands {
		on = 'DON',
		off = 'DOF',
		query = 'QUERY',
		writeChanges = 'WDU',
		beep = 'BEEP'
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
