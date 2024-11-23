import {  ISY } from '../../ISY.js';

import { NodeInfo } from '../../Model/NodeInfo.js';


import { InsteonBaseDevice } from './InsteonBaseDevice.js';

import type { OnOffBehavior } from '@project-chip/matter.js/behaviors/on-off';
import 'winston';

import type { Command } from '../../Definitions/Global/Commands.js';
import { Driver, DriverType } from '../../Definitions/Global/Drivers.js';
import { UnitOfMeasure } from '../../Definitions/index.js';
import { Properties } from '../../ISYConstants.js';

import type { DriverState } from '../../Model/DriverState.js';
import { RelayLampSwitch } from './Generated/RelayLampSwitch.js';

export class InsteonRelayDevice extends RelayLampSwitch.Node /*InsteonBaseDevice<Driver.Signatures<'ST' | 'OL' | 'RR' | 'ERR'>, Command.Signatures<'DON' | 'DOF'>>*/ {
	// #region Constructors (1)

	constructor(isy: ISY, nodeInfo: NodeInfo) {
		super(isy, nodeInfo);

	}

	// #endregion Constructors (1)

	// #region Public Methods (2)



	/*
	public async updateIsOn(isOn: boolean): Promise<any> {
		if (t !== isOn) {
			this.isOn = true;
			return super.updateState(isOn);
		}
		else {
			return Promise.resolve();
		}

	} */
	public override async sendBeep(level: number = 100): Promise<any> {
		return super.beep(level);
	}

	// #endregion Public Methods (2)
}
