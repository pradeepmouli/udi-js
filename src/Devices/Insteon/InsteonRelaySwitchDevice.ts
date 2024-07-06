import { InsteonSwitchDevice } from './InsteonDevice.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';

export class InsteonRelaySwitchDevice extends InsteonSwitchDevice(InsteonRelayDevice) {
	constructor (isy: any, deviceNode: any) {
		super(isy, deviceNode);
	}
}
