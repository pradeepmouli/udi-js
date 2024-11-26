import { ISY } from '../../ISY.js';

import { NodeInfo } from '../../Model/NodeInfo.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import { Driver } from '../../Definitions/Global/Drivers.js';
import 'winston';
import { Thermostat } from './Generated/Thermostat.js';

export class InsteonThermostatDevice extends Thermostat.Node {
	constructor (isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
	}
	// get currentTemperature() {
	// 	return this.drivers.ST;
	// }
	// public async updateCoolSetPoint(value: string) {
	// 	return this.updateProperty(DriverType.CoolSetpoint, value);
	// }
	// public async updateHeatSetPoint(value: string) {
	// 	return this.updateProperty(DriverType.HeatSetpoint, value);
	// }
	// public async updateMode(value: string) {
	// 	return this.updateProperty(DriverType.ThermostatMode, value);
	// }
}
