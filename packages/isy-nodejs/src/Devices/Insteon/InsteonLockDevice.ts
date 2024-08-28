import { ISY } from '../../ISY.js';
import { Commands, States } from '../../ISYConstants.js';

import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';

export class InsteonLockDevice extends InsteonBaseDevice {

	public sendLockCommand(lockState: any, resultHandler: any) {

			this.sendNonSecureLockCommand(lockState);

			this.sendSecureLockCommand(lockState);

	}
	get isLocked() {
		return this.drivers.ST.value > 0;
	}

	public async updateIsLocked(isLocked: boolean) {
		//return super.updateProperty(propertyName, value)
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
