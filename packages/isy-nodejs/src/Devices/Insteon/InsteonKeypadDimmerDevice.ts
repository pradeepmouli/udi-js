import type { NodeInfo } from '../../Model/NodeInfo.js';
import type { ISY } from '../../ISY.js';
import { KeypadDevice } from './InsteonDevice.js';
import { InsteonDimmableDevice } from './InsteonDimmableDevice.js';
import 'winston';

export class InsteonKeypadDimmerDevice extends KeypadDevice(InsteonDimmableDevice) {
	constructor (isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
	}
}
