
import { Family } from '../../Definitions/Global/Families.js';
import * as Insteon from '../../Devices/Insteon/index.js';


//import InsteonMap from "./Insteon.json";

import { OnOffLightDevice, DimmableLightDevice, ContactSensorDevice } from '@matter/node/devices';
import {  MappingRegistry, type ClusterMapping, type EndpointMapping, type FamilyToClusterMap } from './MappingRegistry.js';
import  { ISYDevice } from '../../ISYDevice.js';
import type { CompositeDevice } from '../../Devices/CompositeDevice.js';
import type { BooleanState, BooleanStateCluster, Cluster } from '@project-chip/matter.js/cluster';

export const map: FamilyToClusterMap<Family.Insteon> = {
	Family: Family.Insteon,

	DoorWindowSensor: {
		deviceType: ContactSensorDevice,
		mapping: {
			BooleanState: {
				attributes: {
					stateValue: { driver: 'contactSensor.status', converter: 'Percent.Boolean' }
				}
			} as ClusterMapping<BooleanStateCluster, InstanceType<typeof Insteon.DoorWindowSensor.Device>>
		}
	},
	RelayLampSwitch: {
		deviceType: OnOffLightDevice,
		mapping: {
			OnOff: {
				attributes: {
					onOff: { driver: 'status', converter: 'Percent.Boolean' }
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
					//startUpCurrentLevel: { driver: 'OL', converter: 'Percent.LightingLevel' },
					onLevel: { driver: 'OL', converter: 'Percent.LightingLevel' }
				},
				commands: { setLevel: { command: 'DON' } }
			}
		} as EndpointMapping<DimmableLightDevice, InstanceType<typeof Insteon.DimmerLamp.Node>>
	},
	DimmerLampSwitch: {
		deviceType: DimmableLightDevice,
		// @ts-ignore
		mapping: {

			OnOff: {
				attributes: {
					onOff: { driver: 'ST', converter: 'Percent.Boolean' }
				},
				commands: { on: 'DON' }
			},
			LevelControl: {

				attributes: {
					currentLevel: { driver: 'ST', converter: 'Percent.LightingLevel' },
					//startUpCurrentLevel: { driver: 'OL', converter: 'Percent.LightingLevel' },
					onLevel: { driver: 'OL', converter: 'Percent.LightingLevel' }

				},
				commands: { setLevel: { command: 'DON' } }
			}
		} as EndpointMapping<DimmableLightDevice, InstanceType<typeof Insteon.DimmerLamp.Node>>
	}
};

map.KeypadDimmer = {...map.DimmerLamp};
map.KeypadRelay = {...map.RelayLamp};

type test = CompositeDevice.DriverNamesOf<Insteon.DoorWindowSensor.Device>



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
