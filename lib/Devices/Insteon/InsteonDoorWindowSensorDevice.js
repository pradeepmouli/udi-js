"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonDoorWindowSensorDevice = void 0;
const ISYDevice_1 = require("../ISYDevice");
const InsteonBaseDevice_1 = require("./InsteonBaseDevice");
class InsteonDoorWindowSensorDevice extends (0, ISYDevice_1.ISYBinaryStateDevice)(InsteonBaseDevice_1.InsteonBaseDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    get isOpen() {
        return this.state;
    }
}
exports.InsteonDoorWindowSensorDevice = InsteonDoorWindowSensorDevice;
