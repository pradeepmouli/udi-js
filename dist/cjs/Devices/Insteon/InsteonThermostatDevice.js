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
    get currentTemperature() {
        return this.local.ST;
    }
    get coolSetPoint() {
        return this.local[ISYConstants_js_1.Props.Climate.CoolSetPoint];
    }
    get heatSetPoint() {
        return this.local[ISYConstants_js_1.Props.Climate.HeatSetPoint];
    }
    get mode() {
        return this.local[ISYConstants_js_1.Props.Climate.Mode];
    }
    get operatingMode() {
        return this.local[ISYConstants_js_1.Props.Climate.OperatingMode];
    }
    get fanMode() {
        return this.local[ISYConstants_js_1.Props.Climate.FanMode];
    }
    get humidity() {
        return this.local[ISYConstants_js_1.Props.Climate.Humidity];
    }
    async updateCoolSetPoint(value) {
        return this.updateProperty(ISYConstants_js_1.Props.Climate.CoolSetPoint, value);
    }
    async updateHeatSetPoint(value) {
        return this.updateProperty(ISYConstants_js_1.Props.Climate.HeatSetPoint, value);
    }
    async updateMode(value) {
        return this.updateProperty(ISYConstants_js_1.Props.Climate.Mode, value);
    }
}
exports.InsteonThermostatDevice = InsteonThermostatDevice;
