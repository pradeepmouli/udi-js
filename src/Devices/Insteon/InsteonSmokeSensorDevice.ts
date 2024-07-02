import { ISY } from '../../ISY.js';
import { ISYBinaryStateDevice } from '../ISYDevice.js';
import { NodeInfo } from '../../Definitions/NodeInfo.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';

export class InsteonSmokeSensorDevice extends ISYBinaryStateDevice(InsteonBaseDevice) {
	constructor(isy: ISY, deviceNode: NodeInfo ) {
		super(isy, deviceNode);
	}
	get smokeDetected() {
		return this.state;
	}
}
