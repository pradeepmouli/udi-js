import { ISY } from '../../ISY.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import 'winston';
import { RelayLampSwitch } from './RelayLampSwitch.js';
export declare class InsteonRelayDevice extends RelayLampSwitch.Node {
    constructor(isy: ISY, nodeInfo: NodeInfo);
    sendBeep(level?: number): Promise<any>;
}
//# sourceMappingURL=InsteonRelayDevice.d.ts.map