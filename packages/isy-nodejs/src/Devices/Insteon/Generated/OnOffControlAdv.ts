/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Family } from "../../../Definitions/Global/Families.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import type { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { Insteon } from "../../../Definitions/index.js";
import type { DriverState } from "../../../Model/DriverState.js";
import { NodeFactory } from "../../NodeFactory.js";

export const nodeDefId = "OnOffControl_ADV";

type Commands = OnOffControlAdv.Commands;
type Drivers = OnOffControlAdv.Drivers;

export class OnOffControlAdvNode extends Base<Drivers, Commands> implements OnOffControlAdv.Interface {
	public readonly commands = {};
	static nodeDefId = "OnOffControl_ADV";
	declare readonly nodeDefId: "OnOffControl_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property as DriverState, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	public get status(): Insteon.OnLevelRelay {
		return this.drivers.ST?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(OnOffControlAdvNode);

export namespace OnOffControlAdv {
	export interface Interface extends Omit<InstanceType<typeof OnOffControlAdvNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: "OnOffControl_ADV";
	}
	export function is(node: ISYNode<any, any, any, any>): node is OnOffControlAdvNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new OnOffControlAdvNode(isy, nodeInfo);
	}
	export const Node = OnOffControlAdvNode;
	export type Commands = {};
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
