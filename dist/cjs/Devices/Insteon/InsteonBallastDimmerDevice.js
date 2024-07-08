"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonBallastDimmerDevice = void 0;
const InsteonDimmableDevice_js_1 = require("./InsteonDimmableDevice.js");
require("winston");
class InsteonBallastDimmerDevice extends InsteonDimmableDevice_js_1.InsteonDimmableDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.InsteonBallastDimmerDevice = InsteonBallastDimmerDevice;
