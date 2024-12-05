import * as Cluster from '@matter/types/cluster';
import type * as Clusters from '@matter/types/clusters';

import { ClusterBehavior, MutableEndpoint, SupportedBehaviors } from '@matter/main';
import { DimmableLightDevice, OnOffLightDevice } from '@matter/main/devices';
import { BridgedDeviceBasicInformationBehavior } from '@matter/node/behaviors';
import type { DeviceTypeDefinition } from '@project-chip/matter.js/device';
import type { Simplify, SimplifyDeep } from 'type-fest';
import type { Converter } from '../../Converters.js';
import { DriverType } from '../../Definitions/Global/Drivers.js';
import { Family } from '../../Definitions/index.js';
import type { Constructor } from '../../Devices/Constructor.js';
import { NodeFactory } from '../../Devices/NodeFactory.js';
import { Devices, Insteon } from '../../Devices/index.js';
import { CommandsOf, DriversOf, ISYNode } from '../../ISYNode.js';
import { ClusterType } from '../../Model/ClusterType.js';
import type { PathsWithLimit, PickOfType, Remove } from '../../Utils.js';
import { ISYBridgedDeviceBehavior } from '../Behaviors/ISYBridgedDeviceBehavior.js';
import { BehaviorRegistry } from '../Behaviors/BehaviorRegistry.js';


// #region Type aliases (16)

export type AttributeMapping<B, D> =
	B extends { cluster: { attributes: infer E extends { [K in string]: Cluster.ClusterType.Attribute } } } ?
		Partial<Record<keyof E, keyof DriversOf<D> | { driver: keyof DriversOf<D>; converter?: Converter.KnownConverters }>>
	:	never;
export type ClusterMapping<B, T extends ISYNode<any, any, any, any>> = {
	attributes?: ClusterAttributeMapping<B, T>;
	commands?: ClusterCommandMapping<B, T>;
};
export type ClusterAttributeMapping<A, K> = {
	[key in keyof Cluster.ClusterType.AttributesOf<A>]: { driver: Extract<keyof DriversOf<K>, string>; converter?: Converter.KnownConverters } | Extract<keyof DriversOf<K>, string>;
};
// export type ClusterTypeCommandMapping<A extends ClusterType, K> = {
//   [key in keyof Clusters.ClusterType.CommandsOf<ToCompleteClusterByName<A>>]?:
//     | { command: CommandsOf<K>; parameters?: parameterMapping }
//     | CommandsOf<K>
// };
export type ClusterCommandMapping<A, K> = {
	[key in keyof Cluster.ClusterType.CommandsOf<A>]: { command: keyof CommandsOf<K>; parameters?: parameterMapping } | keyof CommandsOf<K>;
};
//export type FamilyToDeviceMap<T extends Family> = Record<keyof Devices<T>, DeviceToClusterMap<ISYDevice<T>>>;

