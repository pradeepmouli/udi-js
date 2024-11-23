import { Family } from '../../Definitions/Global/Families.js';
//import InsteonMap from "./Insteon.json";
import { OnOffLightDevice, DimmableLightDevice } from '@matter/node/devices';
import { MappingRegistry } from './MappingRegistry.js';
export const map = {
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
        }
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
        }
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
//# sourceMappingURL=Insteon.js.map