
import { DriverType } from '../../Definitions/Global/Drivers.js';
import { Family, type t } from '../../Definitions/Global/Families.js';
import  * as Insteon from '../../Devices/Insteon/index.js';
import { Devices } from '../../Devices/index.js';
import { MappingRegistry, type DeviceToClusterMap, type EndpointMapping, type FamilyToClusterMap } from '../../Model/ClusterMap.js';

//import InsteonMap from "./Insteon.json";

import { Converter } from '../../Converters.js';
import type { InsteonRelaySwitchDevice } from '../../Devices/Insteon/InsteonRelaySwitchDevice.js';
import { DimmerSwitchDevice, GenericSwitchDevice, OnOffLightSwitchDevice, OnOffLightDevice, DimmableLightDevice } from '@matter/node/devices';
import type { Identity } from '@matter/general';
import { SwitchServer } from '@matter/node/behaviors';
import type { Device } from '@project-chip/matter.js/device';
import type { MutableEndpoint } from '@matter/node';

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
