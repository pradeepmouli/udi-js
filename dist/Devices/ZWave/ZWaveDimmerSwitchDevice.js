import { ISYUpdateableLevelDevice } from '../ISYDevice.js';
import { ZWaveBaseDevice } from './ZWaveBaseDevice.js';
import 'winston';
export class ZWaveDimmerSwitchDevice extends ISYUpdateableLevelDevice(ZWaveBaseDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
