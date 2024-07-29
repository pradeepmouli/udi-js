import * as Clusters from '@project-chip/matter.js/cluster';
import { Drivers } from "../Definitions/Global/Drivers.js";
import { ClusterType } from './clusterEnum.js';
import { OnOffLightDevice } from '@project-chip/matter.js/devices/OnOffLightDevice';
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
const ClusterIdentifier = Object.values(Clusters).filter(p => p instanceof Clusters.MutableCluster && typeof p == "object" && p.constructor.name.endsWith(".Cluster"));
var clusterMap = { cluster: ClusterType.ColorControl, attributes: { colorTemperatureMireds: { driver: Drivers.Status } }, commands: { moveToColor: { command: Drivers.CustomControl1, parameters: { colorX: { parameter: "colorX" }, colorY: { parameter: "colorY" }, colorTemperature: { parameter: "colorTemperature" } } } } };
const map = {
    deviceType: OnOffLightDevice,
    mapping: { OnOff: {
            attributes: {
                onOff: { driver: Drivers.Status },
            },
            commands: { on: Drivers.On, off: Drivers.Off },
        },
    }
};
