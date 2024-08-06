"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonOnOffOutletDevice = void 0;
const InsteonRelayDevice_js_1 = require("./InsteonRelayDevice.js");
require("winston");
class InsteonOnOffOutletDevice extends InsteonRelayDevice_js_1.InsteonRelayDevice {
    outlet1;
    outlet2;
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        this.outlet1 = new InsteonRelayDevice_js_1.InsteonRelayDevice(isy, deviceNode);
        this.outlet1.on('PropertyChanged', (p, v, f) => this.handlePropertyChange("outlet1." + p, v, f));
        super.addChild(this.outlet1);
    }
    addChild(childDevice) {
        super.addChild(childDevice);
        this.outlet2 = childDevice;
        this.outlet2.on('PropertyChanged', (p, v, f) => this.handlePropertyChange("outlet2." + p, v, f));
        // if(childDevice)
    }
}
exports.InsteonOnOffOutletDevice = InsteonOnOffOutletDevice;
//# sourceMappingURL=InsteonOnOffOutletDevice.js.map