import { Identity } from '@project-chip/matter.js/util';
import { ISY } from '../../ISY';
import { EndpointFor, ISYUpdateableLevelDevice, MapsTo } from '../ISYDevice';
import { InsteonRelayDevice } from './InsteonRelayDevice';
//
import type { DimmableLightRequirements } from '@project-chip/matter.js/devices/DimmableLightDevice';
import { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import { OnOffBehavior as OOB, OnOffInterface } from '@project-chip/matter.js/behaviors/on-off';
import { OnOff, ClusterType } from '@project-chip/matter.js/cluster';

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
		super.initialize(endpoint);
		endpoint.events.levelControl.onLevel$Changed.on((value) => this.updateLevel(value));
		endpoint.events.levelControl.currentLevel$Changed
		endpoint.events.levelControl.maxLevel$Changed.on((value) => this.sendCommand("OL",value));

	}
}
