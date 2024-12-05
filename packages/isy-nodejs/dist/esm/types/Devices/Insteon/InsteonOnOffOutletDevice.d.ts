import 'winston';
import { ISY } from '../../ISY.js';
import type { NodeInfo } from '../../Model/NodeInfo.js';
import { CompositeDevice } from '../CompositeDevice.js';
declare const OnOffOutlet_base: import("type-fest").Constructor<CompositeDevice<import("../../Definitions/index.js").Family, {
    [x: string]: import("../ISYDeviceNode.js").ISYDeviceNode<any, any, any, any>;
}, import("../ISYDeviceNode.js").ISYDeviceNode<any, any, any, any>>>;
export declare class OnOffOutlet extends OnOffOutlet_base {
    constructor(isy: ISY, deviceNode: NodeInfo);
}
export {};
//# sourceMappingURL=InsteonOnOffOutletDevice.d.ts.map