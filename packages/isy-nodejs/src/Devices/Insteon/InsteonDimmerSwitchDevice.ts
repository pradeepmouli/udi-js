import type { NodeInfo } from '../../Definitions/NodeInfo.js';
import type { ISY } from '../../ISY.js';
import { InsteonSwitchDevice } from './InsteonDevice.js';
import { InsteonDimmableDevice } from './InsteonDimmableDevice.js';
import 'winston';

export class InsteonDimmerSwitchDevice extends InsteonSwitchDevice(InsteonDimmableDevice) {
	constructor (isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
	}
}
