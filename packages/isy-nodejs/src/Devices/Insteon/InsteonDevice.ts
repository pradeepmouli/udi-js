import { ISY } from '../../ISY.js';

import { Constructor } from '../Constructor.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';
import type { InsteonBaseDevice } from './InsteonBaseDevice.js';

export const InsteonLampDevice = <T extends Constructor<InsteonBaseDevice>>(IB: T) => (class extends IB {
			declare isDimmable: boolean;

			constructor(...args: any[]) {
				super(args[0], args[1]);
				this.isDimmable = true;
			}

		});

// tslint:disable-next-line: variable-name

export const KeypadDevice = <T extends Constructor<InsteonBaseDevice>>(IB: T) => (class extends IB {


});


export class InsteonOutletDevice extends InsteonRelayDevice {
	constructor(isy: ISY, deviceNode: any) {
		super(isy, deviceNode);
	}
}
