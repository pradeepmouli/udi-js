import type { NodeInfo } from '../../Model/NodeInfo.js';
import { ISY } from '../../ISY.js';

import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';
import { Pir2844 } from './Generated/Pir2844.js';
import type { Pir2844c } from './Generated/Pir2844c.js';
import { Pir2844OnOff } from './Generated/Pir2844OnOff.js';

export class InsteonMotionSensorDevice extends Pir2844OnOff.Node {
	private _isMotionDetected: boolean;
	constructor (isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
		this._isMotionDetected = false;
	}

	public override handleControlTrigger(controlName: keyof Pir2844OnOff.Commands) {

			if (controlName === 'DON') {
				this.logger('Motion detected.');
				this._isMotionDetected = true;
				this.emit('controlTriggered',controlName);
				this.emit('propertyChanged', 'motionDetected', true, false, "true");

				setTimeout(() => {
					this.logger('No motion detected in last 30 seconds.');
					this._isMotionDetected = false;
					this.emit('propertyChanged', 'motionDetected', false, true, "false"); /*Included for compatiblity purposes*/
				}, 30000);
				return true;
			}

			else if (controlName === 'DOF') {
				this._isMotionDetected = false;
				this.logger('No motion detected.');
				this.emit('controlTriggered',controlName);
				this.emit('propertyChanged', 'motionDetected', false, true, "false");
				return true;
			}

		return false;
	}
	get motionDetected (): boolean{
		return this._isMotionDetected;
	}



}
