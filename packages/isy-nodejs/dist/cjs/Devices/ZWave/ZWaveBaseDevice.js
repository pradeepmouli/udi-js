"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZWaveBaseDevice = void 0;
const Families_js_1 = require("../../Definitions/Global/Families.js");
const Utils_js_1 = require("../../Utils.js");
const ISYNode_js_1 = require("../../ISYNode.js");
require("winston");
// import { InsteonNLS } from './insteonfam'
class ZWaveBaseDevice extends ISYNode_js_1.ISYDeviceNode {
    async getNodeDef() {
        return this.isy.sendRequest(`zmatter/zwave/node/${this.address}/def/get?full=true`);
    }
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        this.family = Families_js_1.Family.ZWave;
        //// this.productName = InsteonNLS.getDeviceDescription(String.fromCharCode(category,device,version));
    }
    convertFrom(value, uom) {
        switch (uom) {
            case 101:
                return (0, Utils_js_1.byteToDegree)(value);
            case 100:
                return (0, Utils_js_1.byteToPct)(value);
            case 17:
                return value / 10;
            default:
                return super.convertFrom(value, uom);
        }
    }
    convertTo(value, uom) {
        const nuom = super.convertTo(value, uom);
        switch (uom) {
            case 101:
                return nuom * 2;
            case 100:
                return (0, Utils_js_1.pctToByte)(nuom);
            case 17:
                return Math.round(value * 10);
            default:
                return nuom;
        }
    }
    async sendBeep(level = 100) {
        return this.sendCommand('BEEP');
    }
}
exports.ZWaveBaseDevice = ZWaveBaseDevice;
//# sourceMappingURL=ZWaveBaseDevice.js.map