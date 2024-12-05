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

const nodeDefId = "IRLincTx";

type Commands = IrLincTx.Commands;
type Drivers = IrLincTx.Drivers;

class IrLincTxNode extends Base<Drivers, Commands> implements IrLincTx.Interface {
	public override readonly commands = {
		BEEP: this.beep,
		WDU: this.writeChanges
	};
	static override nodeDefId = "IRLincTx";
	static override implements = ['IRLincTx', "SirenAlert", "SirenArm"];
	declare readonly nodeDefId: 'IRLincTx';
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async beep(value?: number) { return this.sendCommand("BEEP", value); }
	async writeChanges() { return this.sendCommand("WDU"); }
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(IrLincTxNode);

export namespace IrLincTx {
	export interface Interface extends Omit<InstanceType<typeof IrLincTxNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is IrLincTxNode {
		return ['IRLincTx'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is IrLincTxNode {
		return ['IRLincTx', "Thermostat", "TempLinc", "DimmerMotorSwitch", "DimmerMotorSwitch_ADV", "DimmerLampSwitch", "DimmerLampSwitch_ADV", "DimmerLampSwitchLED", "DimmerLampSwitchLED_ADV", "DimmerLampOnly", "KeypadDimmer", "KeypadDimmer_ADV", "BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "RelaySwitchOnlyPlusQuery", "RelaySwitchOnlyPlusQuery_ADV", "RelaySwitchOnly", "RelaySwitchOnly_ADV", "RelayLampOnly", "RelayLampOnly_ADV", "KeypadRelay", "KeypadRelay_ADV"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new IrLincTxNode(isy, nodeInfo);
	}
	export const Node = IrLincTxNode;
	export type Commands = {
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
		ERR: {
			uom: UnitOfMeasure.Index;
			value: Insteon.Error;
			label: "Responding";
			name: "responding";
		};
	};
}
