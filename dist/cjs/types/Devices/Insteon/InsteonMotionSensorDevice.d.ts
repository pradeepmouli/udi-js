import { ISY } from '../../ISY.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export declare class InsteonMotionSensorDevice extends InsteonBaseDevice {
    private _isMotionDetected;
    constructor(isy: ISY, deviceNode: any);
    handleControlTrigger(controlName: string): boolean;
    get motionDetected(): boolean;
}
