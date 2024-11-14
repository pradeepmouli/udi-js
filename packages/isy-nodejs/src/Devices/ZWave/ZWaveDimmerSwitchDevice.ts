


import { ZWaveBaseDevice } from './ZWaveBaseDevice.js';
import 'winston';

export class ZWaveDimmerSwitchDevice extends ZWaveBaseDevice {
	constructor (isy: any, deviceNode: any) {
		super(isy, deviceNode);
	}
}
