"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonDoorWindowSensorDevice = void 0;
const ISYDevice_js_1 = require("../ISYDevice.js");
const InsteonBaseDevice_js_1 = require("./InsteonBaseDevice.js");
require("winston");
class InsteonDoorWindowSensorDevice extends (0, ISYDevice_js_1.ISYBinaryStateDevice)(InsteonBaseDevice_js_1.InsteonBaseDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    get isOpen() {
        return this.state;
    }
}
exports.InsteonDoorWindowSensorDevice = InsteonDoorWindowSensorDevice;
//# sourceMappingURL=InsteonDoorWindowSensorDevice.js.map