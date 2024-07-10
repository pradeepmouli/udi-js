"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonDimmerSwitchDevice = void 0;
const InsteonDevice_js_1 = require("./InsteonDevice.js");
const InsteonDimmableDevice_js_1 = require("./InsteonDimmableDevice.js");
require("winston");
class InsteonDimmerSwitchDevice extends (0, InsteonDevice_js_1.InsteonSwitchDevice)(InsteonDimmableDevice_js_1.InsteonDimmableDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.InsteonDimmerSwitchDevice = InsteonDimmerSwitchDevice;
