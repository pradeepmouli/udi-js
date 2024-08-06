"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonKeypadRelayDevice = void 0;
const InsteonDevice_js_1 = require("./InsteonDevice.js");
const InsteonRelayDevice_js_1 = require("./InsteonRelayDevice.js");
require("winston");
class InsteonKeypadRelayDevice extends (0, InsteonDevice_js_1.KeypadDevice)(InsteonRelayDevice_js_1.InsteonRelayDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.InsteonKeypadRelayDevice = InsteonKeypadRelayDevice;
//# sourceMappingURL=InsteonKeypadRelayDevice.js.map