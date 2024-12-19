import { ZWave } from '../../Definitions/index.js';
import 'winston';
import { ZWaveBase } from './ZWaveBase.js';
export class ZwaveLockDevice extends ZWaveBase {
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