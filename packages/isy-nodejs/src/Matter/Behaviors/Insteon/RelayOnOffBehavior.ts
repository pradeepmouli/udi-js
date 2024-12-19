import { OnOffLightRequirements } from '@project-chip/matter.js/devices/OnOffLightDevice';
import { InsteonRelayDevice } from '../../../Devices/Insteon/InsteonRelayDevice.js';

import { ISYClusterBehavior, type PropertyChange } from '../ISYClusterBehavior.js';

import { BehaviorRegistry } from '../BehaviorRegistry.js';
import { Insteon } from '../../../Devices/index.js';

export class RelayOnOffBehavior extends ISYClusterBehavior(OnOffLightRequirements.OnOffServer, Insteon.RelayLamp) {
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
