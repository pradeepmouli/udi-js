import { ISY } from '../../ISY.js';
import { ISYBinaryStateDevice } from '../ISYDevice.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export declare class InsteonCOSensorDevice extends InsteonBaseDevice<{}, {}> implements ISYBinaryStateDevice {
    constructor(isy: ISY, deviceNode: NodeInfo);
    get state(): Promise<boolean>;
    get monoxideDetected(): Promise<boolean>;
}
//# sourceMappingURL=InsteonCOSensorDevice.d.ts.map