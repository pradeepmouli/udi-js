/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";

type Commands = Relay.Commands.Type;
type Drivers = Relay.Drivers.Type;

class RelayNode extends Base<Drivers, Commands> implements Relay.Interface {
	public override readonly commands = {
		DON: this.on,
		DOF: this.off,
		QUERY: this.query,
		ADRPST: this.adr
	};
	static override nodeDefId = "RelayLoadControl";
	static override implements = ['RelayLoadControl'];
	declare readonly nodeDefId: 'RelayLoadControl';
	constructor (isy: ISY, nodeInfo: NodeInfo<Family.ZigBeeLegacy>) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Unknown, label: "Status", name: "status" });
		this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Unknown, label: "Responding", name: "responding" });
	}
	async on() { return this.sendCommand("DON"); }
	async off() { return this.sendCommand("DOF"); }
	async query() { return this.sendCommand("QUERY"); }
	async adr(value: ) { return this.sendCommand("ADRPST", value); }
	public get status(): {
        
return this.drivers.ST?.value;
    }
    public 
get responding(): 
{
	return this.drivers.ERR?.value;
}
}

NodeFactory.register(RelayNode);

export namespace Relay {
	export interface Interface extends Omit<InstanceType<typeof RelayNode>, keyof ISYDeviceNode<any, any, any, any>> {
	}
	export function is(node: ISYNode<any, any, any, any>): node is RelayNode {
		return ['RelayLoadControl'].includes(node.nodeDefId);
	}
	export function isImplementedBy(node: ISYNode<any, any, any, any>): node is RelayNode {
		return ['RelayLoadControl'].includes(node.nodeDefId);
	}
	export function create(isy: ISY, nodeInfo: NodeInfo<Family.ZigBeeLegacy>) {
		return new RelayNode(isy, nodeInfo);
	}
	export const Node = RelayNode;
	export const Class = RelayNode;
	export namespace Commands {
		export type Type = {
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
	}
	export enum Commands {
		on = 'DON',
		off = 'DOF',
		query = 'QUERY',
		adr = 'ADRPST'
	}
	export namespace Drivers {
		export type Type = {
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
	export enum Drivers {
		status = 'ST',
		responding = 'ERR'
	}
}
