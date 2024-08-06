"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonSmokeSensorDevice = void 0;
const ISYDevice_js_1 = require("../ISYDevice.js");
const InsteonBaseDevice_js_1 = require("./InsteonBaseDevice.js");
require("winston");
class InsteonSmokeSensorDevice extends (0, ISYDevice_js_1.ISYBinaryStateDevice)(InsteonBaseDevice_js_1.InsteonBaseDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    get smokeDetected() {
        return this.state;
    }
}
exports.InsteonSmokeSensorDevice = InsteonSmokeSensorDevice;
//# sourceMappingURL=InsteonSmokeSensorDevice.js.map