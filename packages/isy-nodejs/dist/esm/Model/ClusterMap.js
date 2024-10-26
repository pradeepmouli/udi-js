import { DriverType } from '../Definitions/Global/Drivers.js';
import { ClusterType } from './ClusterType.js';
// #endregion Type aliases (15)
// #region Classes (1)
export class MappingRegistry {
    // #region Properties (1)
    static map = new Map();
    // #endregion Properties (1)
    // #region Public Static Methods (3)
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
    static register(map) {
        for (var key in map) {
            MappingRegistry.map.set(key, map[key]);
        }
    }
}
// #endregion Classes (1)
// #region Variables (3)
var teest;
var clusterMap = {
    cluster: ClusterType.ColorControl,
    attributes: { colorTemperatureMireds: { driver: DriverType.Status } },
    commands: {
        moveToColor: { command: DriverType.CustomControl1, parameters: { colorX: { parameter: 'colorX' }, colorY: { parameter: 'colorY' }, colorTemperature: { parameter: 'colorTemperature' } } }
    }
};
const map = {
    Identify: {},
    OnOff: {
        attributes: {
            onOff: { driver: 'ST' }
        },
        commands: {
            onWithTimedOff: { command: 'DON' }
        }
    }
};
// #endregion Variables (3)
//# sourceMappingURL=ClusterMap.js.map