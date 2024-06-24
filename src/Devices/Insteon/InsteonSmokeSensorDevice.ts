import { ISY } from '../../ISY';
import { ISYBinaryStateDevice, NodeInfo } from '../ISYDevice';
import { InsteonBaseDevice } from './InsteonBaseDevice';

export class InsteonSmokeSensorDevice extends ISYBinaryStateDevice(InsteonBaseDevice) {
	constructor(isy: ISY, deviceNode: NodeInfo ) {
		super(isy, deviceNode);
	}
	get smokeDetected() {
		return this.state;
	}
}
