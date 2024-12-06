import { Family } from '../../Definitions/Global/Families.js';
import { ISY } from '../../ISY.js';

import 'winston';
import { Command, Driver, UnitOfMeasure } from '../../Definitions/index.js';
import type { DriverState } from '../../Model/DriverState.js';
import type { NodeInfo, StaticNodeInfo } from '../../Model/NodeInfo.js';
import { CompositeDevice, CompositeOf } from '../CompositeDevice.js';
import { DimmerLamp } from './Generated/DimmerLamp.js';
import { FanLincMotor } from './Generated/FanLincMotor.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import { InsteonDimmableDevice } from './InsteonDimmableDevice.js';

export class InsteonFanMotorDevice extends FanLincMotor.Node {
	constructor(isy: ISY, deviceNode: StaticNodeInfo) {
		super(isy, deviceNode);
		//*this.drivers. == Driver.create('ST', this, deviceNode.property as DriverState, { uom: UnitOfMeasure.Percent, label: 'Fan Speed (%)', name: 'fanSpeed' });
		this.hidden = true;

	}

	get isOn() {
		return this.status !== 0;
	}
	get fanSpeed() {
		return this.status;
	}

	public async updateFanSpeed(level: number) {
		return this.on(level);
	}
	public async updateIsOn(isOn: boolean) {
		if (!isOn) {
			//return this.commands.BEEP(States.Level.Min);
		} else {
			//return this.commands.BEEP(States.Level.Max);
		}
	}
}

export class FanDevice extends CompositeDevice.of({ light: DimmerLamp.Node, motor: FanLincMotor.Node }, {light: 1, motor: 2}) {
	constructor(isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);


		/*this.light.events.on('PropertyChanged', ((a: any, b: any, c: any, d: string) => { this.emit('PropertyChanged', `light.${a}`, b, c, d); }).bind(this));*/
	}
}


export namespace Fan {
	export const Device = FanDevice;

	export const Motor = FanLincMotor;

	export const Light = DimmerLamp;


}