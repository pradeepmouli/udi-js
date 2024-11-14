"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonKeypadButtonDevice = void 0;
require("winston");
const KeypadButton_js_1 = require("./KeypadButton.js");
class InsteonKeypadButtonDevice extends KeypadButton_js_1.KeypadButton.Node {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.InsteonKeypadButtonDevice = InsteonKeypadButtonDevice;
//# sourceMappingURL=InsteonKeypadDevice.js.map