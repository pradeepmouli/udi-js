"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonOutletDevice = exports.KeypadDevice = exports.InsteonSwitchDevice = exports.InsteonLampDevice = void 0;
const InsteonRelayDevice_js_1 = require("./InsteonRelayDevice.js");
require("winston");
const InsteonLampDevice = (IB) => (class extends IB {
    constructor(...args) {
        super(args[0], args[1]);
        this.isDimmable = true;
    }
});
exports.InsteonLampDevice = InsteonLampDevice;
// tslint:disable-next-line: variable-name
const InsteonSwitchDevice = (IB) => (class extends IB {
    constructor(...args) {
        super(args[0], args[1]);
        this.isDimmable = true;
    }
});
exports.InsteonSwitchDevice = InsteonSwitchDevice;
const KeypadDevice = (IB) => (class extends IB {
    addChild(childDevice) {
        super.addChild(childDevice);
    }
});
exports.KeypadDevice = KeypadDevice;
class InsteonOutletDevice extends InsteonRelayDevice_js_1.InsteonRelayDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
exports.InsteonOutletDevice = InsteonOutletDevice;
//# sourceMappingURL=InsteonDevice.js.map