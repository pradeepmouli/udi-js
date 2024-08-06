"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZWaveDimmerSwitchDevice = void 0;
const ISYDevice_js_1 = require("../ISYDevice.js");
const ZWaveBaseDevice_js_1 = require("./ZWaveBaseDevice.js");
require("winston");
class ZWaveDimmerSwitchDevice extends (0, ISYDevice_js_1.ISYUpdateableLevelDevice)(ZWaveBaseDevice_js_1.ZWaveBaseDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.ZWaveDimmerSwitchDevice = ZWaveDimmerSwitchDevice;
