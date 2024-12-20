import 'winston';
import { Family } from '../../Definitions/Global/Families.js';
import { DynamicNode } from '../DynamicNode.js';
// import { InsteonNLS } from './insteonfam'
export class ZigBeeBase extends DynamicNode {
    static family = Family.ZigBee;
    async getNodeDef(nodeDefId) {
        return (await this.isy.sendRequest(`zmatter/zb/node/${this.address}/def/get`, { trailingSlash: false })).nodeDef;
    }
}
//# sourceMappingURL=ZigBeeBase.js.map