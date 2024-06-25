import { ISY } from '../../ISY';
import { ISYUpdateableBinaryStateDevice, ISYBinaryStateDevice, NodeInfo } from '../ISYDevice';
import { InsteonBaseDevice } from './InsteonBaseDevice';
import 'winston';

export class InsteonCOSensorDevice extends ISYBinaryStateDevice(InsteonBaseDevice) {
	constructor (isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
	}
	get monoxideDetected() {
		return this.state;
	}
}
