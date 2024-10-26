"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonKeypadDimmerDevice = void 0;
const InsteonDimmableDevice_js_1 = require("./InsteonDimmableDevice.js");
require("winston");
class InsteonKeypadDimmerDevice extends InsteonDimmableDevice_js_1.InsteonDimmableDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.InsteonKeypadDimmerDevice = InsteonKeypadDimmerDevice;
//# sourceMappingURL=InsteonKeypadDimmerDevice.js.map