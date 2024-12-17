import type { NodeInfo } from '../../Model/NodeInfo.js';
import { ISY } from '../../ISY.js';
import 'winston';
import { Pir2844OnOff } from './Generated/Pir2844OnOff.js';
export declare class InsteonMotionSensorDevice extends Pir2844OnOff.Node {
    private _isMotionDetected;
    constructor(isy: ISY, deviceNode: NodeInfo);
    handleControlTrigger(controlName: keyof Pir2844OnOff.Commands.Type): boolean;
    get motionDetected(): boolean;
}
//# sourceMappingURL=InsteonMotionSensorDevice.d.ts.map