import { ISY } from '../../ISY.js';
import { Commands, States } from '../../ISYConstants.js';

import { ZWaveBaseDevice } from './ZWaveBaseDevice.js';
import 'winston';


export class ZwaveLockDevice extends ZWaveBaseDevice {
	constructor (isy: ISY, deviceNode: any
	) {
		super(isy, deviceNode);
	}
	public sendLockCommand(lockState: any, resultHandler: any) {

			this.sendNonSecureLockCommand(lockState);

			this.sendSecureLockCommand(lockState);

	}
	get isLocked() {
		return this.drivers.ST.value > 0;
	}

	public async updateIsLocked(isLocked: boolean) {
		//return super.updateState(isLocked);
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
