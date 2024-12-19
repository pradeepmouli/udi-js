import { ISY } from '../../ISY.js';

import { NodeInfo } from '../../Model/NodeInfo.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';

export class InsteonSmokeSensorDevice extends InsteonBaseDevice {
	constructor(isy: ISY, deviceNode: NodeInfo ) {
		super(isy, deviceNode);
	}
	get smokeDetected() {
		return this.drivers.ST.value > 0;
	}
}
