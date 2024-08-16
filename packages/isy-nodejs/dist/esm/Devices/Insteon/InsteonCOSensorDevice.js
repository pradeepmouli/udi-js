import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export class InsteonCOSensorDevice extends InsteonBaseDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    get state() {
        throw new Error('Method not implemented.');
    }
    get monoxideDetected() {
        return this.state;
    }
}
//# sourceMappingURL=InsteonCOSensorDevice.js.map