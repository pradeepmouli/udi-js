"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonBaseDevice = void 0;
const Families_js_1 = require("../../Definitions/Families.js");
const UOM_js_1 = require("../../Definitions/UOM.js");
const Utils_js_1 = require("../../Utils.js");
const ISYNode_js_1 = require("../../ISYNode.js");
require("winston");
// import { InsteonNLS } from './insteonfam.js'
class InsteonBaseDevice extends ISYNode_js_1.ISYDeviceNode {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        this.family = Families_js_1.Family.Insteon;
        //// this.productName = InsteonNLS.getDeviceDescription(String.fromCharCode(category,device,version));
        //his.childDevices = {};
    }
    convertFrom(value, uom, propertyName = null) {
        switch (uom) {
            case UOM_js_1.UnitOfMeasure.DegreeX2:
                return (0, Utils_js_1.byteToDegree)(value);
            case UOM_js_1.UnitOfMeasure.LevelFrom0To255:
                return (0, Utils_js_1.byteToPct)(value);
            case UOM_js_1.UnitOfMeasure.Fahrenheit:
                return value / 10;
            default:
                return super.convertFrom(value, uom);
        }
    }
    convertTo(value, uom, propertyName = null) {
        const nuom = super.convertTo(value, uom);
        switch (uom) {
            case UOM_js_1.UnitOfMeasure.DegreeX2:
                return nuom * 2;
            case UOM_js_1.UnitOfMeasure.LevelFrom0To255:
                return (0, Utils_js_1.pctToByte)(nuom);
            case UOM_js_1.UnitOfMeasure.Fahrenheit:
                return Math.round(value * 10);
            default:
                return nuom;
        }
    }
    async sendBeep(level = 100) {
        return this.sendCommand('BEEP');
    }
}
exports.InsteonBaseDevice = InsteonBaseDevice;
