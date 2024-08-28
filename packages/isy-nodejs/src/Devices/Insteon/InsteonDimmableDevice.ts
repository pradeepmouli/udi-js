import { Identity } from '@project-chip/matter.js/util';
import { ISY } from '../../ISY.js';

import { MapsTo, type MapsToCluster } from '../MapsTo.js';
import { EndpointFor } from '../EndpointFor.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
//
import type { DimmableLightRequirements } from '@project-chip/matter.js/devices/DimmableLightDevice';
import { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import { OnOffBehavior as OOB, OnOffInterface } from '@project-chip/matter.js/behaviors/on-off';
import { OnOff, ClusterType } from '@project-chip/matter.js/cluster';
import 'winston';
import { UnitOfMeasure } from '../../Definitions/Global/UOM.js';
import type { NodeInfo } from '../../Model/NodeInfo.js';

type LevelControlBehavior = typeof DimmableLightRequirements.LevelControlServer
type OnOffBehavior = typeof OOB
//@ts-ignore
export class InsteonDimmableDevice extends InsteonRelayDevice implements MapsTo<LevelControlBehavior,OnOffBehavior>{


	constructor (isy: ISY,node: NodeInfo) {
		super(isy, node);
		this.isDimmable = true;
	}

	// public async updateBrightnessLevel(level: number): Promise<{}> {
	// 	return super.(level);
	// }




	override async initialize(endpoint: EndpointFor<LevelControlBehavior,OnOffBehavior>): Promise<void> {
		try {
			await super.initialize(endpoint);
			const that = this;
			// endpoint.events.levelControl.onLevel$Changed.on((value) => that.updateLevel(that.convertFrom(value, UnitOfMeasure.LevelFrom0To255)));

			// endpoint.set({levelControl: {onLevel: this.convertTo(this.level,UnitOfMeasure.LevelFrom0To255)}});

			// this.on("PropertyChanged", (p,n,o,f) => endpoint.set({levelControl: {onLevel: that.convertTo(Number(n),UnitOfMeasure.LevelFrom0To255)}})
			// );

			// //endpoint.events.levelCont
			// endpoint.events.levelControl.maxLevel$Changed.on((value) => that.sendCommand("OL",value));
		} catch (error) {

		}

	}
}
