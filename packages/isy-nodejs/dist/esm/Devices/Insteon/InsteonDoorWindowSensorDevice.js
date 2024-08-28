import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export class InsteonDoorWindowSensorDevice extends InsteonBaseDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    get isOpen() {
        return this.drivers.ST.value === '0';
    }
}
//# sourceMappingURL=InsteonDoorWindowSensorDevice.js.map