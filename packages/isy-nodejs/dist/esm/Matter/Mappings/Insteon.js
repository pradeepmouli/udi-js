import { OnOffLightDevice } from '@project-chip/matter.js/devices/OnOffLightDevice';
import { DriverType } from '../../Definitions/Global/Drivers.js';
import { Family } from '../../Definitions/Global/Families.js';
import { MappingRegistry } from '../../Model/ClusterMap.js';
//import InsteonMap from "./Insteon.json";
import { DimmableLightDevice } from '@project-chip/matter.js/devices/DimmableLightDevice';
const map = {
    Family: Family.Insteon,
    Relay: {
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
                    onOff: { driver: 'ST' }
                },
                commands: { on: 'DON' }
            },
            LevelControl: {
                attributes: {
                    currentLevel: { driver: DriverType.Status, converter: 'LevelFrom0To255.LightingLevel' }
                },
                commands: { moveToLevel: { command: 'DON' } }
            }
        }
    }
};
map.KeypadDimmer = map.Dimmer;
map.DimmerSwitch = map.Dimmer;
MappingRegistry.register(map);
//# sourceMappingURL=Insteon.js.map