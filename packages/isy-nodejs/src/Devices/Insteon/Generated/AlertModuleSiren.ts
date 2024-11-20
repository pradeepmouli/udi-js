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

const nodeDefId = "AlertModuleSiren";

type Commands = AlertModuleSiren.Commands;
type Drivers = AlertModuleSiren.Drivers;

export class AlertModuleSirenNode extends Base<Drivers, Commands> implements AlertModuleSiren.Interface {
	public override readonly commands = {
		DON: this.on,
		DOF: this.off,
		DFOF: this.fastOff,
		DFON: this.fastOn,
		QUERY: this.query,
		BEEP: this.beep,
		WDU: this.writeChanges
	};
	static override nodeDefId = "AlertModuleSiren";
	declare readonly nodeDefId: "AlertModuleSiren" | "AlertModuleSiren_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	async on(onLevel?: number) {
		return this.sendCommand("DON", { OL: onLevel });
	}
	async off() {
		return this.sendCommand("DOF");
	}
	async fastOff() {
		return this.sendCommand("DFOF");
	}
	async fastOn() {
		return this.sendCommand("DFON");
	}
	async query() {
		return this.sendCommand("QUERY");
	}
	async beep(value?: number) {
		return this.sendCommand("BEEP", { value: value });
	}
	async writeChanges() {
		return this.sendCommand("WDU");
	}
	public get status(): Insteon.OnLevelRelay {
		return this.drivers.ST?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(AlertModuleSirenNode);
NodeFactory.register(AlertModuleSirenNode, "AlertModuleSiren_ADV");

export namespace AlertModuleSiren {
	export interface Interface extends Omit<InstanceType<typeof AlertModuleSirenNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "AlertModuleSiren" | "AlertModuleSiren_ADV";
	}
	export function is(node: ISYNode<any, any, any, any>): node is AlertModuleSirenNode {
		return node.nodeDefId in ["AlertModuleSiren", "AlertModuleSiren_ADV"];
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is AlertModuleSirenNode {
		return node.nodeDefId in ["AlertModuleSiren", "AlertModuleSiren_ADV"];
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new AlertModuleSirenNode(isy, nodeInfo);
	}
	export const Node = AlertModuleSirenNode;
	export type Commands = {
		DON: ((OL?: number) => Promise<boolean>) & {
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
