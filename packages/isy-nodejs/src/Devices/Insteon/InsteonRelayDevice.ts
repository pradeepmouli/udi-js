import { ISY, type Family } from '../../ISY.js';

import { NodeInfo } from '../../Model/NodeInfo.js';



import 'winston';


import { RelayLampSwitch } from './Generated/RelayLampSwitch.js';

export class InsteonRelayDevice extends RelayLampSwitch.Node /*InsteonBaseDevice<Driver.Signatures<'ST' | 'OL' | 'RR' | 'ERR'>, Command.Signatures<'DON' | 'DOF'>>*/ {
	// #region Constructors (1)

	constructor(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>) {
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


	// #endregion Public Methods (2)
}
