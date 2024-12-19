import 'winston';
import { Family } from '../../Definitions/Global/Families.js';
import { byteToDegree, byteToPct, pctToByte } from '../../Utils.js';
import { DynamicNode } from '../DynamicNode.js';
// import { InsteonNLS } from './insteonfam'
export class ZWaveBase extends DynamicNode {
    static family = Family.ZWave;
    async getNodeDef(nodeDefId) {
        return this.isy.sendRequest(`zmatter/zwave/node/${this.address}/def/get`, { trailingSlash: false });
    }
    convertFrom(value, uom) {
        switch (uom) {
            case 101:
                return byteToDegree(value);
            case 100:
                return byteToPct(value);
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
                return pctToByte(nuom);
            case 17:
                return Math.round(value * 10);
            default:
                return nuom;
        }
    }
}
//# sourceMappingURL=ZWaveBase.js.map