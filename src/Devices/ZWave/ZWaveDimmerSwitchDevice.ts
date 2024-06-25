
import { ISYUpdateableLevelDevice } from '../ISYDevice';
import { Family } from '../../ISY';
import { ZWaveBaseDevice } from './ZWaveBaseDevice';
import 'winston';

export class ZWaveDimmerSwitchDevice extends ISYUpdateableLevelDevice(ZWaveBaseDevice) {
	constructor (isy: any, deviceNode: any) {
		super(isy, deviceNode);
	}
}
