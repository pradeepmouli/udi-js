import { ISY, Family } from '../../ISY.js';

import { NodeInfo } from '../../Model/NodeInfo.js';
import { MapsTo } from '../MapsTo.js';
import { EndpointFor } from '../EndpointFor.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';



import type { OnOffBehavior} from '@project-chip/matter.js/behaviors/on-off';
import 'winston';
import { Properties } from '../../ISYConstants.js';
import { Driver, DriverType } from '../../Definitions/Global/Drivers.js';
import type { Command } from '../../Definitions/Global/Commands.js';


export class InsteonRelayDevice extends InsteonBaseDevice<Driver.Signatures<'ST'>,Command.Signatures<'DON'|'DOF'>>  {


	static override family: Family.Insteon = Family.Insteon;
	constructor (isy: ISY, node: NodeInfo) {



		super(isy, node);
	}

	async initialize(endpoint: EndpointFor<typeof OnOffBehavior>): Promise<void> {


		endpoint.events.onOff.onOff$Changed.on((value) => {
			this.commands.DON(value);
			this.drivers.ST;


		});
		//endpoint.defaults.onOff.onOff = await this.isOn;
		endpoint.set({onOff:{onOff: await this.drivers.ST.value > 0}});
		const that = this;

		this.events.on("PropertyChanged", (propertyName, newValue, _oldValue, formattedValue) => {
			if (propertyName === "ST") {
				endpoint.set({onOff:{onOff: newValue > 0}});
				//endpoint.setSt onOff: newValue });
			}
		});

	}




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
		return super.sendBeep(level);
	}
}