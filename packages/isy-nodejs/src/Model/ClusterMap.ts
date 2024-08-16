
import * as Clusters from '@project-chip/matter.js/cluster';

import { Driver, DriverType } from "../Definitions/Global/Drivers.js";

import { Family, InsteonRelayDevice } from '../ISY.js';
import { type Device, type DeviceTypeDefinition, type OnOffBaseDevice } from '@project-chip/matter.js/device';
import { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import { ClusterType } from './clusterEnum.js';
import { OnOffLightDevice } from '@project-chip/matter.js/devices/OnOffLightDevice';
import { Devices, type ToDevice } from '../Devices/index.js';
import { Behavior } from '@project-chip/matter.js/behavior';
import type { ClusterForBehavior } from '../Matter/Behaviors/ISYClusterBehavior.js';
import type { ISYDevice } from '../ISYDevice.js';
import test from 'node:test';
import { SupportedBehaviors } from '@project-chip/matter.js/endpoint/properties';
import type { MutableEndpoint } from '@project-chip/matter.js/endpoint/type';
import type { OnOffBehavior } from '@project-chip/matter.js/behaviors/on-off';
import type { Identity } from '@project-chip/matter.js/util';
import type { CommandsOf, DriversOf } from '../ISYNode.js';


// `${const ClusterList = Object.keys(Clusters).filter(p => p instanceof Clusters.Cluster).map(p => p.constructor.name);
// var s = {...ClusterList};

// type ClusterName = ClusterList[0] | ClusterList[1];

// var ColorControl : ClusterName = "ColorControl";}`

//  type ChildrenOf<T> = T extends Family.Global ? Family | ISYDevice | string :
//                                     T extends Family ? ISYDevice | string  : string;

// export type ClusterMap<T extends Family | ISYDevice<Family> | string> = T extends ISYDevice<Family>
//   ? {
//       deviceType: Partial<Device>;
//       scope?: ChildrenOf<T>;
//       mapping: [ClusterTypeMapping<ClusterType,T>];
//       behavior?: typeof ClusterBehavior;
//     }
//   : {
//       scope?: ChildrenOf<T>;
//       mapping: [ClusterTypeMapping<ClusterType,any>];
//       behavior?: typeof ClusterBehavior;
//     };





//ype GenericCluster = Clusters.OnOffCluster | Clusters.ColorControl.Complete | Clusters.LevelControl.Cluster;




// export type DeviceToClusterMap<T extends ISYDevice<Family,any,any>> =
// {

//     deviceType: Partial<Device>;
//     scope?: string;
//     mapping: {[Type in ClusterType]?:ClusterTypeMapping<Type,T>};
//     behavior?: typeof ClusterBehavior;

// }

export type DeviceToClusterMap<T extends ISYDevice<Family,any,any>, D> =  D extends {behaviors: SupportedBehaviors, deviceType: string} ?
{
  deviceType: D,
  mapping: EndpointMapping<D,T>;
} : never

export  class MappingRegistry
{
    static map: Map<string,DeviceToClusterMap<any,any>> = new Map();

    static register(map: Partial<FamilyToClusterMap<any>>)
    {
        for(var key in map)
        {
            MappingRegistry.map.set(key, map[key]);
        }
    }
    static getMapping<T extends ISYDevice<any,any,any>>(device: T) : DeviceToClusterMap<T,D>
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

export type FamilyToClusterMap<T extends Family.Insteon | Family.ZWave | Family.ZigBee> = {
  [Type in keyof Devices<T>]?: DeviceToClusterMap<InstanceType<Devices<T>[Type]>,any>;
}


type d = FamilyToClusterMap<Family.Insteon>;

var teest: d;

//export type FamilyToDeviceMap<T extends Family> = Record<keyof Devices<T>, DeviceToClusterMap<ISYDevice<T>>>;


// export type ClusterTypeMapping<A extends ClusterType,K> = {

//     attributes: ClusterTypeAttributeMapping<A,K>,
//     commands: ClusterTypeCommandMapping<A,K>
// };


export type ClusterMapping<A, K> =
{
      attributes: ClusterAttributeMapping<A, K>;
      commands: ClusterCommandMapping<A, K>;

};







////const ClusterIdentifier = Object.values(Clusters).filter(p=> p instanceof Clusters.MutableCluster && typeof p == "object" && p.constructor.name.endsWith(".Cluster"));
//type clusterList = keyof typeof ClusterIdentifier;

// export type ClusterMappings = {
//    OnOffCluster: ClusterTypeMapping<ClusterType.OnOff,ISYDevice<Family>>
// }


//| typeof ISYDevice<any, infer B, any>


// export type ClusterTypeAttributeMapping<A extends ClusterType, K> = {
//   [key in keyof Clusters.ClusterType.AttributesOf<ToCompleteClusterByName<A>>]?:
//     | { driver: DriversOf<K>; converter?: string }
//     | DriversOf<K>;
// };

export type EndpointMapping1<A extends MutableEndpoint, K> = {
    attributes?: SBAttributeMapping<A["behaviors"],K>,
    commands?: SBCommandMapping<A["behaviors"],K>
};

type StringKeys<T> = Extract<keyof T, string>;

export type EndpointMapping<A extends {behaviors: any}, D> = {
  [K in Capitalize<StringKeys<A["behaviors"]>>]?: {
    attributes?: AttributeMapping<A["behaviors"][Uncapitalize<K>], D>;
    commands?: CommandMapping<A["behaviors"][Uncapitalize<K>], D>;
  };
};

export type SBAttributeMapping<SB extends SupportedBehaviors,D> = {
        [K in keyof SB]: Partial<Record<keyof Behavior.StateOf<SB[K]>,DriversOf<D>|{ driver: DriversOf<D>; converter?: string }>>;
};

export type AttributeMapping<B, D> = B extends {cluster: {attributes: infer E extends { [K in string]: Clusters.ClusterType.Attribute; }}} ? Partial<Record<keyof E, keyof DriversOf<D> | { driver: keyof DriversOf<D>; converter?: string }>> : never;


export type CommandMapping<B, D> = B extends {
  cluster: { commands: infer E extends { [K in string]: Clusters.ClusterType.Command } };
}
  ? Partial<
      Record<keyof E, keyof CommandsOf<D> | { command: keyof CommandsOf<D>; parameters?: parameterMapping }>
    >
  : never;


type  a = Clusters.ClusterType.CommandsOf<OnOffLightDevice["behaviors"]["onOff"]["cluster"]>

export type SBCommandMapping<SB extends SupportedBehaviors,D> = {
  //@ts-expect-error
        [K in Capitalize<keyof SB>]?: SB[Uncapitalize<K>] extends {cluster: {commands}} ? Partial<Record<keyof SB[K]["cluster"]["commands"],CommandsOf<D>|{ driver: DriversOf<D>; converter?: string }>> : never;
};







export type ClusterAttributeMapping<A,K> = {
    [key in keyof Clusters.ClusterType.AttributesOf<A>]?:{driver: keyof DriversOf<K>, converter?: (value: any) => any}|DriversOf<K>
};


// export type ClusterTypeCommandMapping<A extends ClusterType, K> = {
//   [key in keyof Clusters.ClusterType.CommandsOf<ToCompleteClusterByName<A>>]?:
//     | { command: CommandsOf<K>; parameters?: parameterMapping }
//     | CommandsOf<K>
// };

export type ClusterCommandMapping<A, K> = {
  [key in keyof Clusters.ClusterType.CommandsOf<A>]?:
    | { command: keyof CommandsOf<K>; parameters?: parameterMapping}
    | CommandsOf<K>;
};


export type parameterMapping = {
    [key: string]: {parameter: string, converter?: (string)}
}



var clusterMap = {cluster: ClusterType.ColorControl, attributes: {colorTemperatureMireds:{driver: DriverType.Status}},commands: {moveToColor: {command: DriverType.CustomControl1, parameters: {colorX: {parameter: "colorX"}, colorY: {parameter: "colorY"}, colorTemperature: {parameter: "colorTemperature"}}}}};

const map: EndpointMapping<OnOffLightDevice,InsteonRelayDevice> = {
  Identify: {
  },
  OnOff: {
        attributes: {
          onOff: { driver: "ST" },

        },
        commands: {
          onWithTimedOff: { command: "DON" },
        }
  }
}
