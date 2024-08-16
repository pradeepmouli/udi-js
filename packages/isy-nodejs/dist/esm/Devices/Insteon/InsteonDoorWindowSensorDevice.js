import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export class InsteonDoorWindowSensorDevice extends ISYBinaryStateDevice(InsteonBaseDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    get isOpen() {
        return this.state;
    }
}
//# sourceMappingURL=InsteonDoorWindowSensorDevice.js.map