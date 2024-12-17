/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = MatterBridge.Commands.Type;
type Drivers = MatterBridge.Drivers.Type;

class MatterBridgeNode extends Base<Drivers, Commands> implements MatterBridge.Interface {
	public override readonly commands = {
		DISCOVER: this.discover,
		QUERY: this.query,
		START_BRIDGE: this.startBridge,
		STOP_BRIDGE: this.stopBridge
	};
	static override nodeDefId = "CONTROLLER";
	static override implements = ['CONTROLLER'];
	declare readonly nodeDefId: 'CONTROLLER';
	constructor (isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Unknown, label: "Status", name: "status" });
	}
	async discover() { return this.sendCommand("DISCOVER"); }
	async query() { return this.sendCommand("QUERY"); }
	async startBridge() { return this.sendCommand("START_BRIDGE"); }
	async stopBridge() { return this.sendCommand("STOP_BRIDGE"); }
	public get status(): {
        
return this.drivers.ST?.value;
    }
}

NodeFactory.register(MatterBridgeNode);

export namespace MatterBridge {
	export interface Interface extends Omit<InstanceType<typeof MatterBridgeNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is MatterBridgeNode {
		return ['CONTROLLER'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is MatterBridgeNode {
		return ['CONTROLLER'].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new MatterBridgeNode(isy, nodeInfo);
	}
	export const Node = MatterBridgeNode;
	export const Class = MatterBridgeNode;
	export namespace Commands {
		export type Type = {
			DISCOVER: (() => Promise<boolean>) & {
				label: "Discover";
				name: "discover";
			};
			QUERY: (() => Promise<boolean>) & {
				label: "Query";
				name: "query";
			};
			START_BRIDGE: (() => Promise<boolean>) & {
				label: "Start Bridge";
				name: "startBridge";
			};
			STOP_BRIDGE: (() => Promise<boolean>) & {
				label: "Stop Bridge";
				name: "stopBridge";
			};
		};
	}
	export enum Commands {
		discover = 'DISCOVER',
		query = 'QUERY',
		startBridge = 'START_BRIDGE',
		stopBridge = 'STOP_BRIDGE'
	}
	export namespace Drivers {
		export type Type = {
			ST: {
				uom: ;
				value: ;
				label: "Status";
				name: "status";
			};
		};
	}
	export enum Drivers {
		status = 'ST'
	}
}
