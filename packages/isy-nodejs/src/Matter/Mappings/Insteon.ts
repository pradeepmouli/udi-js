import { OnOffLightDevice } from '@project-chip/matter.js/devices/OnOffLightDevice';
import { DriverType } from '../../Definitions/Global/Drivers.js';
import { Family, type t } from '../../Definitions/Global/Families.js';
import { Insteon } from '../../Devices/Insteon/index.js';
import { Devices } from '../../Devices/index.js';
import { MappingRegistry, type DeviceToClusterMap, type EndpointMapping, type FamilyToClusterMap } from '../../Model/ClusterMap.js';

//import InsteonMap from "./Insteon.json";
import { DimmableLightDevice } from '@project-chip/matter.js/devices/DimmableLightDevice';
import { Converter } from '../../Converters.js';
import type { InsteonRelaySwitchDevice } from '../../Devices/Insteon/InsteonRelaySwitchDevice.js';
import { OnOffLightSwitchDevice } from '@matter/node/devices';

const map: FamilyToClusterMap<Family.Insteon> = {
	Family: Family.Insteon,
	Relay: {
		deviceType: OnOffLightDevice,
		mapping: {
			OnOff: {
				attributes: {
					onOff: { driver: 'ST', converter: 'LevelFrom0To255.Boolean' }
				},
				commands: { on: 'DON' }
			}
		} as EndpointMapping<OnOffLightDevice, Insteon.RelaySwitch>
	},
	RelaySwitch: {
		deviceType: OnOffLightSwitchDevice,
		mapping: {
			OnOff: {
				attributes: {
					onOff: { driver: 'ST', converter: 'LevelFrom0To255.Boolean' }
				},
				commands: { on: 'DON' }
			}
		}
	},
	Dimmer: {
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
		} as EndpointMapping<DimmableLightDevice, Insteon.Dimmer>
	}
};

map.KeypadDimmer = map.Dimmer;
map.DimmerSwitch = map.Dimmer;

MappingRegistry.register(map);
