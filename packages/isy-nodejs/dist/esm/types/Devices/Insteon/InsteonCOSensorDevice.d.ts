import { CompositeDevice, ISY } from '../../ISY.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import 'winston';
declare const InsteonCOSensorDevice_base: import("type-fest").Constructor<CompositeDevice<import("../../ISY.js").Family, {
    [x: string]: import("../../ISYNode.js").ISYNode.Factory<import("../../ISY.js").Family, any>;
}, import("../../ISYNode.js").ISYNode.Factory<import("../../ISY.js").Family, any>>>;
export declare class InsteonCOSensorDevice extends InsteonCOSensorDevice_base {
    constructor(isy: ISY, deviceNode: NodeInfo);
}
export {};
//# sourceMappingURL=InsteonCOSensorDevice.d.ts.map