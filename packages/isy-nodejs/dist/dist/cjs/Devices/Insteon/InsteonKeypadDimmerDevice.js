"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonKeypadDimmerDevice = void 0;
const InsteonDevice_js_1 = require("./InsteonDevice.js");
const InsteonDimmableDevice_js_1 = require("./InsteonDimmableDevice.js");
require("winston");
class InsteonKeypadDimmerDevice extends (0, InsteonDevice_js_1.KeypadDevice)(InsteonDimmableDevice_js_1.InsteonDimmableDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.InsteonKeypadDimmerDevice = InsteonKeypadDimmerDevice;
