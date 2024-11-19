import { DriverType } from '../Definitions/Global/Drivers.js';
import { Devices } from '../Devices/index.js';
import { Insteon } from '../Devices/Insteon/index.js';
import { ClusterType } from './ClusterType.js';
// #endregion Type aliases (16)
// #region Classes (1)
export class MappingRegistry {
    // #region Properties (1)
    static map = new Map();
    // #endregion Properties (1)
    // #region Public Static Methods (3)
    static getMapping(device) {
        if (MappingRegistry.map.has(device.family)) {
            let g = MappingRegistry.map.get(device.family);
            if (g.has(device.constructor.name)) {
                return g.get(device.constructor.name);
            }
            else if (g.has(device.nodeDefId)) {
                return g.get(device.nodeDefId);
            }
            else if (g.has(device.type)) {
                return g.get(device.type);
            }
        }
        return null;
    }
    static getMappingForBehavior(device, behavior) {
        //var m = MappingRegistry.getMapping(device);
        //return m[behavior.cluster.name];
        for (var m in MappingRegistry.getMapping(device).mapping) {
            if (behavior.cluster.name === m)
                return MappingRegistry.getMapping(device).mapping[m];
        }
    }
    //@ts-ignore
    static register(map) {
        if ("Family" in map) {
            let regMap;
            if (!MappingRegistry.map.has(map.Family)) {
                MappingRegistry.map.set(map.Family, new Map());
            }
            regMap = MappingRegistry.map.get(map.Family);
            for (var key in map) {
                if (key !== 'Family') {
                    regMap.set(key, map[key]);
                    regMap.set(Insteon[key]?.name, map[key]); //TODO: This is a hack to allow for the Insteon devices to be registered by name
                }
            }
        }
        else {
            let regMap;
            for (var key in map) {
                const keys = key.split(".");
                let x = Devices[keys[0]][keys[1]];
                if (!MappingRegistry.map.has(x.family)) {
                    MappingRegistry.map.set(x.family, new Map());
                }
                //{family, key} = key.split(".")[0]
                regMap = MappingRegistry.map.get(x.family);
                regMap.set(keys[1], map[key]);
                regMap.set(x.name, map[key]);
            }
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
/*const map: EndpointMapping<OnOffLightDevice, InsteonRelayDevice> = {
    Identify: {},
    OnOff: {
        attributes: {
            onOff: { driver: 'ST' }
        },
        commands: {
            onWithTimedOff: { command: 'DON' }
        }
    }
};*/
// #endregion Variables (3)
//# sourceMappingURL=ClusterMap.js.map