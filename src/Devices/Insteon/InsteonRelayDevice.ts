import { OnOffLightDeviceDefinition, OnOffLightDevice } from '@project-chip/matter.js/devices/OnOffLightDevice';
import { ISY } from '../../ISY.js';
import { ISYUpdateableBinaryStateDevice, MapsToEndpoint, MapsToEndpointType, MatterEndpoint, NodeInfo } from '../ISYDevice.js';
import { MapsTo, type MapsToCluster } from '../MapsTo.js';
import { EndpointFor } from '../EndpointFor.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';


import { Endpoint } from '@project-chip/matter.js/endpoint';
import { EndpointType, MutableEndpoint } from '@project-chip/matter.js/endpoint/type';
import type { OnOffBehavior} from '@project-chip/matter.js/behaviors/on-off';
import 'winston';
import type { OnOffCluster } from '@project-chip/matter.js/cluster';
import type { Behaviors } from '@project-chip/matter.js/endpoint/properties';



export class InsteonRelayDevice extends ISYUpdateableBinaryStateDevice(InsteonBaseDevice) implements MapsTo<typeof OnOffBehavior>{
	constructor (isy: ISY, node: NodeInfo) {

		super(isy, node);
	}

	initialize(endpoint: EndpointFor<typeof OnOffBehavior>): void {


		endpoint.events.onOff.onOff$Changed.on((value) => {
			this.updateIsOn(value);
		});

		this.on("PropertyChanged", (propertyName, newValue, _oldValue, formattedValue) => {
			if (propertyName === "ST") {
				endpoint.set({onOff: newValue});
				//endpoint.setSt onOff: newValue });
			}
		});

	}

	get isOn() : Promise<boolean> {
		return super.state;
	}
	set isOn(value: boolean)
	{
	 this.updateIsOn(value);
	}


	public override handlePropertyChange(propertyName: string, value: any, formattedValue: string): boolean {
		return super.handlePropertyChange(propertyName, value, formattedValue);

	}

	public async updateIsOn(isOn: boolean): Promise<any> {
		if (await this.isOn !== isOn) {
			this.isOn = true;
			return super.updateState(isOn);
		}
		else {
			return Promise.resolve();
		}

	}






	public override async sendBeep(level: number = 100): Promise<any> {
		return super.sendBeep(level);
	}
}