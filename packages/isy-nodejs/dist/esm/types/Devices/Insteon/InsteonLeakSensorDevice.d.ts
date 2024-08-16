import type { NodeInfo } from '../../Model/NodeInfo.js';
import { ISY } from '../../ISY.js';
import 'winston';
declare const InsteonLeakSensorDevice_base: any;
export declare class InsteonLeakSensorDevice extends InsteonLeakSensorDevice_base {
    constructor(isy: ISY, deviceNode: NodeInfo);
    get isDry(): any;
}
export {};
//# sourceMappingURL=InsteonLeakSensorDevice.d.ts.map