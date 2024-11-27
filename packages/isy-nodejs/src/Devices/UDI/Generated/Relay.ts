/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { UDI } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

const nodeDefId = "EM3Relay";

type Commands = Relay.Commands;
type Drivers = Relay.Drivers;

export class RelayNode extends Base<Drivers, Commands> implements Relay.Interface {
	public override readonly commands = {
		DON: this.on,
		DOF: this.off,
		QUERY: this.query
	};
	static override nodeDefId = "EM3Relay";
	static override implements = ["EM3Relay"];
	declare readonly nodeDefId: "EM3Relay";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async on() { return this.sendCommand("DON"); }
	async off() { return this.sendCommand("DOF"); }
	async query() { return this.sendCommand("QUERY"); }
	public get status(): (0 | 100) {
		return this.drivers.ST?.value;
	}
	public get responding(): UDI.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(RelayNode);

export namespace Relay {
	export interface Interface extends Omit<InstanceType<typeof RelayNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "EM3Relay";
	}
	export function is(node: ISYNode<any, any, any, any>): node is RelayNode {
		return ["EM3Relay"].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is RelayNode {
		return ["EM3Relay"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new RelayNode(isy, nodeInfo);
	}
	export const Node = RelayNode;
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
	};
	export type Drivers = {
		ST: {
			uom: UnitOfMeasure.Percent;
			value: (0 | 100);
			label: "Status";
			name: "status";
		};
		ERR: {
			uom: UnitOfMeasure.Index;
			value: UDI.Error;
			label: "Responding";
			name: "responding";
		};
	};
}
