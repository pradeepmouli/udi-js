import { ISY, type Family } from '../../ISY.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import 'winston';
import { RelayLampSwitch } from './Generated/RelayLampSwitch.js';
export declare class InsteonRelayDevice extends RelayLampSwitch.Node {
    constructor(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>);
}
//# sourceMappingURL=InsteonRelayDevice.d.ts.map