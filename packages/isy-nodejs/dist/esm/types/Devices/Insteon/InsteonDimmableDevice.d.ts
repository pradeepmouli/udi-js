import { ISY } from '../../ISY.js';
import { MapsTo } from '../MapsTo.js';
import { EndpointFor } from '../EndpointFor.js';
import type { DimmableLightRequirements } from '@project-chip/matter.js/devices/DimmableLightDevice';
import { OnOffBehavior as OOB } from '@project-chip/matter.js/behaviors/on-off';
import 'winston';
import type { NodeInfo } from '../../Model/NodeInfo.js';
type LevelControlBehavior = typeof DimmableLightRequirements.LevelControlServer;
type OnOffBehavior = typeof OOB;
declare const InsteonDimmableDevice_base: any;
export declare class InsteonDimmableDevice extends InsteonDimmableDevice_base implements MapsTo<LevelControlBehavior, OnOffBehavior> {
    constructor(isy: ISY, node: NodeInfo);
    get brightnessLevel(): any;
    updateBrightnessLevel(level: number): Promise<{}>;
    initialize(endpoint: EndpointFor<LevelControlBehavior, OnOffBehavior>): Promise<void>;
}
export {};
//# sourceMappingURL=InsteonDimmableDevice.d.ts.map