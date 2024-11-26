import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
export class InsteonLockDevice extends InsteonBaseDevice {
    sendLockCommand(lockState, resultHandler) {
        this.sendNonSecureLockCommand(lockState);
        this.sendSecureLockCommand(lockState);
    }
    get isLocked() {
        return this.drivers.ST.value > 0;
    }
    async updateIsLocked(isLocked) {
        //return super.updateProperty(propertyName, value)
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
            return this.isy.sendNodeCommand(this, 'DON', 1);
        }
        else {
            return this.isy.sendNodeCommand(this, 'DOF', 0);
        }
    }
}
//# sourceMappingURL=InsteonLockDevice.js.map