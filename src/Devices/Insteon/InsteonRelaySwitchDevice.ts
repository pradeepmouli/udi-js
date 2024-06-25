import { InsteonSwitchDevice } from './InsteonDevice';
import { InsteonRelayDevice } from './InsteonRelayDevice';
import 'winston';

export class InsteonRelaySwitchDevice extends InsteonSwitchDevice(InsteonRelayDevice) {
	constructor (isy: any, deviceNode: any) {
		super(isy, deviceNode);
	}
}
