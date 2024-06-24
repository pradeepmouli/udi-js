import { OnOffLightDeviceDefinition, OnOffLightDevice } from '@project-chip/matter.js/devices/OnOffLightDevice';
import { ISY } from '../../ISY';
import { EndpointFor, ISYUpdateableBinaryStateDevice, MapsTo, MapsToEndpoint, MapsToEndpointType, MatterEndpoint, NodeInfo } from '../ISYDevice';
import { InsteonBaseDevice } from './InsteonBaseDevice';


import { Endpoint } from '@project-chip/matter.js/endpoint';
import { EndpointType, MutableEndpoint } from '@project-chip/matter.js/endpoint/type';
import { OnOffBehavior, OnOffInterface, OnOffServer } from '@project-chip/matter.js/behaviors/on-off';
import { Cluster, ClusterType, OnOff, OnOffCluster } from '@project-chip/matter.js/cluster';
import { OnOffSwitchConfiguration } from '@project-chip/matter.js/cluster';
import { OnOffLightSwitchDevice } from '@project-chip/matter.js/devices/OnOffLightSwitchDevice';
import { Behaviors, SupportedBehaviors } from '@project-chip/matter.js/endpoint/properties';
import { BridgedDeviceBasicInformationBehavior } from '@project-chip/matter.js/behaviors/bridged-device-basic-information';
import { OnOffSwitchConfigurationServer } from '@project-chip/matter.js/behaviors/on-off-switch-configuration';
import { ClusterBehavior, ClusterEvents } from '@project-chip/matter.js/behavior/cluster';
import { Behavior } from '@project-chip/matter.js/behavior';
import { Identity } from '@project-chip/matter.js/util';


export class InsteonRelayDevice extends ISYUpdateableBinaryStateDevice(InsteonBaseDevice) implements MapsTo<Identity<typeof OnOffBehavior>>{
	constructor (isy: ISY, node: NodeInfo) {

		super(isy, node);
	}
	initialize(endpoint: EndpointFor<Identity<typeof OnOffBehavior>>): void {


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