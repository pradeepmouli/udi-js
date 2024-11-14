import type { NodeInfo } from '../../Model/NodeInfo.js';
import { ISY } from '../../ISY.js';
import { Commands } from '../../ISYConstants.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import 'winston';

export class InsteonMotionSensorDevice extends InsteonBaseDevice {
	private _isMotionDetected: boolean;
	constructor (isy: ISY, deviceNode: NodeInfo) {
		super(isy, deviceNode);
		this._isMotionDetected = false;
	}

	public override handleControlTrigger(controlName: string) {

			if (controlName === Commands.On) {
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

			else if (controlName === Commands.Off) {
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
