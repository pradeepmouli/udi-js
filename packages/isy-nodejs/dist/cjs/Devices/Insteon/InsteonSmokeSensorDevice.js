"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonSmokeSensorDevice = void 0;
const InsteonBaseDevice_js_1 = require("./InsteonBaseDevice.js");
require("winston");
class InsteonSmokeSensorDevice extends InsteonBaseDevice_js_1.InsteonBaseDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    get smokeDetected() {
        return this.drivers.ST.value > 0;
    }
}
exports.InsteonSmokeSensorDevice = InsteonSmokeSensorDevice;
//# sourceMappingURL=InsteonSmokeSensorDevice.js.map