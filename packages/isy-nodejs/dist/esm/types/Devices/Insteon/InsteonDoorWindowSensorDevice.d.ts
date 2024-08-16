import type { NodeInfo } from '../../Model/NodeInfo.js';
import { ISY } from '../../ISY.js';
import 'winston';
declare const InsteonDoorWindowSensorDevice_base: any;
export declare class InsteonDoorWindowSensorDevice extends InsteonDoorWindowSensorDevice_base {
    constructor(isy: ISY, deviceNode: NodeInfo);
    get isOpen(): any;
}
export {};
//# sourceMappingURL=InsteonDoorWindowSensorDevice.d.ts.map