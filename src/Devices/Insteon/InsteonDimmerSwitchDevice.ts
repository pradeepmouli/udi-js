import { InsteonSwitchDevice } from './InsteonDevice';
import { InsteonDimmableDevice } from './InsteonDimmableDevice';
import 'winston';

export class InsteonDimmerSwitchDevice extends InsteonSwitchDevice(InsteonDimmableDevice) {
	constructor (isy: any, deviceNode: any) {
		super(isy, deviceNode);
	}
}
