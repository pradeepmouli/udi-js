import type { ISY } from '../../ISY.js';



//
import type { DimmableLightRequirements } from '@project-chip/matter.js/devices/DimmableLightDevice';
import { OnOffBehavior as OOB } from '@project-chip/matter.js/behaviors/on-off';
import 'winston';
import type { NodeInfo } from '../../Model/NodeInfo.js';
import { DimmerLampSwitch } from './Generated/DimmerLampSwitch.js';



// #region Type aliases (2)

type LevelControlBehavior = typeof DimmableLightRequirements.LevelControlServer;
type OnOffBehavior = typeof OOB;

// #endregion Type aliases (2)

// #region Classes (1)

export class InsteonDimmableDevice extends DimmerLampSwitch.Node {
	// #region Constructors (1)

	constructor(isy: ISY, node: NodeInfo) {
		super(isy, node);

	}

	// #endregion Constructors (1)

	// #region Public Methods (1)

	// public async updateBrightnessLevel(level: number): Promise<{}> {
	// 	return super.(level);
	// }
	/*public override async initialize(endpoint: EndpointFor<LevelControlBehavior, OnOffBehavior>): Promise<void> {
		try {
			await super.initialize(endpoint);
			const that = this;
			// endpoint.events.levelControl.onLevel$Changed.on((value) => that.updateLevel(that.convertFrom(value, UnitOfMeasure.LevelFrom0To255)));

			// endpoint.set({levelControl: {onLevel: this.convertTo(this.level,UnitOfMeasure.LevelFrom0To255)}});

			// this.on("PropertyChanged", (p,n,o,f) => endpoint.set({levelControl: {onLevel: that.convertTo(Number(n),UnitOfMeasure.LevelFrom0To255)}})
			// );

			// //endpoint.events.levelCont
			// endpoint.events.levelControl.maxLevel$Changed.on((value) => that.sendCommand("OL",value));
		} catch (error) {}
	}*/

	// #endregion Public Methods (1)
}

// #endregion Classes (1)
