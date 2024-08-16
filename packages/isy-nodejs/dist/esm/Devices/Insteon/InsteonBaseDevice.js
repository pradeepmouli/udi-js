import { Family } from '../../Definitions/Global/Families.js';
import { UnitOfMeasure as UOM } from '../../Definitions/Global/UOM.js';
import { byteToDegree, pctToByte } from '../../Utils.js';
import { ISYDeviceNode } from '../ISYDeviceNode.js';
import 'winston';
import { Converters } from '../../Converters.js';
// import { InsteonNLS } from './insteonfam.js'
export class InsteonBaseDevice extends ISYDeviceNode {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        this.family = Family.Insteon;
        //// this.productName = InsteonNLS.getDeviceDescription(String.fromCharCode(category,device,version));
        //his.childDevices = {};
    }
    convertFrom(value, uom, driver = null) {
        switch (uom) {
            case UOM.DegreeX2:
                return byteToDegree(value);
            case UOM.LevelFrom0To255:
                return Converters.Standard.LevelFrom0To255.Percent.to(value);
            case UOM.Fahrenheit:
                return value / 10;
            default:
                return super.convertFrom(value, uom);
        }
    }
    convertTo(value, uom, propertyName = null) {
        const nuom = super.convertTo(value, uom);
        switch (uom) {
            case UOM.DegreeX2:
                return nuom * 2;
            case UOM.LevelFrom0To255:
                return pctToByte(nuom);
            case UOM.Fahrenheit:
                return Math.round(value * 10);
            default:
                return nuom;
        }
    }
    async sendBeep(level = 100) {
        // this.drivers(level);
    }
}
//# sourceMappingURL=InsteonBaseDevice.js.map