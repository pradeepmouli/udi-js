import { ISY } from '../../ISY.js';
import { Props } from '../../ISYConstants.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import { DriverType } from '../../Definitions/Global/Drivers.js';
import 'winston';

export class InsteonThermostatDevice extends InsteonBaseDevice {
	constructor (isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
	}
	get currentTemperature() {
		return this.local.ST;
	}
	get coolSetPoint() {
		return this.local[Props.Climate.CoolSetPoint];
	}
	get heatSetPoint() {
		return this.local[Props.Climate.HeatSetPoint];
	}
	get mode() {
		return this.local[Props.Climate.Mode];
	}
	get operatingMode() {
		return this.local[Props.Climate.OperatingMode];
	}
	get fanMode() {
		return this.local[Props.Climate.FanMode];
	}
	get humidity() {
		return this.local[Props.Climate.Humidity];
	}
	public async updateCoolSetPoint(value: string) {
		return this.updateProperty(DriverType.CoolSetpoint, value);
	}
	public async updateHeatSetPoint(value: string) {
		return this.updateProperty(DriverType.HeatSetpoint, value);
	}
	public async updateMode(value: string) {
		return this.updateProperty(DriverType.ThermostatMode, value);
	}
}
