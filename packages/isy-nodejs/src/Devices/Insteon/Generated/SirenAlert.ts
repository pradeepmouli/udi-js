/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Insteon } from "../../../Definitions/index.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = SirenAlert.Commands.Type;
type Drivers = SirenAlert.Drivers.Type;

class SirenAlertNode extends Base<Drivers, Commands> implements SirenAlert.Interface {
	public override readonly commands = {};
	static override nodeDefId = "SirenAlert";
	static override implements = ['SirenAlert'];
	declare readonly nodeDefId: 'SirenAlert' | "SirenArm";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(SirenAlertNode);
NodeFactory.register(SirenAlertNode, "SirenArm");

export namespace SirenAlert {
	export interface Interface extends Omit<InstanceType<typeof SirenAlertNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is SirenAlertNode {
		return ['SirenAlert', "SirenArm"].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is SirenAlertNode {
		return ['SirenAlert', "X10", "Thermostat", "TempLinc", "OnOffControl", "OnOffControl_ADV", "DimmerMotorSwitch", "DimmerMotorSwitch_ADV", "DimmerLampSwitch", "DimmerLampSwitch_ADV", "DimmerLampSwitchLED", "DimmerLampSwitchLED_ADV", "DimmerSwitchOnly", "DimmerSwitchOnly_ADV", "DimmerLampOnly", "KeypadDimmer", "KeypadDimmer_ADV", "BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "RelaySwitchOnlyPlusQuery", "RelaySwitchOnlyPlusQuery_ADV", "RelaySwitchOnly", "RelaySwitchOnly_ADV", "RelayLampOnly", "RelayLampOnly_ADV", "KeypadRelay", "KeypadRelay_ADV", "RemoteLinc2", "RemoteLinc2_ADV", "IRLincTx", "FanLincMotor", "KeypadButton", "KeypadButton_ADV", "EZRAIN_Output", "EZRAIN_Input", "EZRAIN_Input_ADV", "EZIO2x4_Output", "EZIO2x4_Input", "EZIO2x4_Input_ADV", "IMETER_SOLO", "DoorLock", "BinaryAlarm", "BinaryAlarm_ADV", "BinaryControl", "BinaryControl_ADV", "AlertModuleSiren", "AlertModuleSiren_ADV", "AlertModuleArmed", "Siren", "Siren_ADV", "SirenArm", "PIR2844_ADV", "PIR2844C_ADV", "PIR2844OnOff_ADV"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new SirenAlertNode(isy, nodeInfo);
	}
	export const Node = SirenAlertNode;
	export const Class = SirenAlertNode;
	export namespace Commands {
		export type Type = {};
	}
	export enum Commands {
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
