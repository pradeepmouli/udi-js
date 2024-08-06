import { ISYBinaryStateDevice } from '../ISYDevice.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export class InsteonLeakSensorDevice extends ISYBinaryStateDevice(InsteonBaseDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    get isDry() {
        return this.state;
    }
}
//# sourceMappingURL=InsteonLeakSensorDevice.js.map