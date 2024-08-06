import { ISYBinaryStateDevice } from '../ISYDevice.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export class InsteonCOSensorDevice extends ISYBinaryStateDevice(InsteonBaseDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    get monoxideDetected() {
        return this.state;
    }
}
//# sourceMappingURL=InsteonCOSensorDevice.js.map