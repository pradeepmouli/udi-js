import { ISY } from '../../ISY.js';
import { ISYBinaryStateDevice } from '../ISYDevice.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';

export class InsteonCOSensorDevice extends InsteonBaseDevice<{},{}>implements ISYBinaryStateDevice {
	constructor (isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
	}
	get state(): Promise<boolean> {
		throw new Error('Method not implemented.');
	}
	get monoxideDetected() {
		return this.state;
	}
}
