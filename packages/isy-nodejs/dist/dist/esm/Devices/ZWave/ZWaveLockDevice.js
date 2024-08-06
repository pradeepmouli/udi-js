import { Commands, States } from '../../ISYConstants.js';
import { ISYUpdateableBinaryStateDevice } from '../ISYDevice.js';
import { ZWaveBaseDevice } from './ZWaveBaseDevice.js';
import 'winston';
export class ZwaveLockDevice extends ISYUpdateableBinaryStateDevice(ZWaveBaseDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
    sendLockCommand(lockState, resultHandler) {
        this.sendNonSecureLockCommand(lockState);
        this.sendSecureLockCommand(lockState);
    }
    get isLocked() {
        return this.state;
    }
    async updateIsLocked(isLocked) {
        return super.updateState(isLocked);
    }
    async sendNonSecureLockCommand(lockState) {
        if (lockState) {
            return this.isy.sendNodeCommand(this, Commands.Lock.Lock);
        }
        else {
            return this.isy.sendNodeCommand(this, Commands.Lock.Unlock);
        }
    }
    async sendSecureLockCommand(lockState) {
        if (lockState) {
            return this.isy.sendNodeCommand(this, Commands.On, States.SecureLock.Secured);
        }
        else {
            return this.isy.sendNodeCommand(this, Commands.On, States.SecureLock.NotSecured);
        }
    }
}
