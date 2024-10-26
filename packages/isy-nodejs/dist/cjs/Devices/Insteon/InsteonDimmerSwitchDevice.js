"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonDimmerSwitchDevice = void 0;
const InsteonDimmableDevice_js_1 = require("./InsteonDimmableDevice.js");
require("winston");
class InsteonDimmerSwitchDevice extends InsteonDimmableDevice_js_1.InsteonDimmableDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.InsteonDimmerSwitchDevice = InsteonDimmerSwitchDevice;
//# sourceMappingURL=InsteonDimmerSwitchDevice.js.map