import type { NodeInfo } from '../../Model/NodeInfo.js';
import type { ISY } from '../../ISY.js';

import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';

export class InsteonRelaySwitchDevice extends InsteonRelayDevice {
	constructor (isy: ISY, deviceNode: NodeInfo ) {
		super(isy, deviceNode);
	}
}
