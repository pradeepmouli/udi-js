import { ISY } from '../../ISY.js';
import { ISYUpdateableBinaryStateDevice, ISYBinaryStateDevice } from '../ISYDevice.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
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
