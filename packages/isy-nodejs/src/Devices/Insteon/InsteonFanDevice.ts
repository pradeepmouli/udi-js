import { Family } from '../../Definitions/Global/Families.js';
import { ISY } from '../../ISY.js';
import { States } from '../../ISYConstants.js';

import 'winston';
import { Command, Driver, UnitOfMeasure } from '../../Definitions/index.js';
import type { DriverState } from '../../Model/DriverState.js';
import type { NodeInfo, StaticNodeInfo } from '../../Model/NodeInfo.js';
import { Insteon } from './index.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import { InsteonDimmableDevice } from './InsteonDimmableDevice.js';

export class InsteonFanMotorDevice extends InsteonBaseDevice<Driver.Signatures<'ST'>, Command.Signatures<'DON' | 'DOF'>> {
	constructor(isy: ISY, deviceNode: StaticNodeInfo) {
		super(isy, deviceNode);
		this.drivers.ST = Driver.create('ST', this, deviceNode.property as DriverState, { uom: UnitOfMeasure.Percent, label: 'Fan Speed (%)', name: 'fanSpeed' });
		this.hidden = true;
	}

	get isOn() {
		return this.drivers.ST.value !== 0;
	}
	get fanSpeed() {
		return this.drivers.ST.value;
	}

	public async updateFanSpeed(level: number) {
		return level;
	}
	public async updateIsOn(isOn: boolean) {
		if (!isOn) {
			//return this.commands.BEEP(States.Level.Min);
		} else {
			//return this.commands.BEEP(States.Level.Max);
		}
	}
}

export class InsteonFanDevice extends InsteonBaseDevice {
	public light?: InsteonDimmableDevice;
	public motor: InsteonFanMotorDevice;
	constructor(isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
		this.light = new InsteonDimmableDevice(isy, deviceNode);
		/*this.light.events.on('PropertyChanged', ((a: any, b: any, c: any, d: string) => { this.emit('PropertyChanged', `light.${a}`, b, c, d); }).bind(this));*/
		this.addChild(this.light);
	}

	public override handleEvent(event: { control?: string; data?: any; node?: any }): boolean {
		this.logger(JSON.stringify(event));
		const child = this.children.find((p) => p.address === event.node);
		if (child !== undefined) {
			return child.handleEvent(event);
		}
		return false;
	}

	public override addChild(childDevice) {
		super.addChild(childDevice);
		if (childDevice instanceof InsteonFanMotorDevice) {
			this.logger('Fan Motor Found');
			this.motor = childDevice as InsteonFanMotorDevice;
			this.motor.events.on(
				'statusChanged',
				((a: any, b: any, c: any, d: string) => {
					this.emit('propertyChanged', `motor.${a}`, b, c, d);
				}).bind(this)
			);
		}
	}

	public async updateFanSpeed(level: number) {
		return this.motor.updateFanSpeed(level);
	}
}
