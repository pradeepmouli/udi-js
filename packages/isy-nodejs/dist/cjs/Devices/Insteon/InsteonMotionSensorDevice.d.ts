import type { NodeInfo } from '../../Model/NodeInfo.js';
import { ISY } from '../../ISY.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export declare class InsteonMotionSensorDevice extends InsteonBaseDevice {
    private _isMotionDetected;
    constructor(isy: ISY, deviceNode: NodeInfo);
    handleControlTrigger(controlName: string): boolean;
    get motionDetected(): boolean;
}
//# sourceMappingURL=InsteonMotionSensorDevice.d.ts.map