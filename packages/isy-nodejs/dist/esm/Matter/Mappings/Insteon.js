import { OnOffLightDevice } from '@project-chip/matter.js/devices/OnOffLightDevice';
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
                    onOff: 'ST'
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
        }
    }
};
map.KeypadDimmer = map.Dimmer;
map.DimmerSwitch = map.Dimmer;
MappingRegistry.register(map);
//# sourceMappingURL=Insteon.js.map