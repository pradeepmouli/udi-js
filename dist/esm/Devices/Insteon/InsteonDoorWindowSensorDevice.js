import { ISYBinaryStateDevice } from '../ISYDevice.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export class InsteonDoorWindowSensorDevice extends ISYBinaryStateDevice(InsteonBaseDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        classMap.set(this.constructor.name, this.constructor);
    }
    get isOpen() {
        return this.state;
    }
}
