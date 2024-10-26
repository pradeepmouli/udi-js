"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonBaseDevice = void 0;
const Families_js_1 = require("../../Definitions/Global/Families.js");
const UOM_js_1 = require("../../Definitions/Global/UOM.js");
const Utils_js_1 = require("../../Utils.js");
const ISYDeviceNode_js_1 = require("../ISYDeviceNode.js");
require("winston");
const Converters_js_1 = require("../../Converters.js");
// import { InsteonNLS } from './insteonfam.js'
class InsteonBaseDevice extends ISYDeviceNode_js_1.ISYDeviceNode {
    // #region Constructors (1)
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        this.family = Families_js_1.Family.Insteon;
        //// this.productName = InsteonNLS.getDeviceDescription(String.fromCharCode(category,device,version));
        //his.childDevices = {};
    }
    // #endregion Constructors (1)
    // #region Public Methods (3)
    convertFrom(value, uom, driver = null) {
        switch (uom) {
            case UOM_js_1.UnitOfMeasure.DegreeX2:
                return (0, Utils_js_1.byteToDegree)(value);
            case UOM_js_1.UnitOfMeasure.LevelFrom0To255:
                return Converters_js_1.Converters.Standard.LevelFrom0To255.Percent.to(value);
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
        // this.drivers(level);
    }
}
exports.InsteonBaseDevice = InsteonBaseDevice;
//# sourceMappingURL=InsteonBaseDevice.js.map