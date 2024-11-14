/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */

import { Driver } from '../../Definitions/Global/Drivers.js';
import { Family } from '../../Definitions/Global/Families.js';
import { UnitOfMeasure } from '../../Definitions/Global/UOM.js';
import { Insteon } from '../../Definitions/index.js';
import type { ISY } from '../../ISY.js';
import type { ISYNode } from '../../ISYNode.js';
import type { DriverState } from '../../Model/DriverState.js';
import type { NodeInfo } from '../../Model/NodeInfo.js';
import { ISYDeviceNode } from '../ISYDeviceNode.js';
import { NodeFactory } from '../NodeFactory.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';

export const nodeDefId = 'RelayLampSwitch';

type Commands = RelayLampSwitch.Commands;
type Drivers = RelayLampSwitch.Drivers;

export class RelayLampSwitchNode extends InsteonBaseDevice<Drivers, Commands> implements RelayLampSwitch.Interface {
	public override readonly commands = {
		DON: this.on,
		DOF: this.off,
		DFOF: this.fastOff,
		DFON: this.fastOn,
		QUERY: this.query,
		BEEP: this.beep,
		BL: this.backlight,
		WDU: this.writeChanges
	};
	static override nodeDefId = 'RelayLampSwitch';
	declare readonly nodeDefId: 'RelayLampSwitch';
	constructor(isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);
		this.drivers.ST = Driver.create('ST', this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Boolean, label: 'Status', name: 'status' });
		this.drivers.ERR = Driver.create('ERR', this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: 'Responding', name: 'responding' });
	}
	async on(value?: 0 | 100) {
		return this.sendCommand('DON', value);
	}
	async off() {
		return this.sendCommand('DOF');
	}
	async fastOff() {
		return this.sendCommand('DFOF');
	}
	async fastOn() {
		return this.sendCommand('DFON');
	}
	async query() {
		return this.sendCommand('QUERY');
	}
	async beep(value?: number) {
		return this.sendCommand('BEEP', { value: value });
	}
	async backlight(value: number) {
		return this.sendCommand('BL', { value: value });
	}
	async writeChanges() {
		return this.sendCommand('WDU');
	}
	public get status(): boolean {
		return this.drivers.ST?.value;
	}
	public get responding(): Insteon.Error {
		return this.drivers.ERR?.value;
	}
}

NodeFactory.register(RelayLampSwitchNode);

export namespace RelayLampSwitch {
	export interface Interface extends Omit<InstanceType<typeof RelayLampSwitchNode>, keyof ISYDeviceNode<any, any, any, any>> {
		nodeDefId: 'RelayLampSwitch';
	}
	export function is(node: ISYNode<any, any, any, any>): node is RelayLampSwitchNode {
		return node.nodeDefId === nodeDefId;
	}
	export function create(isy: ISY, nodeInfo: NodeInfo) {
		return new RelayLampSwitchNode(isy, nodeInfo);
	}
	export const Node = RelayLampSwitchNode;
	export type Commands = {
		DON: ((value?: 0 | 100) => Promise<boolean>) & {
			label: 'On';
			name: 'on';
		};
		DOF: (() => Promise<boolean>) & {
			label: 'Off';
			name: 'off';
		};
		DFOF: (() => Promise<boolean>) & {
			label: 'Fast Off';
			name: 'fastOff';
		};
		DFON: (() => Promise<boolean>) & {
			label: 'Fast On';
			name: 'fastOn';
		};
		QUERY: (() => Promise<boolean>) & {
			label: 'Query';
			name: 'query';
		};
		BEEP: ((value?: number) => Promise<boolean>) & {
			label: 'Beep';
			name: 'beep';
		};
		BL: ((value: number) => Promise<boolean>) & {
			label: 'Backlight';
			name: 'backlight';
		};
		WDU: (() => Promise<boolean>) & {
			label: 'Write Changes';
			name: 'writeChanges';
		};
	};
	export type Drivers = {
		ST: {
			uom: UnitOfMeasure.Boolean;
			value: boolean;
			label: 'Status';
			name: 'status';
		};
		ERR: {
			uom: UnitOfMeasure.Index;
			value: Insteon.Error;
			label: 'Responding';
			name: 'responding';
		};
	};
}
