import { ISY } from '../../ISY';
import { ISYUpdateableBinaryStateDevice, ISYBinaryStateDevice } from '../ISYDevice';
import { InsteonBaseDevice } from './InsteonBaseDevice';

export class InsteonLeakSensorDevice extends ISYBinaryStateDevice(InsteonBaseDevice) {
	constructor (isy: ISY, deviceNode) {
		super(isy, deviceNode);
	}


	get isDry() {
		return this.state;
	}
}
