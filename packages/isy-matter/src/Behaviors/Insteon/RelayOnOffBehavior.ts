

import { Devices } from 'isy-nodejs/ISY';
import { ISYClusterBehavior, type PropertyChange } from '../ISYClusterBehavior.js';
import { BehaviorRegistry } from '../BehaviorRegistry.js';
import { OnOffLightRequirements } from '@matter/main/devices';


export class RelayOnOffBehavior extends ISYClusterBehavior(OnOffLightRequirements.OnOffServer, Devices.Insteon.RelayLamp) {
	override async initialize(_options?: {}) {
		await super.initialize(_options);

		//this.state.onOff = this.device.status;
		//this.state.onOff = await this.device.state;
	}

	override on = async () => {
		await this.device.on();

		//this.device.commands.DON = true;
	};

	override async off() {
		await this.device.off();

		// this.device.drivers = false;
	}

	override async handlePropertyChange({ driver, newValue, oldValue, formattedValue }) {
		return super.handlePropertyChange({ driver, newValue, oldValue, formattedValue });
	}
}

BehaviorRegistry.register(RelayOnOffBehavior);
