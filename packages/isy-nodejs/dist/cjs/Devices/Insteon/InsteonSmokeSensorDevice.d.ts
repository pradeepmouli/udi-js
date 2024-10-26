import { ISY } from '../../ISY.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export declare class InsteonSmokeSensorDevice extends InsteonBaseDevice {
    constructor(isy: ISY, deviceNode: NodeInfo);
    get smokeDetected(): boolean;
}
//# sourceMappingURL=InsteonSmokeSensorDevice.d.ts.map