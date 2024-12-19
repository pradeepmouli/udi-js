import { CompositeDevice } from '../../ISY.js';
import { BinaryAlarm } from './Generated/BinaryAlarm.js';
import 'winston';
export class InsteonCOSensorDevice extends CompositeDevice.of({ alarm: BinaryAlarm }, (p) => p.address.endsWith('01')) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
//# sourceMappingURL=InsteonCOSensorDevice.js.map