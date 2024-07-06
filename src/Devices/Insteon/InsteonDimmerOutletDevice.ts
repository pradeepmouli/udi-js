import { InsteonDimmableDevice } from './InsteonDimmableDevice.js';

export class InsteonDimmerOutletDevice extends InsteonDimmableDevice {
	constructor (isy: any, deviceNode: any) {
		super(isy, deviceNode);
	}
}
