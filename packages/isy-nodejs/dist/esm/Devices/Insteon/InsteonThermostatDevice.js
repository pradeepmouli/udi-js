import { Props } from '../../ISYConstants.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export class InsteonThermostatDevice extends InsteonBaseDevice {
    constructor(isy, deviceNode) {
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
}
//# sourceMappingURL=InsteonThermostatDevice.js.map