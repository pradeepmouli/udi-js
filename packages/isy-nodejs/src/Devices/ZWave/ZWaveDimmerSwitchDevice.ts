


import { DimmerSwitch } from './Generated/DimmerSwitch.js';
import { ZWaveBaseDevice } from './ZWaveBaseDevice.js';
import 'winston';

export class ZWaveDimmerSwitchDevice extends DimmerSwitch.Node {
	constructor (isy: any, deviceNode: any) {
		super(isy, deviceNode);
	}
}
