"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonRelaySwitchDevice = void 0;
const InsteonRelayDevice_js_1 = require("./InsteonRelayDevice.js");
require("winston");
class InsteonRelaySwitchDevice extends InsteonRelayDevice_js_1.InsteonRelayDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.InsteonRelaySwitchDevice = InsteonRelaySwitchDevice;
//# sourceMappingURL=InsteonRelaySwitchDevice.js.map