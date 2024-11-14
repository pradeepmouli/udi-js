import { ISY } from '../../ISY.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import { EndpointFor } from '../EndpointFor.js';
import type { OnOffBehavior } from '@project-chip/matter.js/behaviors/on-off';
import 'winston';
import { RelayLampSwitch } from './RelayLampSwitch.js';
export declare class InsteonRelayDevice extends RelayLampSwitch.Node {
    constructor(isy: ISY, nodeInfo: NodeInfo);
    initialize(endpoint: EndpointFor<typeof OnOffBehavior>): Promise<void>;
    sendBeep(level?: number): Promise<any>;
}
//# sourceMappingURL=InsteonRelayDevice.d.ts.map