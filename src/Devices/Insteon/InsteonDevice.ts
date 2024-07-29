import { Family, InsteonBaseDevice, ISY, ISYDevice } from '../../ISY.js';

import { Insteon } from '../../Definitions/Global/Families.js';
import { Commands } from '../../ISYConstants.js'
import { Constructor } from '../Constructor.js';
import { InsteonKeypadButtonDevice } from './InsteonKeypadDevice.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';

export const InsteonLampDevice = <T extends Constructor<InsteonBaseDevice>>(IB: T) => (class extends IB {
			declare isDimmable: boolean;

			constructor(...args: any[]) {
				super(args[0], args[1]);
				this.isDimmable = true;
			}

		});

// tslint:disable-next-line: variable-name
export const InsteonSwitchDevice = <T extends Constructor<InsteonBaseDevice>>(IB: T) => (class extends IB {
	declare isDimmable: boolean;

	constructor (...args: any[]) {
		super(args[0], args[1]);
		this.isDimmable = true;
	}

});

export const KeypadDevice = <T extends Constructor<InsteonBaseDevice>>(IB: T) => (class extends IB {

	public override addChild(childDevice: ISYDevice<Family.Insteon>)
	{
		super.addChild(childDevice);
	}
});


export class InsteonOutletDevice extends InsteonRelayDevice {
	constructor(isy: ISY, deviceNode: any) {
		super(isy, deviceNode);
	}
}
