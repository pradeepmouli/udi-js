"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonDoorWindowSensorDevice = void 0;
const InsteonBaseDevice_js_1 = require("./InsteonBaseDevice.js");
require("winston");
class InsteonDoorWindowSensorDevice extends InsteonBaseDevice_js_1.InsteonBaseDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    get isOpen() {
        return this.drivers.ST.value === 0;
    }
}
exports.InsteonDoorWindowSensorDevice = InsteonDoorWindowSensorDevice;
//# sourceMappingURL=InsteonDoorWindowSensorDevice.js.map