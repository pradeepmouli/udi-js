import 'winston';
import { DynamicNode } from '../DynamicNode.js';
// import { InsteonNLS } from './insteonfam'
export class ZigBeeBaseDevice extends DynamicNode {
    async getNodeDef() {
        return this.isy.sendRequest(`zmatter/zb/node/${this.address}/def/get?full=true`);
    }
}
//# sourceMappingURL=ZWaveBaseDevice.js.map