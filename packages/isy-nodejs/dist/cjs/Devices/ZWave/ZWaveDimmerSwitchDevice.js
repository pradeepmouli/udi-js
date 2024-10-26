"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZWaveDimmerSwitchDevice = void 0;
const ZWaveBaseDevice_js_1 = require("./ZWaveBaseDevice.js");
require("winston");
class ZWaveDimmerSwitchDevice extends ZWaveBaseDevice_js_1.ZWaveBaseDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.ZWaveDimmerSwitchDevice = ZWaveDimmerSwitchDevice;
//# sourceMappingURL=ZWaveDimmerSwitchDevice.js.map