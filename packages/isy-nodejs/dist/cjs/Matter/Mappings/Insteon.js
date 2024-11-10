"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OnOffLightDevice_1 = require("@project-chip/matter.js/devices/OnOffLightDevice");
const Drivers_js_1 = require("../../Definitions/Global/Drivers.js");
const Families_js_1 = require("../../Definitions/Global/Families.js");
const ClusterMap_js_1 = require("../../Model/ClusterMap.js");
//import InsteonMap from "./Insteon.json";
const DimmableLightDevice_1 = require("@project-chip/matter.js/devices/DimmableLightDevice");
const map = {
    Family: Families_js_1.Family.Insteon,
    Relay: {
        deviceType: OnOffLightDevice_1.OnOffLightDevice,
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
        deviceType: OnOffLightDevice_1.OnOffLightDevice,
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
        deviceType: DimmableLightDevice_1.DimmableLightDevice,
        mapping: {
            OnOff: {
                attributes: {
                    onOff: { driver: 'ST' }
                },
                commands: { on: 'DON' }
            },
            LevelControl: {
                attributes: {
                    currentLevel: { driver: Drivers_js_1.DriverType.Status, converter: 'LevelFrom0To255.LightingLevel' }
                },
                commands: { moveToLevel: { command: 'DON' } }
            }
        }
    }
};
map.KeypadDimmer = map.Dimmer;
map.DimmerSwitch = map.Dimmer;
ClusterMap_js_1.MappingRegistry.register(map);
//# sourceMappingURL=Insteon.js.map