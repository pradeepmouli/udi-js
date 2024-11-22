
import { Family } from '../../Definitions/Global/Families.js';
import * as Insteon from '../../Devices/Insteon/index.js';
import { MappingRegistry, type EndpointMapping, type FamilyToClusterMap } from '../../Model/ClusterMap.js';

//import InsteonMap from "./Insteon.json";

import { OnOffLightDevice, DimmableLightDevice } from '@matter/node/devices';

const map: FamilyToClusterMap<Family.Insteon> = {
	Family: Family.Insteon,

	RelayLamp: {
		deviceType: OnOffLightDevice,
		mapping: {
			OnOff: {
				attributes: {
					onOff: { driver: 'ST', converter: 'LevelFrom0To255.Boolean' }
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
					onOff: { driver: 'ST', converter: 'LevelFrom0To255.Boolean' }
				},
				commands: { on: 'DON' }
			}
		}
,},
	DimmerLamp: {
		deviceType: DimmableLightDevice,
		// @ts-ignore
		mapping: {
			// @ts-ignore
			OnOff: {
				attributes: {
					onOff: { driver: 'ST', converter: 'LevelFrom0To255.Boolean' }
				},
				commands: { on: 'DON' }
			},
			LevelControl: {
				// @ts-ignore
				attributes: {
					currentLevel: { driver: 'ST', converter: 'LevelFrom0To255.LightingLevel' },
					startUpCurrentLevel: { driver: 'OL', converter: 'LevelFrom0To255.LightingLevel' },
					onLevel: { driver: 'OL', converter: 'LevelFrom0To255.LightingLevel' }
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
					onOff: { driver: 'ST', converter: 'LevelFrom0To255.Boolean' }
				},
				commands: { on: 'DON' }
			},
			LevelControl: {
				// @ts-ignore
				attributes: {
					currentLevel: { driver: 'ST', converter: 'LevelFrom0To255.LightingLevel' },
					startUpCurrentLevel: { driver: 'OL', converter: 'LevelFrom0To255.LightingLevel' },
					onLevel: { driver: 'OL', converter: 'LevelFrom0To255.LightingLevel' }
				},
				commands: { setLevel: { command: 'DON' } }
			}
		} as EndpointMapping<DimmableLightDevice, Insteon.DimmerLampNode>
	}
};


MappingRegistry.register(map);
