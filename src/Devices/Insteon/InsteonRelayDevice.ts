import { ISY } from '../../ISY.js';
import { ISYUpdateableBinaryStateDevice } from '../ISYDevice.js';
import { NodeInfo } from '../../Definitions/NodeInfo.js';
import { MapsTo } from '../MapsTo.js';
import { EndpointFor } from '../EndpointFor.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';


import type { OnOffBehavior} from '@project-chip/matter.js/behaviors/on-off';
import 'winston';
import { Properties } from '../../ISYConstants.js';
import { Drivers } from '../../Definitions/Global/Drivers.js';



export class InsteonRelayDevice extends ISYUpdateableBinaryStateDevice(InsteonBaseDevice) implements MapsTo<typeof OnOffBehavior>{


	constructor (isy: ISY, node: NodeInfo) {



		super(isy, node);
	}

	async initialize(endpoint: EndpointFor<typeof OnOffBehavior>): Promise<void> {


		endpoint.events.onOff.onOff$Changed.on((value) => {
			this.state = value;

		});
		//endpoint.defaults.onOff.onOff = await this.isOn;
		endpoint.set({onOff:{onOff: await this.state}});
		const that = this;

		this.on("PropertyChanged", (propertyName, newValue, _oldValue, formattedValue) => {
			if (propertyName === "ST") {
				endpoint.set({onOff:{onOff: newValue > 0}});
				//endpoint.setSt onOff: newValue });
			}
		});

	}



	public override handlePropertyChange(propertyName: string, value: any, formattedValue: string): boolean {
		return super.handlePropertyChange(propertyName, value, formattedValue);

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