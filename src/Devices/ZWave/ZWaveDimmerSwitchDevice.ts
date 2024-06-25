
import { ISYUpdateableLevelDevice } from '../ISYDevice.js';
import { Family } from '../../ISY.js';
import { ZWaveBaseDevice } from './ZWaveBaseDevice.js';
import 'winston';

export class ZWaveDimmerSwitchDevice extends ISYUpdateableLevelDevice(ZWaveBaseDevice) {
	constructor (isy: any, deviceNode: any) {
		super(isy, deviceNode);
	}
}
