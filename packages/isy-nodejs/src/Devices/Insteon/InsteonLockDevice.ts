import { ISY } from '../../ISY.js';


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
			return this.isy.sendNodeCommand(this, 'DON');
		}
		else {
			return this.isy.sendNodeCommand(this, 'DOF');
		}
	}
	public async sendSecureLockCommand(lockState: any) {
		if (lockState) {
			return this.isy.sendNodeCommand(this, 'DON',1);
		}
		else {
			return this.isy.sendNodeCommand(this, 'DOF', 0);
		}
	}
}
