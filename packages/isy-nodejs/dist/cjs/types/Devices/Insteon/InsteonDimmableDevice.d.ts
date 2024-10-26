import { ISY } from '../../ISY.js';
import { MapsTo } from '../MapsTo.js';
import { EndpointFor } from '../EndpointFor.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import type { DimmableLightRequirements } from '@project-chip/matter.js/devices/DimmableLightDevice';
import { OnOffBehavior as OOB } from '@project-chip/matter.js/behaviors/on-off';
import 'winston';
import type { NodeInfo } from '../../Model/NodeInfo.js';
type LevelControlBehavior = typeof DimmableLightRequirements.LevelControlServer;
type OnOffBehavior = typeof OOB;
export declare class InsteonDimmableDevice extends InsteonRelayDevice implements MapsTo<LevelControlBehavior, OnOffBehavior> {
    constructor(isy: ISY, node: NodeInfo);
    initialize(endpoint: EndpointFor<LevelControlBehavior, OnOffBehavior>): Promise<void>;
}
export {};
//# sourceMappingURL=InsteonDimmableDevice.d.ts.map