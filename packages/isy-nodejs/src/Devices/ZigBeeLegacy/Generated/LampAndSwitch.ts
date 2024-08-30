/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { ZigBeeLegacy } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

export const nodeDefId = "RelayLoadControl";

type Commands = LampAndSwitch.Commands;
type Drivers = LampAndSwitch.Drivers;

export class LampAndSwitchNode extends Base<Drivers, Commands> implements LampAndSwitch.Interface {
	public readonly commands = {
		DON: this.on,
		DOF: this.off,
		QUERY: this.query,
		ADRPST: this.adr
	};
	static nodeDefId = "RelayLoadControl";
	declare readonly nodeDefId: "RelayLoadControl";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Unknown, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Unknown, label: "Responding", name: "responding" });
	}
	async on() {
		return this.sendCommand("DON");
	}
	async off() {
		return this.sendCommand("DOF");
	}
	async query() {
		return this.sendCommand("QUERY");
	}
	async adr(value: ) {
		return this.sendCommand("ADRPST", { value: value });
	}
	public get status(): {
        
return this.drivers.ST?.value;
    }
    public 
get responding(): 
{
	return this.drivers.ERR?.value;
}
}

NodeFactory.register(LampAndSwitchNode);

export namespace LampAndSwitch {
	export interface Interface extends Omit<InstanceType<typeof LampAndSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "RelayLoadControl";
	}
	export function is(node: ISYNode<any, any, any, any>): node is LampAndSwitchNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new LampAndSwitchNode(isy, nodeInfo);
	}
	export const Node = LampAndSwitchNode;
	export type Commands = {
		DON: (() => Promise<boolean>) & {
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
		ADRPST: ((value: ) => Promise<boolean>) & {
			label: "ADR";
			name: "adr";
		};
	};
	export type Drivers = {
		ST: {
			uom: ;
			value: ;
			label: "Status";
			name: "status";
		};
		ERR: {
			uom: ;
			value: ;
			label: "Responding";
			name: "responding";
		};
	};
}
