import { DriverType } from "../Definitions/Global/Drivers.js";
import { ClusterType } from './clusterEnum.js';
export class MappingRegistry {
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
var teest;
var clusterMap = { cluster: ClusterType.ColorControl, attributes: { colorTemperatureMireds: { driver: DriverType.Status } }, commands: { moveToColor: { command: DriverType.CustomControl1, parameters: { colorX: { parameter: "colorX" }, colorY: { parameter: "colorY" }, colorTemperature: { parameter: "colorTemperature" } } } } };
const map = {
    Identify: {},
    OnOff: {
        attributes: {
            onOff: { driver: "ST" },
        },
        commands: {
            onWithTimedOff: { command: "DON" },
        }
    }
};
//# sourceMappingURL=ClusterMap.js.map