"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonDimmerOutletDevice = void 0;
const InsteonDimmableDevice_js_1 = require("./InsteonDimmableDevice.js");
class InsteonDimmerOutletDevice extends InsteonDimmableDevice_js_1.InsteonDimmableDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.InsteonDimmerOutletDevice = InsteonDimmerOutletDevice;
