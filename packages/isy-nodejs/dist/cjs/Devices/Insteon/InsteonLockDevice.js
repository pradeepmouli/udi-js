"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonLockDevice = void 0;
const ISYConstants_js_1 = require("../../ISYConstants.js");
const ISYDevice_js_1 = require("../ISYDevice.js");
const InsteonBaseDevice_js_1 = require("./InsteonBaseDevice.js");
require("winston");
class InsteonLockDevice extends (0, ISYDevice_js_1.ISYUpdateableBinaryStateDevice)(InsteonBaseDevice_js_1.InsteonBaseDevice) {
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
            return this.isy.sendNodeCommand(this, ISYConstants_js_1.Commands.Lock.Lock);
        }
        else {
            return this.isy.sendNodeCommand(this, ISYConstants_js_1.Commands.Lock.Unlock);
        }
    }
    async sendSecureLockCommand(lockState) {
        if (lockState) {
            return this.isy.sendNodeCommand(this, ISYConstants_js_1.Commands.On, ISYConstants_js_1.States.SecureLock.Secured);
        }
        else {
            return this.isy.sendNodeCommand(this, ISYConstants_js_1.Commands.On, ISYConstants_js_1.States.SecureLock.NotSecured);
        }
    }
}
exports.InsteonLockDevice = InsteonLockDevice;
//# sourceMappingURL=InsteonLockDevice.js.map