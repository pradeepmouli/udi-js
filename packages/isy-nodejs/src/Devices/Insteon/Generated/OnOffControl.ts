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

const nodeDefId = "OnOffControl";

type Commands = OnOffControl.Commands;
type Drivers = OnOffControl.Drivers;

class OnOffControlNode extends Base<Drivers, Commands> implements OnOffControl.Interface {
	public override readonly commands = {};
	static override nodeDefId = "OnOffControl";
	static override implements = ['OnOffControl', "SirenAlert", "SirenArm"];
	declare readonly nodeDefId: 'OnOffControl' | "OnOffControl_ADV";
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
	}
	public get status(): Insteon.OnLevelRelay {
		return this.drivers.ST?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(OnOffControlNode);
NodeFactory.register(OnOffControlNode, "OnOffControl_ADV");

export namespace OnOffControl {
	export interface Interface extends Omit<InstanceType<typeof OnOffControlNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is OnOffControlNode {
		return ['OnOffControl', "OnOffControl_ADV"].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is OnOffControlNode {
		return ['OnOffControl', "X10", "OnOffControl_ADV"].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new OnOffControlNode(isy, nodeInfo);
	}
	export const Node = OnOffControlNode;
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
