import { ISY } from '../../ISY.js';
import { Commands, States } from '../../ISYConstants.js';
import { ISYUpdateableBinaryStateDevice } from '../ISYDevice.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';

export class InsteonLockDevice extends ISYUpdateableBinaryStateDevice(InsteonBaseDevice) {
	
	public sendLockCommand(lockState: any, resultHandler: any) {

			this.sendNonSecureLockCommand(lockState);

			this.sendSecureLockCommand(lockState);

	}
	get isLocked() {
		return this.state;
	}

	public async updateIsLocked(isLocked: boolean) {
		return super.updateState(isLocked);
	}

	public async sendNonSecureLockCommand(lockState: any) {
		if (lockState) {
			return this.isy.sendNodeCommand(this, Commands.Lock.Lock);
		}
		else {
			return this.isy.sendNodeCommand(this, Commands.Lock.Unlock);
		}
	}
	public async sendSecureLockCommand(lockState: any) {
		if (lockState) {
			return this.isy.sendNodeCommand(this, Commands.On, States.SecureLock.Secured);
		}
		else {
			return this.isy.sendNodeCommand(this, Commands.On, States.SecureLock.NotSecured);
		}
	}
}
