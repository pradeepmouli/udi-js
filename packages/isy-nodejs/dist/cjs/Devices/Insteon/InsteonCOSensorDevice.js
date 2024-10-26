"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonCOSensorDevice = void 0;
const InsteonBaseDevice_js_1 = require("./InsteonBaseDevice.js");
require("winston");
class InsteonCOSensorDevice extends InsteonBaseDevice_js_1.InsteonBaseDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    get state() {
        throw new Error('Method not implemented.');
    }
    get monoxideDetected() {
        return this.state;
    }
}
exports.InsteonCOSensorDevice = InsteonCOSensorDevice;
//# sourceMappingURL=InsteonCOSensorDevice.js.map