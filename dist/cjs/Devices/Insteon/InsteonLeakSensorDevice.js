"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonLeakSensorDevice = void 0;
const ISYDevice_js_1 = require("../ISYDevice.js");
const InsteonBaseDevice_js_1 = require("./InsteonBaseDevice.js");
require("winston");
class InsteonLeakSensorDevice extends (0, ISYDevice_js_1.ISYBinaryStateDevice)(InsteonBaseDevice_js_1.InsteonBaseDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    get isDry() {
        return this.state;
    }
}
exports.InsteonLeakSensorDevice = InsteonLeakSensorDevice;
