"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonThermostatDevice = void 0;
const ISYConstants_js_1 = require("../../ISYConstants.js");
const InsteonBaseDevice_js_1 = require("./InsteonBaseDevice.js");
require("winston");
class InsteonThermostatDevice extends InsteonBaseDevice_js_1.InsteonBaseDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    // get currentTemperature() {
    // 	return this.drivers.ST;
    // }
    get coolSetPoint() {
        return this.drivers[ISYConstants_js_1.Props.Climate.CoolSetPoint];
    }
    get heatSetPoint() {
        return this.drivers[ISYConstants_js_1.Props.Climate.HeatSetPoint];
    }
    get mode() {
        return this.drivers[ISYConstants_js_1.Props.Climate.Mode];
    }
    get operatingMode() {
        return this.drivers[ISYConstants_js_1.Props.Climate.OperatingMode];
    }
    get fanMode() {
        return this.drivers[ISYConstants_js_1.Props.Climate.FanMode];
    }
    get humidity() {
        return this.drivers[ISYConstants_js_1.Props.Climate.Humidity];
    }
}
exports.InsteonThermostatDevice = InsteonThermostatDevice;
//# sourceMappingURL=InsteonThermostatDevice.js.map