import type { NodeInfo } from '../../Model/NodeInfo.js';
import { ISY } from '../../ISY.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export declare class InsteonDoorWindowSensorDevice extends InsteonBaseDevice {
    constructor(isy: ISY, deviceNode: NodeInfo);
    get isOpen(): boolean;
}
//# sourceMappingURL=InsteonDoorWindowSensorDevice.d.ts.map