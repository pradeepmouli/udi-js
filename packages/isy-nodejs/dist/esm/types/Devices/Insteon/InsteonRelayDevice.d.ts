import { ISY } from '../../ISY.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import { EndpointFor } from '../EndpointFor.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import type { OnOffBehavior } from '@project-chip/matter.js/behaviors/on-off';
import 'winston';
import type { Command } from '../../Definitions/Global/Commands.js';
import { Driver } from '../../Definitions/Global/Drivers.js';
export declare class InsteonRelayDevice extends InsteonBaseDevice<Driver.Signatures<'ST' | 'OL' | 'RR'>, Command.Signatures<'DON' | 'DOF'>> {
    constructor(isy: ISY, nodeInfo: NodeInfo);
    initialize(endpoint: EndpointFor<typeof OnOffBehavior>): Promise<void>;
    sendBeep(level?: number): Promise<any>;
}
//# sourceMappingURL=InsteonRelayDevice.d.ts.map