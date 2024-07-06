import { KeypadDevice } from './InsteonDevice.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';
export class InsteonKeypadRelayDevice extends KeypadDevice(InsteonRelayDevice) {
	constructor (isy: any, deviceNode: any) {
		super(isy, deviceNode);
	}
}
