import { ISY } from '../../ISY.js';
import { ISYUpdateableBinaryStateDevice, ISYBinaryStateDevice } from '../ISYDevice.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';

export class InsteonLeakSensorDevice extends ISYBinaryStateDevice(InsteonBaseDevice) {
	constructor (isy: ISY, deviceNode) {
		super(isy, deviceNode);
	}


	get isDry() {
		return this.state;
	}
}
