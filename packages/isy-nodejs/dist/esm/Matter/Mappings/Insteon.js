//import InsteonMap from "./Insteon.json";
import { OnOffLightDevice, DimmableLightDevice, ContactSensorDevice, OnOffPlugInUnitDevice } from '@matter/node/devices';
import { add, MappingRegistry } from './MappingRegistry.js';
//Family: Family.Insteon,
//@ts-ignore
let map = add({ Family: 'Insteon' }).add({
    DoorWindowSensor: {
        deviceType: ContactSensorDevice,
        mapping: {
            booleanState: {
                attributes: {
                    stateValue: { driver: 'contactSensor.status', converter: 'Percent.Boolean' }
                }
            }
        }
    }
}).add({ DimmerLampSwitch: { deviceType: OnOffPlugInUnitDevice, mapping: {} } }).add({
    RelayLampSwitch: {
        deviceType: OnOffLightDevice,
        mapping: {
            onOff: {
                attributes: {
                    onOff: { driver: 'status', converter: 'Percent.Boolean' },
                },
                commands: { on: 'on' },
            }
        }
    }
}).add({
    DimmerLamp: {
        deviceType: DimmableLightDevice,
        mapping: {
            onOff: {
                attributes: {
                    onOff: { driver: 'status', converter: 'Percent.Boolean' }
                },
                commands: { on: 'on' }
            },
            levelControl: {
                // @ts-ignore
                attributes: {
                    currentLevel: { driver: 'status', converter: 'Percent.LightingLevel' },
                    //startUpCurrentLevel: { driver: 'OL', converter: 'Percent.LightingLevel' },
                    onLevel: { driver: 'onLevel', converter: 'Percent.LightingLevel' }
                },
                commands: { moveToLevel: 'on' }
            }
        }
    }
}).add({ DimmerLampSwitch: {
        deviceType: DimmableLightDevice,
        mapping: {
            OnOff: {
                attributes: {
                    onOff: { driver: 'status', converter: 'Percent.Boolean' }
                },
                commands: { on: 'DON' }
            },
            LevelControl: {
                attributes: {
                    currentLevel: { driver: 'status', converter: 'Percent.LightingLevel' },
                    //startUpCurrentLevel: { driver: 'OL', converter: 'Percent.LightingLevel' },
                    onLevel: { driver: 'onLevel', converter: 'Percent.LightingLevel' }
                },
                commands: { setLevel: { command: 'on' } }
            }
        }
    }
});
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