import { ISY } from '../../ISY.js';
import { ISYUpdateableBinaryStateDevice, ISYBinaryStateDevice, NodeInfo } from '../ISYDevice.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';

export class InsteonCOSensorDevice extends ISYBinaryStateDevice(InsteonBaseDevice) {
	constructor (isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
	}
	get monoxideDetected() {
		return this.state;
	}
}
