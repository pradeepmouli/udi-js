"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonLeakSensorDevice = void 0;
const InsteonBaseDevice_js_1 = require("./InsteonBaseDevice.js");
require("winston");
class InsteonLeakSensorDevice extends InsteonBaseDevice_js_1.InsteonBaseDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    get isDry() {
        return this.drivers.ST;
    }
}
exports.InsteonLeakSensorDevice = InsteonLeakSensorDevice;
//# sourceMappingURL=InsteonLeakSensorDevice.js.map