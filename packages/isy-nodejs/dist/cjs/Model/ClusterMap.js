"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappingRegistry = void 0;
const Drivers_js_1 = require("../Definitions/Global/Drivers.js");
const index_js_1 = require("../Devices/Insteon/index.js");
const ClusterType_js_1 = require("./ClusterType.js");
// #endregion Type aliases (16)
// #region Classes (1)
class MappingRegistry {
    // #region Properties (1)
    static map = new Map();
    // #endregion Properties (1)
    // #region Public Static Methods (3)
    static getMapping(device) {
        return MappingRegistry.map.get(device.constructor.name);
    }
    static getMappingForBehavior(device, behavior) {
        //var m = MappingRegistry.getMapping(device);
        //return m[behavior.cluster.name];
        for (var m in MappingRegistry.getMapping(device).mapping) {
            if (behavior.cluster.name === m)
                return MappingRegistry.getMapping(device).mapping[m];
        }
    }
    static register(map) {
        for (var key in map) {
            if (key !== 'Family') {
                MappingRegistry.map.set(key, map[key]);
                MappingRegistry.map.set(index_js_1.Insteon[key].name, map[key]);
            }
        }
    }
}
exports.MappingRegistry = MappingRegistry;
// #endregion Classes (1)
// #region Variables (3)
var teest;
var clusterMap = {
    cluster: ClusterType_js_1.ClusterType.ColorControl,
    attributes: { colorTemperatureMireds: { driver: Drivers_js_1.DriverType.Status } },
    commands: {
        moveToColor: { command: Drivers_js_1.DriverType.CustomControl1, parameters: { colorX: { parameter: 'colorX' }, colorY: { parameter: 'colorY' }, colorTemperature: { parameter: 'colorTemperature' } } }
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