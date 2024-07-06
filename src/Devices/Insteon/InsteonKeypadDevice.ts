import { ISY } from '../../ISY.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';


export class InsteonKeypadButtonDevice extends InsteonRelayDevice {
	constructor (isy: ISY, deviceNode: any) {
		super(isy, deviceNode);
	}
}
