"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZWaveBaseDevice = void 0;
const Utils_js_1 = require("../../Utils.js");
const ISYDeviceNode_js_1 = require("../ISYDeviceNode.js");
require("winston");
// import { InsteonNLS } from './insteonfam'
class ZWaveBaseDevice extends ISYDeviceNode_js_1.ISYDeviceNode {
    async getNodeDef() {
        return this.isy.sendRequest(`zmatter/zwave/node/${this.address}/def/get?full=true`);
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
        return this.sendCommand;
    }
}
exports.ZWaveBaseDevice = ZWaveBaseDevice;
//# sourceMappingURL=ZWaveBaseDevice.js.map