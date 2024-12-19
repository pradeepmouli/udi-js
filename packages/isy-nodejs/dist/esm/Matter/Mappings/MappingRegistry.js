import { BridgedDeviceBasicInformationBehavior } from '@matter/node/behaviors';
import { DriverType } from '../../Definitions/Global/Drivers.js';
import { Family } from '../../Definitions/index.js';
import { NodeFactory } from '../../Devices/NodeFactory.js';
import { Devices as DevicesNS } from '../../Devices/index.js';
import { ClusterType } from '../../Model/ClusterType.js';
import { ISYBridgedDeviceBehavior } from '../Behaviors/ISYBridgedDeviceBehavior.js';
import { ISYDevice } from '../../ISYDevice.js';
function addA(mapping1, mapping2) {
    return { deviceType: mapping1.deviceType, nodeType: mapping1.nodeType, mapping: { ...mapping1.mapping, ...mapping2.mapping } };
}
export function add(This, mapping) {
    let m = { ...This, ...mapping };
    //@ts-ignore
    let s = {
        ...m,
        add(mapping2) {
            return add(m, mapping2);
        }
    };
    return s;
}
export function hasConverter(mapping) {
    return typeof mapping === 'object' && 'converter' in mapping;
}
function create(mapping) {
    let mapping1 = {
        ...mapping,
        add(mapping2) {
            return add(mapping1, mapping2);
        }
    };
    return mapping1;
}
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
                if (MappingRegistry.map.has(Family[device.family])) {
                    let g = MappingRegistry.map.get(Family[device.family]);
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
    static add(mapping) {
        MappingRegistry.register(mapping);
        return MappingRegistry;
    }
    //@ts-ignore
    static register(map, family) {
        if ('Family' in map) {
            let regMap;
            let Devices = DevicesNS[map.Family];
            if (!MappingRegistry.map.has(map.Family)) {
                MappingRegistry.map.set(map.Family, new Map());
            }
            regMap = MappingRegistry.map.get(map.Family);
            for (var key in map) {
                if (key !== 'Family' && key !== 'add') {
                    let m = map[key];
                    m = { deviceType: m.deviceType.with(BridgedDeviceBasicInformationBehavior, ISYBridgedDeviceBehavior), mapping: m.mapping };
                    if (m.mapping != undefined) {
                        for (var key1 in m.mapping) {
                            for (var key2 in m.mapping[key1].attributes) {
                                let attribute = m.mapping[key1].attributes[key2];
                                {
                                    let d = attribute;
                                    try {
                                        if (typeof d === 'string') {
                                            m.mapping[key1].attributes[key2] = Devices[key]?.Drivers[d];
                                        }
                                        else if (hasConverter(m.mapping[key1].attributes[key2])) {
                                            //@ts-ignore
                                            m.mapping[key1].attributes[key2].driver = Devices[key].Drivers[d.driver];
                                        }
                                    }
                                    catch {
                                        console.log('Error', key, key1, key2, d);
                                    }
                                }
                            }
                        }
                    }
                    console.log('Registering', JSON.stringify({ keys: [key, Devices[key]?.Class?.name, Devices[key]?.Class?.nodeDefId], mapping: m }));
                    regMap.set(key, m);
                    regMap.set(Devices[key]?.Class?.name, m);
                    regMap.set(Devices[key].Class?.nodeDefId, m);
                }
            }
        } /*else {
            let regMap: Map<string, DeviceToClusterMap<any, any>>;
            for (var key in map) {
                const keys = key.split('.');
                let x = DevicesNS[keys[0]][keys[1]] as typeof ISYNode<any, any, any, any>;
                if (!MappingRegistry.map.has(Family[x.family] as keyof typeof Family)) {
                    MappingRegistry.map.set(Family[x.family] as keyof typeof Family, new Map());
                }
                //{family, key} = key.split(".")[0]

                regMap = MappingRegistry.map.get(Family[x.family] as keyof typeof Family);
                let m = map[key] as DeviceToClusterMap<ISYDevice.Any, MutableEndpoint>;
                let deviceType = m.deviceType;
                deviceType = deviceType.with(BridgedDeviceBasicInformationBehavior, ISYBridgedDeviceBehavior);

                m = { deviceType: deviceType, mapping: m.mapping };

                regMap.set(keys[1], m);
                regMap.set(x.name, m);
            }
        }
    }*/
        // #endregion Public Static Methods (3)
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