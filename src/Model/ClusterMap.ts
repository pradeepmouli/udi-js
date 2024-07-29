
import * as Clusters from '@project-chip/matter.js/cluster';

import { Drivers } from "../Definitions/Global/Drivers.js";

import { Family, InsteonRelayDevice, ISYDevice } from '../ISY.js';
import { type Device } from '@project-chip/matter.js/device';
import type { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import { ClusterType, ToCompleteClusterByName } from './clusterEnum.js';
import { OnOffLightDevice } from '@project-chip/matter.js/devices/OnOffLightDevice';
import { Devices, type ToDevice } from '../Devices/index.js';
import { Behavior } from '@project-chip/matter.js/behavior';
import type { ClusterForBehavior } from '../Matter/Behaviors/ISYClusterBehavior.js';


// `${const ClusterList = Object.keys(Clusters).filter(p => p instanceof Clusters.Cluster).map(p => p.constructor.name);
// var s = {...ClusterList};

// type ClusterName = ClusterList[0] | ClusterList[1];

// var ColorControl : ClusterName = "ColorControl";}`

 type ChildrenOf<T> = T extends Family.Global ? Family | typeof ISYDevice | string :
                                    T extends Family ? typeof ISYDevice | string  : string;

export type ClusterMap<T extends Family | ISYDevice<Family> | string> = T extends ISYDevice<Family>
  ? {
      deviceType: Partial<Device>;
      scope?: ChildrenOf<T>;
      mapping: [ClusterTypeMapping<ClusterType,T>];
      behavior?: typeof ClusterBehavior;
    }
  : {
      scope?: ChildrenOf<T>;
      mapping: [ClusterTypeMapping<ClusterType,any>];
      behavior?: typeof ClusterBehavior;
    };





//ype GenericCluster = Clusters.OnOffCluster | Clusters.ColorControl.Complete | Clusters.LevelControl.Cluster;




export type DeviceToClusterMap<T extends ISYDevice<Family>> =
{

    deviceType: Partial<Device>;
    scope?: string;
    mapping: {[Type in ClusterType]?:ClusterTypeMapping<Type,T>};
    behavior?: typeof ClusterBehavior;

}

export  class MappingRegistry
{
    static map: Map<string,DeviceToClusterMap<any>> = new Map();

    static register(map: Partial<FamilyToClusterMap<any>>)
    {
        for(var key in map)
        {
            MappingRegistry.map.set(key, map[key]);
        }
    }
    static getMapping<T extends ISYDevice<any,any,any>>(device: T) : DeviceToClusterMap<T>
    {
        return MappingRegistry.map.get(device.constructor.name);

    }

    static getMappingForBehavior<T extends ISYDevice<any,any,any>, B extends ClusterBehavior>(device: T, behavior: B) : ClusterMapping<B["cluster"],T>
    {
        var m = MappingRegistry.getMapping(device);

        return m[behavior.cluster.name];
        // for(var m in MappingRegistry.getMapping(device).mapping)
        // {
        //   if(behavior.cluster.name === m)
        //     return MappingRegistry.getMapping(device).mapping[m];

        // }

    }
}

export type FamilyToClusterMap<T extends Family.Insteon | Family.ZWave | Family.ZigBee> =
{


    [Type in keyof Devices<T>] : DeviceToClusterMap<InstanceType<ToDevice<Type>>>;
}


//export type FamilyToDeviceMap<T extends Family> = Record<keyof Devices<T>, DeviceToClusterMap<ISYDevice<T>>>;


export type ClusterTypeMapping<A extends ClusterType,K extends ISYDevice<any>> = {

    attributes: ClusterTypeAttributeMapping<A,K>,
    commands: ClusterTypeCommandMapping<A,K>
};


export type ClusterMapping<A, K extends ISYDevice<any>> =
{
      attributes: ClusterAttributeMapping<A, K>;
      commands: ClusterCommandMapping<A, K>;

};






const ClusterIdentifier = Object.values(Clusters).filter(p=> p instanceof Clusters.MutableCluster && typeof p == "object" && p.constructor.name.endsWith(".Cluster"));
type clusterList = keyof typeof ClusterIdentifier;

export type ClusterMappings = {
   OnOffCluster: ClusterTypeMapping<ClusterType.OnOff,ISYDevice<Family>>
}




export type DriversOf<T> = T extends ISYDevice<any, infer B, any> | typeof ISYDevice<any, infer B, any> ? B : never;

export type CommandsOf<T> = T extends ISYDevice<any, any, infer C> ? C : never;

type ClusterTypeAttributeMapping<A extends ClusterType, K extends ISYDevice<Family>> = {
  [key in keyof Clusters.ClusterType.AttributesOf<ToCompleteClusterByName<A>>]?:
    | { driver: DriversOf<K>; converter?: string }
    | DriversOf<K>;
};



type ClusterAttributeMapping<A,K extends ISYDevice<Family>> = {
    [key in keyof Clusters.ClusterType.AttributesOf<A>]?:{driver: DriversOf<K>, converter?: (value: any) => any}|DriversOf<K>
};


type ClusterTypeCommandMapping<A extends ClusterType, K extends ISYDevice<Family>> = {
  [key in keyof Clusters.ClusterType.CommandsOf<ToCompleteClusterByName<A>>]?:
    | { command: keyof CommandsOf<K>; parameters?: parameterMapping }
    | CommandsOf<K>
};

type ClusterCommandMapping<A, K extends ISYDevice<Family>> = {
  [key in keyof Clusters.ClusterType.CommandsOf<A>]?:
    | { command: keyof CommandsOf<K>; parameters?: parameterMapping }
    | CommandsOf<K>;
};



type parameterMapping = {
    [key: string]: {parameter: string, converter?: (string)}
}



var clusterMap = {cluster: ClusterType.ColorControl, attributes: {colorTemperatureMireds:{driver: Drivers.Status}},commands: {moveToColor: {command: Drivers.CustomControl1, parameters: {colorX: {parameter: "colorX"}, colorY: {parameter: "colorY"}, colorTemperature: {parameter: "colorTemperature"}}}}};


const map: DeviceToClusterMap<InsteonRelayDevice> = {
  deviceType: OnOffLightDevice,
  mapping: {OnOff:
    {
      attributes: {
        onOff: { driver: Drivers.Status },
      },
      commands:  {on: Drivers.On, off: Drivers.Off },
    },
  }
};
