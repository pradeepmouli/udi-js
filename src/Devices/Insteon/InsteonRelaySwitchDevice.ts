import type { NodeInfo } from '../../Definitions/NodeInfo.js';
import type { ISY } from '../../ISY.js';
import { InsteonSwitchDevice } from './InsteonDevice.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';

export class InsteonRelaySwitchDevice extends InsteonSwitchDevice(InsteonRelayDevice) {
	constructor (isy: ISY, deviceNode: NodeInfo ) {
		super(isy, deviceNode);
	}
}
