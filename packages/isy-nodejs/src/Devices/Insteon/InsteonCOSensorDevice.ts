import { CompositeDevice, ISY } from '../../ISY.js';

import { NodeInfo } from '../../Model/NodeInfo.js';
import { BinaryAlarm } from './Generated/BinaryAlarm.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';

export class InsteonCOSensorDevice extends CompositeDevice.of({alarm: BinaryAlarm}, (p) => p.address.endsWith('01'))  {
	constructor (isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
	}

}
