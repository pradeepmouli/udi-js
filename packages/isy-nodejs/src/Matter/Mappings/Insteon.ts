
import { Family } from '../../Definitions/Global/Families.js';
import * as Insteon from '../../Devices/Insteon/index.js';


//import InsteonMap from "./Insteon.json";

import { OnOffLightDevice, DimmableLightDevice, ContactSensorDevice, OnOffPlugInUnitDevice } from '@matter/node/devices';
import {  add, MappingRegistry, type ClusterMapping, type EndpointMapping, type FamilyToClusterMap } from './MappingRegistry.js';
import  { ISYDevice } from '../../ISYDevice.js';
import type { CompositeDevice } from '../../Devices/CompositeDevice.js';
import type { BooleanState, BooleanStateCluster, Cluster } from '@project-chip/matter.js/cluster';

export let map;
	//Family: Family.Insteon,
//@ts-ignore
MappingRegistry.add({
	DoorWindowSensor: {
		deviceType: ContactSensorDevice,
		mapping: {
			booleanState: {
				attributes: {
					stateValue: { driver: 'contactSensor.status', converter: 'Percent.Boolean' }
				}
			}
		}
	}}).add({DimmerLampSwitch: {deviceType: OnOffPlugInUnitDevice, mapping: {}}}).add({
	RelayLampSwitch: {
		deviceType: OnOffLightDevice,
		mapping: {
			onOff: {
				attributes: {
					onOff: { driver: 'status', converter: 'Percent.Boolean' },

				},
				commands: { on: 'DON' },

			}
		}
	}}).add({
	DimmerLamp: {
		deviceType: DimmableLightDevice,

		mapping: {

			onOff: {
				attributes: {
					onOff: { driver: 'ST', converter: 'Percent.Boolean' }
				},
				commands: { on: 'DON' }
			},


			levelControl: {
				// @ts-ignore
				attributes: {
					currentLevel: { driver: 'ST', converter: 'Percent.LightingLevel' },
					//startUpCurrentLevel: { driver: 'OL', converter: 'Percent.LightingLevel' },
					onLevel: { driver: 'OL', converter: 'Percent.LightingLevel' }
				},
				commands: { moveToLevel: 'DON' }
			}
		}
	}}).add
	({DimmerLampSwitch: {
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
});

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
