import { Props } from '../../ISYConstants.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export class InsteonThermostatDevice extends InsteonBaseDevice {
    constructor(isy, deviceNode) {
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
    async updateCoolSetPoint(value) {
        return this.updateProperty(Props.Climate.CoolSetPoint, value);
    }
    async updateHeatSetPoint(value) {
        return this.updateProperty(Props.Climate.HeatSetPoint, value);
    }
    async updateMode(value) {
        return this.updateProperty(Props.Climate.Mode, value);
    }
}
