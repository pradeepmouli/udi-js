"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonKeypadButtonDevice = void 0;
const InsteonRelayDevice_js_1 = require("./InsteonRelayDevice.js");
require("winston");
class InsteonKeypadButtonDevice extends InsteonRelayDevice_js_1.InsteonRelayDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.InsteonKeypadButtonDevice = InsteonKeypadButtonDevice;
//# sourceMappingURL=InsteonKeypadDevice.js.map