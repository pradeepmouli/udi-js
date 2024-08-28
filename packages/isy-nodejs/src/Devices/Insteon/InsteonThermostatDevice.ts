import { ISY } from '../../ISY.js';
import { Props } from '../../ISYConstants.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import { Driver } from '../../Definitions/Global/Drivers.js';
import 'winston';

export class InsteonThermostatDevice extends InsteonBaseDevice< Driver.Signatures<'CLISPH' | 'CLISPC' | 'CLIMD' | 'CLIHUM' | 'CLIFS' | 'CLIFSH' | 'CLIFC' | 'CLITEMP' | 'CLISMD' | 'CLISFAN' | 'CLISMD' | 'CLISFAN' | 'CLISMD' | 'CLISFAN' | 'CLISMD' | 'CLISFAN'>> {
	constructor (isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
	}
	// get currentTemperature() {
	// 	return this.drivers.ST;
	// }
	get coolSetPoint() {
		return this.drivers[Props.Climate.CoolSetPoint];
	}
	get heatSetPoint() {
		return this.drivers[Props.Climate.HeatSetPoint];
	}
	get mode() {
		return this.drivers[Props.Climate.Mode];
	}
	get operatingMode() {
		return this.drivers[Props.Climate.OperatingMode];
	}
	get fanMode() {
		return this.drivers[Props.Climate.FanMode];
	}
	get humidity() {
		return this.drivers[Props.Climate.Humidity];
	}
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
