import { BridgedDeviceBasicInformationBehavior } from '@matter/node/behaviors';
import { DriverType } from '../../Definitions/Global/Drivers.js';
import { Family } from '../../Definitions/index.js';
import { NodeFactory } from '../../Devices/NodeFactory.js';
import { Devices, Insteon } from '../../Devices/index.js';
import { ClusterType } from '../../Model/ClusterType.js';
import { ISYBridgedDeviceBehavior } from '../Behaviors/ISYBridgedDeviceBehavior.js';
import { ISYDevice } from '../../ISYDevice.js';
function addA(mapping1, mapping2) {
    return { deviceType: mapping1.deviceType, nodeType: mapping1.nodeType, mapping: { ...mapping1.mapping, ...mapping2.mapping } };
}
export function add(This, mapping) {
    return { ...This, ...mapping };
}
// #endregion Type aliases (16)
// #region Classes (1)
export class MappingRegistry {
    // #region Properties (1)
    static map = new Map();
    static cache = {};
    // #endregion Properties (1)
    // #region Public Static Methods (3)
    static getMapping(device) {
        let m = this.cache[device.address];
        if (!m) {
            if (ISYDevice.isNode(device)) {
                if (MappingRegistry.map.has(device.family)) {
                    let g = MappingRegistry.map.get(device.family);
                    //let m: DeviceToClusterMap<T,MutableEndpoint>;
                    if (g.has(device.constructor.name)) {
                        m = g.get(device.constructor.name);
                    }
                    else if (g.has(device.nodeDefId)) {
                        m = g.get(device.nodeDefId);
                    }
                    else if (g.has(device.type)) {
                        m = g.get(device.type);
                    }
                    if (!m) {
                        for (var nodeDefId of NodeFactory.getImplements(device)) {
                            if (g.has(nodeDefId)) {
                                device.logger(`Mapping found to ${Family[device.family]}.${nodeDefId}`, 'info');
                                m = g.get(nodeDefId);
                                g.set(device.nodeDefId, m);
                                break;
                            }
                        }
                    }
                    if (m !== null)
                        this.cache[device.address] = m;
                }
            }
        }
        return m;
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
        if ('Family' in map) {
            let regMap;
            if (!MappingRegistry.map.has(map.Family)) {
                MappingRegistry.map.set(map.Family, new Map());
            }
            regMap = MappingRegistry.map.get(map.Family);
            for (var key in map) {
                if (key !== 'Family') {
                    let m = map[key];
                    m = { deviceType: m.deviceType.with(BridgedDeviceBasicInformationBehavior, ISYBridgedDeviceBehavior), mapping: m.mapping };
                    for (var key2 in m.mapping.attributes) {
                        let attribute = m.mapping.attributes[key2];
                        for (var key3 in attribute[key3]) {
                            let d = attribute[key3];
                            if (typeof d === 'string') {
                                m.mapping.attributes[key2][key3] = Insteon[key].Drivers[d];
                            }
                            else if (d.driver) {
                                m.mapping.attributes[key2][key3].driver = Insteon[key].Drivers[d.driver];
                            }
                        }
                    }
                    regMap.set(key, m);
                    regMap.set(Insteon[key]?.name, m);
                    regMap.set(Insteon[key].nodeDefId, m);
                    //TODO: This is a hack to allow for the Insteon devices to be registered by name
                }
            }
        }
        else {
            let regMap;
            for (var key in map) {
                const keys = key.split('.');
                let x = Devices[keys[0]][keys[1]];
                if (!MappingRegistry.map.has(x.family)) {
                    MappingRegistry.map.set(x.family, new Map());
                }
                //{family, key} = key.split(".")[0]
                regMap = MappingRegistry.map.get(x.family);
                let m = map[key];
                let deviceType = m.deviceType;
                deviceType = deviceType.with(BridgedDeviceBasicInformationBehavior, ISYBridgedDeviceBehavior);
                m = { deviceType: deviceType, mapping: m.mapping };
                regMap.set(keys[1], m);
                regMap.set(x.name, m);
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
/*interface SimplyEndpointMapping<T extends ISYNode<Family, any, any, any>, K extends MutableEndpoint> extends SimplifyDeep<ISYtoMatterMapping<T, K>> {}*/
/*
const map = {
    deviceType: DimmableLightDevice,
    mapping: {

        onOff: {
            attributes: {
            onOff: { driver: 'ST', converter: 'Percent.Boolean' },

            },
            commands: {
                onWithTimedOff: { command: 'DON' },

            }
        },
        levelControl: {
            attributes: {


            }
        }
    }
} as Mapping<Insteon.RelayLampNode, DimmableLightDevice>;
*/
// #endregion Variables (3)
//# sourceMappingURL=MappingRegistry.js.map