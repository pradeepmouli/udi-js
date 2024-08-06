import type { NodeInfo } from '../../Definitions/NodeInfo.js';
import { ISY } from '../../ISY.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';


export class InsteonKeypadButtonDevice extends InsteonRelayDevice {
	constructor (isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
	}
}
