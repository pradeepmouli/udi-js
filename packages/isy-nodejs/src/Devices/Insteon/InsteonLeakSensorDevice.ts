import type { NodeInfo } from '../../Model/NodeInfo.js';
import { ISY, type Family } from '../../ISY.js';

import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';

export class InsteonLeakSensorDevice extends InsteonBaseDevice {
	constructor (isy: ISY, deviceNode: NodeInfo<Family.Insteon>) {
		super(isy, deviceNode);
	}


	get isDry() {
		return this.drivers.ST;
	}
}
