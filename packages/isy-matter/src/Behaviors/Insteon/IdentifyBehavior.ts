import { DimmableLightRequirements } from '@matter/node/devices';
import { Identify } from '@project-chip/matter.js/cluster';

import { ISYClusterBehavior } from '../ISYClusterBehavior.js';
import { BehaviorRegistry } from '../BehaviorRegistry.js';
import { Devices } from 'isy-nodejs/ISY';

export class IdentifyBehavior extends ISYClusterBehavior(DimmableLightRequirements.IdentifyServer, Devices.Insteon.Relay) {
	override async initialize(_options?: {}) {
		await super.initialize(_options);
	}

	override async identify() {
		return this.device.beep(100);
	}

	override async triggerEffect(request: Identify.TriggerEffectRequest) {
		switch (request.effectIdentifier) {
			case Identify.EffectIdentifier.Blink:
				return this.device.on(100).then(() => this.device.off());
			default:
				return this.device.beep(100);
		}
	}
}

BehaviorRegistry.register(IdentifyBehavior);
