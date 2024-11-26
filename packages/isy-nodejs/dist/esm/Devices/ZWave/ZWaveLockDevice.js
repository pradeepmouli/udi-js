import { ZWave } from '../../Definitions/index.js';
import { ZWaveBaseDevice } from './ZWaveBaseDevice.js';
import 'winston';
export class ZwaveLockDevice extends ZWaveBaseDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    sendLockCommand(lockState, resultHandler) {
        this.sendNonSecureLockCommand(lockState);
        this.sendSecureLockCommand(lockState);
    }
    get isLocked() {
        return this.drivers.ST.value > 0;
    }
    async updateIsLocked(isLocked) {
        //return super.updateState(isLocked);
    }
    async sendNonSecureLockCommand(lockState) {
        if (lockState) {
            return this.isy.sendNodeCommand(this, 'DON');
        }
        else {
            return this.isy.sendNodeCommand(this, 'DOF');
        }
    }
    async sendSecureLockCommand(lockState) {
        if (lockState) {
            return this.isy.sendNodeCommand(this, 'DON', ZWave.OnOff);
        }
        else {
            return this.isy.sendNodeCommand(this, 'DON', 0);
        }
    }
}
//# sourceMappingURL=ZWaveLockDevice.js.map