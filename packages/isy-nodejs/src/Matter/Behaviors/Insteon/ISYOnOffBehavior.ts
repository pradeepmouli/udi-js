import type { LevelControlInterface, LevelControlServer } from '@project-chip/matter.js/behaviors/level-control';
import type { OnOffBehavior, OnOffServer } from '@project-chip/matter.js/behaviors/on-off';
import type { MutableCluster, OnOffCluster } from '@project-chip/matter.js/cluster';
import { DimmableLightRequirements } from '@project-chip/matter.js/devices/DimmableLightDevice';
import { OnOffLightRequirements } from '@project-chip/matter.js/devices/OnOffLightDevice';
import { OnOffLightSwitchDevice } from '@project-chip/matter.js/devices/OnOffLightSwitchDevice';
import type { MaybePromise } from '@project-chip/matter.js/util';
import { DriverType } from '../../../Definitions/Global/Drivers.js';
import { InsteonDimmableDevice } from '../../../Devices/Insteon/InsteonDimmableDevice.js';
import { InsteonRelayDevice } from '../../../Devices/Insteon/InsteonRelayDevice.js';

import { ClusterForBehavior, ISYClusterBehavior, type PropertyChange } from '../ISYClusterBehavior.js';

import { Converter } from '../../../Converters.js';
import { BehaviorRegistry } from '../BehaviorRegistry.js';
import type { ClusterBehavior } from '@matter/node';

export class ISYOnOffBehavior extends ISYClusterBehavior(OnOffLightRequirements.OnOffServer, InsteonRelayDevice) {
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

	override async handlePropertyChange({ driver, newValue, oldValue, formattedValue }: PropertyChange<InsteonRelayDevice>) {

		return super.handlePropertyChange({ driver, newValue, oldValue, formattedValue });
	}
}

BehaviorRegistry.register(ISYOnOffBehavior);

export class ISYDimmableBehavior extends ISYClusterBehavior(DimmableLightRequirements.LevelControlServer, InsteonDimmableDevice) {
	override async initialize(_options?: {}) {
		await super.initialize(_options);
		/*this.state.onLevel = Converter.get('Level255toZero.LightingLevel').to(this.device.drivers.OL)*/
		//this.state.currentLevel = this.device.drivers.ST.value;

		//this.state.onLevel = this.device.drivers.OL;
	}

	override setLevel(level: number): MaybePromise<void> {
		level = Converter.Matter.LevelFrom0To255.LightingLevel.from(level);
		
		if (level > 0) {
			return this.device.on(level);
		} else {
			return this.device.off();
		}

	}
}

BehaviorRegistry.register(ISYDimmableBehavior);
