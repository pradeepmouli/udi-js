//import InsteonMap from "./Insteon.json";
import { OnOffLightDevice, DimmableLightDevice, ContactSensorDevice } from '@matter/node/devices';
import { add, MappingRegistry } from './MappingRegistry.js';
export let map = {
    //Family: Family.Insteon,
    DoorWindowSensor: {
        deviceType: ContactSensorDevice,
        mapping: {
            booleanState: {
                attributes: {
                    stateValue: { driver: 'contactSensor.status', converter: 'Percent.Boolean' }
                }
            }
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
        }
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
        }
    }
};
map = add(map, { KeypadRelay: map.DimmerLampSwitch });
map.KeypadRelay = { ...map.RelayLamp };
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