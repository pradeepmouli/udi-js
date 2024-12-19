import { ZWave, type Driver } from '../../Definitions/index.js';
import { ISY } from '../../ISY.js';

import 'winston';
import { ZWaveBase } from './ZWaveBase.js';

export class ZwaveLockDevice extends ZWaveBase<Driver.Signatures<'ST'>, any, any> {
	constructor(isy: ISY, deviceNode: any) {
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
			return this.isy.sendNodeCommand(this, 'DON');
		} else {
			return this.isy.sendNodeCommand(this, 'DOF');
		}
	}
	public async sendSecureLockCommand(lockState: any) {
		if (lockState) {
			return this.isy.sendNodeCommand(this, 'DON', ZWave.OnOff);
		} else {
			return this.isy.sendNodeCommand(this, 'DON', 0);
		}
	}
}
