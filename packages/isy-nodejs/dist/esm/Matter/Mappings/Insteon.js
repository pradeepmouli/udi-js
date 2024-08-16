import { DriverType } from "../../Definitions/Global/Drivers.js";
import { MappingRegistry } from "../../Model/ClusterMap.js";
import { OnOffLightDevice } from "@project-chip/matter.js/devices/OnOffLightDevice";
//import InsteonMap from "./Insteon.json";
import { DimmableLightDevice } from "@project-chip/matter.js/devices/DimmableLightDevice";
const map = {
    Relay: {
        deviceType: OnOffLightDevice,
        mapping: {
            OnOff: {
                attributes: {
                    onOff: { driver: "ST" },
                },
                commands: { on: 'DON' },
            },
        }
    },
    RelaySwitch: {
        deviceType: OnOffLightDevice,
        mapping: {
            OnOff: {
                attributes: {
                    onOff: "ST",
                },
                commands: { on: "DON" },
            },
        },
    },
    Dimmer: {
        deviceType: DimmableLightDevice,
        mapping: {
            OnOff: {
                attributes: {
                    onOff: { driver: "ST" },
                },
                commands: { on: "DON", off: DriverType.Off },
            },
            LevelControl: {
                attributes: {
                    currentLevel: { driver: DriverType.Status },
                },
                commands: { moveToLevel: { command: 'DON' } },
            },
        },
    },
};
MappingRegistry.register(map);
//# sourceMappingURL=Insteon.js.map