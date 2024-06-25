import { ISY } from '../../ISY.js';
import { ISYUpdateableBinaryStateDevice, ISYBinaryStateDevice } from '../ISYDevice.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';

export class InsteonDoorWindowSensorDevice extends ISYBinaryStateDevice(InsteonBaseDevice) {
	constructor (isy: ISY, deviceNode) {
		super(isy, deviceNode);
	}
	get isOpen() {
		return this.state;
	}
}
