"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MappingRegistry = void 0;
const Clusters = __importStar(require("@project-chip/matter.js/cluster"));
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
const ClusterIdentifier = Object.values(Clusters).filter(p => p instanceof Clusters.MutableCluster && typeof p == "object" && p.constructor.name.endsWith(".Cluster"));
var clusterMap = { cluster: clusterEnum_js_1.ClusterType.ColorControl, attributes: { colorTemperatureMireds: { driver: Drivers_js_1.Drivers.Status } }, commands: { moveToColor: { command: Drivers_js_1.Drivers.CustomControl1, parameters: { colorX: { parameter: "colorX" }, colorY: { parameter: "colorY" }, colorTemperature: { parameter: "colorTemperature" } } } } };
const map = {
    deviceType: OnOffLightDevice_1.OnOffLightDevice,
    mapping: { OnOff: {
            attributes: {
                onOff: { driver: Drivers_js_1.Drivers.Status },
            },
            commands: { on: Drivers_js_1.Drivers.On, off: Drivers_js_1.Drivers.Off },
        },
    }
};
