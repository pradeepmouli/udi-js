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



export class FanDevice extends CompositeDevice.of({ light: DimmerLamp, motor: FanLincMotor }, {light: 1, motor: 2}) {
	constructor(isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);


		/*this.light.events.on('PropertyChanged', ((a: any, b: any, c: any, d: string) => { this.emit('PropertyChanged', `light.${a}`, b, c, d); }).bind(this));*/
	}
}


export namespace Fan {
	export const Device = FanDevice;

	export const Class = FanDevice;

	export const Motor = FanLincMotor;

	export const Light = DimmerLamp;


}