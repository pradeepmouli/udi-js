import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export class InsteonLeakSensorDevice extends InsteonBaseDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    get isDry() {
        return this.drivers.ST;
    }
}
//# sourceMappingURL=InsteonLeakSensorDevice.js.map