"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappingRegistry = void 0;
const Drivers_js_1 = require("../Definitions/Global/Drivers.js");
const clusterEnum_js_1 = require("./clusterEnum.js");
const OnOffLightDevice_1 = require("@project-chip/matter.js/devices/OnOffLightDevice");
class MappingRegistry {
    static map = new Map();
    static register(map) {
        for (var key in map) {
            MappingRegistry.map.set(key, map[key]);
        }
    }
    static getMapping(device) {
        return MappingRegistry.map.get(device.constructor.name);
    }
    static getMappingForBehavior(device, behavior) {
        var m = MappingRegistry.getMapping(device);
        return m[behavior.cluster.name];
        // for(var m in MappingRegistry.getMapping(device).mapping)
        // {
        //   if(behavior.cluster.name === m)
        //     return MappingRegistry.getMapping(device).mapping[m];
        // }
    }
}
exports.MappingRegistry = MappingRegistry;
var teest;
var tts = teest.Relay.mapping.OnOff.attributes.onOff;
var clusterMap = { cluster: clusterEnum_js_1.ClusterType.ColorControl, attributes: { colorTemperatureMireds: { driver: Drivers_js_1.DriverType.Status } }, commands: { moveToColor: { command: Drivers_js_1.DriverType.CustomControl1, parameters: { colorX: { parameter: "colorX" }, colorY: { parameter: "colorY" }, colorTemperature: { parameter: "colorTemperature" } } } } };
const map = {
    deviceType: OnOffLightDevice_1.OnOffLightDevice,
    mapping: { OnOff: {
            attributes: {
                onOff: { driver: "DON" },
            },
            commands: { on: Drivers_js_1.DriverType.On, off: Drivers_js_1.DriverType.Off },
        },
    }
};
