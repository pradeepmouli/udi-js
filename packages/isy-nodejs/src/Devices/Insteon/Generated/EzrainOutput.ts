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

const nodeDefId = "EZRAIN_Output";

type Commands = EzrainOutput.Commands;
type Drivers = EzrainOutput.Drivers;

export class EzrainOutputNode extends Base<Drivers, Commands> implements EzrainOutput.Interface {
	public override readonly commands = {
		DON: this.on,
		DOF: this.off,
		QUERY: this.query,
		WDU: this.writeChanges,
		BEEP: this.beep
	};
	static override nodeDefId = "EZRAIN_Output";
	static override implements = ["EZRAIN_Output", "EZIO2x4_Output", "AlertModuleArmed", "SirenAlert", "SirenArm"];
	declare readonly nodeDefId: "EZRAIN_Output";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
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
		nodeDefId: "EZRAIN_Output";
	}
	export function is(node: ISYNode<any, any, any, any>): node is EzrainOutputNode { return ["EZRAIN_Output"].includes(node.nodeDefId); }
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is EzrainOutputNode {
		return ["EZRAIN_Output", "BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "RelayLampOnly", "RelayLampOnly_ADV", "KeypadRelay", "KeypadRelay_ADV", "FanLincMotor"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new EzrainOutputNode(isy, nodeInfo);
	}
	export const Node = EzrainOutputNode;
	export type Commands = {
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
