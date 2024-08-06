import { DriverType } from "../../Definitions/Global/Drivers.js";
import { MappingRegistry } from "../../Model/ClusterMap.js";
import { OnOffLightDevice } from "@project-chip/matter.js/devices/OnOffLightDevice";
//import InsteonMap from "./Insteon.json";
import { DimmableLightDevice } from "@project-chip/matter.js/devices/DimmableLightDevice";
//@ts-ignore
const map = {
    Relay: {
        deviceType: OnOffLightDevice,
        mapping: {
            OnOff: {
                attributes: {
                    onOff: { driver: "ST", converter: "Converters.Standard.LevelFrom0To255?.Boolean?.to" },
                },
                commands: { on: 'DON', off: DriverType.Off },
            },
        },
    },
    RelaySwitch: {
        deviceType: OnOffLightDevice,
        mapping: {
            OnOff: {
                attributes: {
                    onOff: "ST",
                },
                commands: { on: DriverType.On, off: DriverType.Off },
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