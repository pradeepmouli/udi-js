import { Identity } from '@project-chip/matter.js/util';
import { ISY } from '../../ISY.js';
import { ISYUpdateableLevelDevice } from '../ISYDevice.js';
import { MapsTo } from '../MapsTo.js';
import { EndpointFor } from '../EndpointFor.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
//
import type { DimmableLightRequirements } from '@project-chip/matter.js/devices/DimmableLightDevice';
import { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import { OnOffBehavior as OOB, OnOffInterface } from '@project-chip/matter.js/behaviors/on-off';
import { OnOff, ClusterType } from '@project-chip/matter.js/cluster';
import 'winston';

type LevelControlBehavior = typeof DimmableLightRequirements.LevelControlServer
type OnOffBehavior = typeof OOB

export class InsteonDimmableDevice extends ISYUpdateableLevelDevice(InsteonRelayDevice) implements MapsTo<LevelControlBehavior,OnOffBehavior>{

	constructor (isy: ISY, node: any) {
		super(isy, node);
		this.isDimmable = true;
	}
	get brightnessLevel() {
		return this.level;
	}
	public async updateBrightnessLevel(level: number): Promise<{}> {
		return super.updateLevel(level);
	}




	override initialize(endpoint: EndpointFor<LevelControlBehavior,OnOffBehavior>): void {
		try {
			super.initialize(endpoint);
			endpoint.events.levelControl.onLevel$Changed.on((value) => this.updateLevel(value));
			this.on("PropertyChanged", (p,n,o,f) => endpoint.set({levelControl: {onLevel: Number(n)}})
			);

			//endpoint.events.levelCont
			endpoint.events.levelControl.maxLevel$Changed.on((value) => this.sendCommand("OL",value));
		} catch (error) {

		}

	}
}
