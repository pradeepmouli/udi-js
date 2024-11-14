import { OnOffCluster } from '@project-chip/matter.js/cluster';
import { DeviceTypeDefinition, DeviceTypes, OnOffBaseDevice } from '@project-chip/matter.js/device';
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

const map: FamilyToClusterMap<Family.Insteon> = {
	Family: Family.Insteon,
	Relay: {
		deviceType: OnOffLightDevice,
		mapping: {
			OnOff: {
				attributes: {
					onOff: 'ST'
				},
				commands: { on: 'DON' }
			}
		} as EndpointMapping<OnOffLightDevice, Insteon.Relay>
	},
	RelaySwitch: {
		deviceType: OnOffLightDevice,
		mapping: {
			OnOff: {
				attributes: {
					onOff: 'ST'
				},
				commands: { on: 'DON' }
			}
		}
	},
	Dimmer: {
		deviceType: DimmableLightDevice,
		mapping: {
			OnOff: {
				attributes: {
					onOff: { driver: 'ST', converter: 'LevelFrom0To255.Boolean' }
				},
				commands: { on: 'DON' }
			},
			LevelControl: {
				attributes: {
					currentLevel: { driver: 'ST', converter: 'LevelFrom0To255.LightingLevel' }
				},
				commands: { setLevel: { command: 'DON' } }
			}
		}
	}
};

map.KeypadDimmer = map.Dimmer;
map.DimmerSwitch = map.Dimmer;

MappingRegistry.register(map);
