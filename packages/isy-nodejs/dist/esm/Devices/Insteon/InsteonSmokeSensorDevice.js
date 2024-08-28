import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export class InsteonSmokeSensorDevice extends InsteonBaseDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    get smokeDetected() {
        return this.drivers.ST.value > 0;
    }
}
//# sourceMappingURL=InsteonSmokeSensorDevice.js.map