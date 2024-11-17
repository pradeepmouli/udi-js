import { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import * as Clusters from '@project-chip/matter.js/cluster';
import { OnOffLightDevice } from '@project-chip/matter.js/devices/OnOffLightDevice';
import { SupportedBehaviors } from '@project-chip/matter.js/endpoint/properties';
import type { MutableEndpoint } from '@project-chip/matter.js/endpoint/type';
import type { Converter } from '../Converters.js';
import { DriverType } from '../Definitions/Global/Drivers.js';
import { Devices } from '../Devices/index.js';
import { Insteon } from '../Devices/Insteon/index.js';

import type { CommandsOf, DriversOf, ISYNode } from '../ISYNode.js';
import { ClusterType } from './ClusterType.js';
import type { Family } from '../Definitions/index.js';

// #region Type aliases (16)

export type AttributeMapping<B, D> =
	B extends { cluster: { attributes: infer E extends { [K in string]: Clusters.ClusterType.Attribute } } } ?
		Partial<Record<keyof E, keyof DriversOf<D> | { driver: keyof DriversOf<D>; converter?: Converter.KnownConverters }>>
	:	never;
export type BehaviorMapping<B extends { cluster? }, T extends ISYNode<any, any, any, any>> = {
	attributes?: AttributeMapping<B, T>;
	commands?: CommandMapping<B, T>;
};
export type ClusterAttributeMapping<A, K> = {
	[key in keyof Clusters.ClusterType.AttributesOf<A>]?: { driver: Extract<keyof DriversOf<K>, string>; converter?: (value: any) => any } | Extract<keyof DriversOf<K>, string>;
};
// export type ClusterTypeCommandMapping<A extends ClusterType, K> = {
//   [key in keyof Clusters.ClusterType.CommandsOf<ToCompleteClusterByName<A>>]?:
//     | { command: CommandsOf<K>; parameters?: parameterMapping }
//     | CommandsOf<K>
// };
export type ClusterCommandMapping<A, K> = {
	[key in keyof Clusters.ClusterType.CommandsOf<A>]?: { command: keyof CommandsOf<K>; parameters?: parameterMapping } | keyof CommandsOf<K>;
};
//export type FamilyToDeviceMap<T extends Family> = Record<keyof Devices<T>, DeviceToClusterMap<ISYDevice<T>>>;

// export type ClusterTypeMapping<A extends ClusterType,K> = {
//     attributes: ClusterTypeAttributeMapping<A,K>,
//     commands: ClusterTypeCommandMapping<A,K>
// };
export type ClusterMapping<A, K> = {
	attributes: ClusterAttributeMapping<A, K>;
	commands: ClusterCommandMapping<A, K>;
};
export type CommandMapping<B, D> =
	B extends (
		{
			cluster: { commands: infer E extends { [K in string]: Clusters.ClusterType.Command } };
		}
	) ?
		Partial<Record<keyof E, keyof CommandsOf<D> | { command: keyof CommandsOf<D>; parameters?: parameterMapping }>>
	:	never;
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
export type DeviceToClusterMap<T extends ISYNode<Family, any, any, any>, D extends { behaviors: SupportedBehaviors; deviceType: string }> =
	D extends { behaviors: SupportedBehaviors; deviceType: string } ?
		{
			deviceType: D;
			mapping: EndpointMapping<D, T>;
		}
	:	never;
export type EndpointMapping<A extends { behaviors: any }, D extends ISYNode<Family, any, any, any>> = {
	[K in Capitalize<StringKeys<A['behaviors']>>]?: BehaviorMapping<A['behaviors'][Uncapitalize<K>], D>; //{
	/*attributes?: AttributeMapping<A['behaviors'][Uncapitalize<K>], D>;
		commands?: CommandMapping<A['behaviors'][Uncapitalize<K>], D>;*/
	//};
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
	attributes?: SBAttributeMapping<A['behaviors'], K>;
	commands?: SBCommandMapping<A['behaviors'], K>;
};
export type FamilyToClusterMap<T extends Family.Insteon | Family.ZWave | Family.ZigBee> = { Family: T } & {
	[Type in keyof Devices.Insteon]?: DeviceToClusterMap<InstanceType<Devices.Insteon[Type]>, any>;
};
export type SBAttributeMapping<SB extends SupportedBehaviors, D> = {
	[K in keyof SB]: Partial<Record<any, DriversOf<D> | { driver: DriversOf<D>; converter?: string }>>;
};
export type SBCommandMapping<SB extends SupportedBehaviors, D> = {
	//@ts-expect-error
	[K in Capitalize<keyof SB>]?: SB[Uncapitalize<K>] extends { cluster: { commands } } ? Partial<Record<string, CommandsOf<D> | { driver: DriversOf<D>; converter?: string }>> : never;
};
type StringKeys<T> = Extract<keyof T, string>;
type a = Clusters.ClusterType.CommandsOf<OnOffLightDevice['behaviors']['onOff']['cluster']>;
type d = FamilyToClusterMap<Family.Insteon>;
export type parameterMapping = {
	[key: string]: { parameter: string; converter?: string };
};

// #endregion Type aliases (16)

// #region Classes (1)

export class MappingRegistry {
	// #region Properties (1)

	public static map: Map<string, DeviceToClusterMap<any, any>> = new Map();

	// #endregion Properties (1)

	// #region Public Static Methods (3)

	public static getMapping<T extends ISYNode<any, any, any, any>>(device: T) {
		return MappingRegistry.map.get(device.constructor.name);
	}

	public static getMappingForBehavior<T extends ISYNode<any, any, any, any>, B extends ClusterBehavior>(device: T, behavior: B): BehaviorMapping<B, T> {
		//var m = MappingRegistry.getMapping(device);

		//return m[behavior.cluster.name];
		for (var m in MappingRegistry.getMapping(device).mapping) {
			if (behavior.cluster.name === m) return MappingRegistry.getMapping(device).mapping[m] as unknown as BehaviorMapping<B, T>;
		}
	}

	public static register(map: Partial<FamilyToClusterMap<any>>) {
		for (var key in map) {
			if (key !== 'Family') {
				MappingRegistry.map.set(key, map[key]);
				MappingRegistry.map.set(Insteon[key].name, map[key]);
			}
		}
	}

	// #endregion Public Static Methods (3)
}

// #endregion Classes (1)

// #region Variables (3)

var teest: d;
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
