
import { Family } from '../../Definitions/Global/Families.js';
import * as Insteon from '../../Devices/Insteon/index.js';


//import InsteonMap from "./Insteon.json";

import { OnOffLightDevice, DimmableLightDevice } from '@matter/node/devices';
import { add, MappingRegistry, type EndpointMapping, type FamilyToClusterMap } from './MappingRegistry.js';

export const map: FamilyToClusterMap<Family.Insteon> = {
	Family: Family.Insteon,

	RelayLamp: {
		deviceType: OnOffLightDevice,
		mapping: {
			OnOff: {
				attributes: {
					onOff: { driver: 'ST', converter: 'Percent.Boolean' }
				},
				commands: { on: 'DON' }
			}
		}
	},
	RelayLampSwitch: {
		deviceType: OnOffLightDevice,
		mapping: {
			OnOff: {
				attributes: {
					onOff: { driver: 'ST', converter: 'Percent.Boolean' }
				},
				commands: { on: 'DON' }
			}
		}
	},
	DimmerLamp: {
		deviceType: DimmableLightDevice,
		// @ts-ignore
		mapping: {
			// @ts-ignore
			OnOff: {
				attributes: {
					onOff: { driver: 'ST', converter: 'Percent.Boolean' }
				},
				commands: { on: 'DON' }
			},
			LevelControl: {
				// @ts-ignore
				attributes: {
					currentLevel: { driver: 'ST', converter: 'Percent.LightingLevel' },
					startUpCurrentLevel: { driver: 'OL', converter: 'Percent.LightingLevel' },
					onLevel: { driver: 'OL', converter: 'Percent.LightingLevel' }
				},
				commands: { setLevel: { command: 'DON' } }
			}
		} as EndpointMapping<DimmableLightDevice, Insteon.DimmerLampNode>
	},
	DimmerLampSwitch: {
		deviceType: DimmableLightDevice,
		// @ts-ignore
		mapping: {
			// @ts-ignore
			OnOff: {
				attributes: {
					onOff: { driver: 'ST', converter: 'Percent.Boolean' }
				},
				commands: { on: 'DON' }
			},
			LevelControl: {
				// @ts-ignore
				attributes: {
					currentLevel: { driver: 'ST', converter: 'Percent.LightingLevel' },
					startUpCurrentLevel: { driver: 'OL', converter: 'Percent.LightingLevel' },
					onLevel: { driver: 'OL', converter: 'Percent.LightingLevel' }
				},
				commands: { setLevel: { command: 'DON' } }
			}
		} as EndpointMapping<DimmableLightDevice, Insteon.DimmerLampNode>
	}
};

/*let newMap = add(map, Insteon.DimmerLamp.Node, {
	deviceType: DimmableLightDevice,
	// @ts-ignore
	mapping: {
		// @ts-ignore
		OnOff: {
			attributes: {
				onOff: { driver: 'ST', converter: 'Percent.Boolean' ,
			},
			commands: { on: 'DON' }
		},
		//@ts-ignore
		LevelControl: {
			// @ts-ignore
			attributes: {
				currentLevel: { driver: 'ST', converter: 'Percent.LightingLevel' },
				startUpCurrentLevel: { driver: 'OL', converter: 'Percent.LightingLevel' },
				onLevel: { driver: 'OL', converter: 'Percent.LightingLevel' }
			},
			commands: { setLevel: { command: 'DON' } }
		}
	}
}});*/


MappingRegistry.register(map);
