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

type Commands = Ezio2x4Input.Commands.Type;
type Drivers = Ezio2x4Input.Drivers.Type;

class Ezio2x4InputNode extends Base<Drivers, Commands> implements Ezio2x4Input.Interface {
	public override readonly commands = {
		WDU: this.writeChanges
	};
	static override nodeDefId = "EZIO2x4_Input";
	static override implements = ['EZIO2x4_Input', "SirenAlert", "SirenArm"];
	declare readonly nodeDefId: 'EZIO2x4_Input' | "EZIO2x4_Input_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo<Family.Insteon>) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async writeChanges() { return this.sendCommand("WDU"); }
	public get status(): Insteon.OnLevelRelay {
		return this.drivers.ST?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(Ezio2x4InputNode);
NodeFactory.register(Ezio2x4InputNode, "EZIO2x4_Input_ADV");

export namespace Ezio2x4Input {
	export interface Interface extends Omit<InstanceType<typeof Ezio2x4InputNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is Ezio2x4InputNode {
		return ['EZIO2x4_Input', "EZIO2x4_Input_ADV"].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is Ezio2x4InputNode {
		return ['EZIO2x4_Input', "BallastRelayLampSwitch", "BallastRelayLampSwitch_ADV", "RelayLampSwitch", "RelayLampSwitch_ADV", "RelayLampSwitchLED", "RelayLampSwitchLED_ADV", "KeypadRelay", "KeypadRelay_ADV", "KeypadButton", "KeypadButton_ADV", "EZRAIN_Input", "EZRAIN_Input_ADV", "EZIO2x4_Input_ADV"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>) {
		return new Ezio2x4InputNode(isy, nodeInfo);
	}
	export const Node = Ezio2x4InputNode;
	export const Class = Ezio2x4InputNode;
	export namespace Commands {
		export type Type = {
			WDU: (() => Promise<boolean>) & {
				label: "Write Changes";
				name: "writeChanges";
			};
		};
	}
	export enum Commands {
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