// export type ClusterTypeMapping<A extends ClusterType,K> = {
//     attributes: ClusterTypeAttributeMapping<A,K>,
//     commands: ClusterTypeCommandMapping<A,K>
// };
/*export type ClusterMapping<A, K> = {
	attributes: ClusterAttributeMapping<A, K>;
	commands: ClusterCommandMapping<A, K>;
};*/
export type CommandMapping<B, D> =
	B extends (
		{
			cluster: { commands: infer E extends { [K in string]: Cluster.ClusterType.Command } };
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
export interface DeviceToClusterMap<T extends ISYNode<Family, any, any, any>, D extends MutableEndpoint> {
	deviceType: D;
	mapping: EndpointMapping<D, T>;
}

export interface Mapping<T extends ISYNode, D extends MutableEndpoint> {
	deviceType: D;

	nodeType?: T;
	mapping?: {
		[K in keyof D['behaviors']]?: {
			attributes?: {
				[K2 in keyof Cluster.ClusterType.AttributesOf<D['behaviors'][K]>]: { driver: keyof DriversOf<T>; converter?: Converter.KnownConverters } | keyof DriversOf<T>;
			};
			commands?: {
				[K2 in keyof Cluster.ClusterType.CommandsOf<D['behaviors'][K]>]: { command: keyof CommandsOf<T>; converter?: Converter.KnownConverters } | keyof CommandsOf<T>;
			};
		};
	};
}

function addA<T extends ISYNode<any, any, any, any>, D extends MutableEndpoint>(mapping1: Mapping<T, D>, mapping2: Mapping<T, D>): Mapping<T, D> {
	return { deviceType: mapping1.deviceType, nodeType: mapping1.nodeType, mapping: { ...mapping1.mapping, ...mapping2.mapping } };
}

export type EndpointMapping<A extends MutableEndpoint, D extends ISYNode<Family, any, any, any>> = {
	[K in StringKeys<A['behaviors']>]?: ClusterMapping<A['behaviors'][K], D>; //{
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
//@ts-ignore

type SupportedFamily = Family.Insteon | Family.ZWave | Family.ZigBee;
export type FamilyToClusterMap<T extends SupportedFamily> = { Family: T } & {
	[Type in keyof Devices.Insteon]?: Devices.Insteon[Type] extends {Node: Constructor<ISYNode<any,any,any,any>>} ?DeviceToClusterMap<InstanceType<Devices.Insteon[Type]["Node"]>, MutableEndpoint> : undefined;
};

interface ISYtoMatterMapping<N extends ISYNode, M extends MutableEndpoint> extends DeviceToClusterMap<N, M> {}

export function add<const F extends SupportedFamily, const T extends ISYNode<F>, const D extends MutableEndpoint>(
	familyToClusterMap: FamilyToClusterMap<F>,
	deviceClass: Constructor<T>,
	mapping: DeviceToClusterMap<T, D>
) {
	const map = {};
	map[deviceClass.name] = mapping;

	return { ...map, ...familyToClusterMap };
}
export type SBAttributeMapping<SB extends SupportedBehaviors, D> = {
	[K in keyof SB]: Partial<Record<any, DriversOf<D> | { driver: DriversOf<D>; converter?: string }>>;
};
export type SBCommandMapping<SB extends SupportedBehaviors, D> = {
	//@ts-expect-error
	[K in Capitalize<keyof SB>]?: SB[Uncapitalize<K>] extends { cluster: { commands } } ? Partial<Record<string, CommandsOf<D> | { driver: DriversOf<D>; converter?: string }>> : never;
};
type StringKeys<T> = Extract<keyof T, string>;
type a = Cluster.ClusterType.CommandsOf<OnOffLightDevice['behaviors']['onOff']['cluster']>;
type d = FamilyToClusterMap<Family.Insteon>;
export type parameterMapping = {
	[key: string]: { parameter: string; converter?: string };
};

// #endregion Type aliases (16)

// #region Classes (1)

export class MappingRegistry {
	// #region Properties (1)

	public static map: Map<Family, Map<string, DeviceToClusterMap<ISYNode, MutableEndpoint>>> = new Map();

	public static cache: { [x: string]: DeviceToClusterMap<ISYNode, MutableEndpoint> } = {};

	// #endregion Properties (1)

	// #region Public Static Methods (3)

	public static getMapping<const T extends ISYNode>(device: T): DeviceToClusterMap<T, MutableEndpoint> {
		let m = this.cache[device.address];
		if (!m) {
			if (MappingRegistry.map.has(device.family)) {
				let g = MappingRegistry.map.get(device.family);
				//let m: DeviceToClusterMap<T,MutableEndpoint>;
				if (g.has(device.constructor.name)) {
					m = g.get(device.constructor.name);
				} else if (g.has(device.nodeDefId)) {
					m = g.get(device.nodeDefId);
				} else if (g.has(device.type)) {
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
				if (m !== null) this.cache[device.address] = m;
			}
		}

		return m;
	}

	public static getMappingForBehavior<T extends ISYNode<any, any, any, any>, const B extends ClusterBehavior>(device: T, behavior: B): ClusterMapping<B, T> {
		//var m = MappingRegistry.getMapping(device);

		//return m[behavior.cluster.name];
		for (var m in MappingRegistry.getMapping(device).mapping) {
			if (behavior.cluster.name === m) return MappingRegistry.getMapping(device).mapping[m] as unknown as ClusterMapping<B, T>;
		}
	}
	//@ts-ignore
	public static register<const T extends Family.Insteon | Family.ZWave | Family.ZigBee>(
		map: Partial<FamilyToClusterMap<T>> | { [x in PathsWithLimit<typeof Devices, 1>]: DeviceToClusterMap<any, any> }
	) {
		if ('Family' in map) {
			let regMap: Map<string, DeviceToClusterMap<any, any>>;
			if (!MappingRegistry.map.has(map.Family)) {
				MappingRegistry.map.set(map.Family, new Map());
			}

			regMap = MappingRegistry.map.get(map.Family);
			for (var key in map) {
				if (key !== 'Family') {
					let m = map[key] as DeviceToClusterMap<ISYNode, MutableEndpoint>;

					m = { deviceType: m.deviceType.with(BridgedDeviceBasicInformationBehavior, ISYBridgedDeviceBehavior), mapping: m.mapping };
					regMap.set(key, m);
					regMap.set(Insteon[key]?.name, m);
					regMap.set(Insteon[key].nodeDefId, m);

					//TODO: This is a hack to allow for the Insteon devices to be registered by name
				}
			}
		} else {
			let regMap: Map<string, DeviceToClusterMap<any, any>>;
			for (var key in map) {
				const keys = key.split('.');
				let x = Devices[keys[0]][keys[1]] as typeof ISYNode<any, any, any, any>;
				if (!MappingRegistry.map.has(x.family)) {
					MappingRegistry.map.set(x.family, new Map());
				}
				//{family, key} = key.split(".")[0]

				regMap = MappingRegistry.map.get(x.family);
				let m = map[key] as DeviceToClusterMap<ISYNode, MutableEndpoint>;
				let deviceType = m.deviceType;
				deviceType = deviceType.with(BridgedDeviceBasicInformationBehavior, ISYBridgedDeviceBehavior);

				m = { deviceType: deviceType, mapping: m.mapping };

				regMap.set(keys[1], m);
				regMap.set(x.name, m);
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

interface SimplyEndpointMapping<T extends ISYNode<Family, any, any, any>, K extends MutableEndpoint> extends SimplifyDeep<ISYtoMatterMapping<T, K>> {}

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
