"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonKeypadRelayDevice = void 0;
const InsteonRelayDevice_js_1 = require("./InsteonRelayDevice.js");
require("winston");
class InsteonKeypadRelayDevice extends InsteonRelayDevice_js_1.InsteonRelayDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.InsteonKeypadRelayDevice = InsteonKeypadRelayDevice;
//# sourceMappingURL=InsteonKeypadRelayDevice.js.map