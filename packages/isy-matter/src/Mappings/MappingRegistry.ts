import * as Cluster from '@matter/types/cluster';
import type * as Clusters from '@matter/types/clusters';

import { ClusterBehavior, MutableEndpoint, SupportedBehaviors, type Key } from '@matter/main';
import { DimmableLightDevice, OnOffLightDevice } from '@matter/main/devices';
import { BridgedDeviceBasicInformationBehavior } from '@matter/node/behaviors';

import type { Merge, Simplify, SimplifyDeep } from 'type-fest';



import { ISYBridgedDeviceBehavior } from '../Behaviors/ISYBridgedDeviceBehavior.js';
import { BehaviorRegistry } from '../Behaviors/BehaviorRegistry.js';
import type { WithStringKeys } from 'type-fest/source/get.js';
import type { SpreadObject } from 'type-fest/source/spread.js';
import { CommandsOf, DriversOf, ISYNode } from 'isy-nodejs/ISYNode';
import type { Converter } from 'isy-nodejs/Converters';
import { ISYDevice } from 'isy-nodejs/ISYDevice';
import type { ExtractKeys } from 'isy-nodejs/Utils';
import {Devices as DevicesNS, Family} from 'isy-nodejs/ISY';

// #region Type aliases (16)

export type AttributeMapping<B, D> =
	B extends { cluster: { attributes: infer E extends { [K in string]: Cluster.ClusterType.Attribute }; }; } ?
	Partial<Record<keyof E, keyof DriversOf<D> | { driver: keyof DriversOf<D>; converter?: Converter.KnownConverters; }>>
	: never;
export type ClusterMapping<B extends { attributes; commands; }, T> = {
	attributes?: ClusterAttributeMapping<B, T>;
	commands?: ClusterCommandMapping<B, T>;
};
export type ClusterAttributeMapping<A extends { attributes; }, K> = {
	[key in keyof Cluster.ClusterType.AttributesOf<A>]?: { driver: ISYDevice.DriverNamesOf<K>; converter?: Converter.KnownConverters; } | ISYDevice.DriverNamesOf<K>;
};
// export type ClusterTypeCommandMapping<A extends ClusterType, K> = {
//   [key in keyof Clusters.ClusterType.CommandsOf<ToCompleteClusterByName<A>>]?:
//     | { command: CommandsOf<K>; parameters?: parameterMapping }
//     | CommandsOf<K>
// };
export type ClusterCommandMapping<A, K> = {
	[key in keyof Cluster.ClusterType.CommandsOf<A>]?: { command: ISYDevice.CommandNamesOf<K>; parameters?: parameterMapping; } | ISYDevice.CommandNamesOf<K>;
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
			cluster: { commands: infer E extends { [K in string]: Cluster.ClusterType.Command }; };
		}
	) ?
	Partial<Record<keyof E, keyof ISYNode.CommandsOf<D> | { command: keyof ISYNode.CommandsOf<D>; parameters?: parameterMapping; }>>
	: never;
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
export interface DeviceToClusterMap<T, D extends MutableEndpoint> {
	deviceType: D;
	mapping: Simplify<EndpointMapping<D, T>>;
}

export interface Mapping<T extends ISYNode, D extends MutableEndpoint> {
	deviceType: D;

	nodeType?: T;
	mapping?: {
		[K in keyof D['behaviors']]?: {
			attributes?: {
				[K2 in keyof Cluster.ClusterType.AttributesOf<D['behaviors'][K]>]: { driver: keyof DriversOf<T>; converter?: Converter.KnownConverters; } | keyof DriversOf<T>;
			};
			commands?: {
				[K2 in keyof Cluster.ClusterType.CommandsOf<D['behaviors'][K]>]: { command: keyof CommandsOf<T>; converter?: Converter.KnownConverters; } | keyof CommandsOf<T>;
			};
		};
	};
}

function addA<T extends ISYNode<any, any, any, any>, D extends MutableEndpoint>(mapping1: Mapping<T, D>, mapping2: Mapping<T, D>): Mapping<T, D> {
	return { deviceType: mapping1.deviceType, nodeType: mapping1.nodeType, mapping: { ...mapping1.mapping, ...mapping2.mapping } };
}

export type EndpointMapping<A extends MutableEndpoint, D> = Simplify<{
	[K in ExtractKeys<A['behaviors'], { cluster: { attributes; commands; }; }>]?: SimplifyDeep<
		ClusterMapping<
			//@ts-expect-error
			A['behaviors'][K]['cluster'],
			D
		>
	>; //{
	/*attributes?: AttributeMapping<A['behaviors'][Uncapitalize<K>], D>;
		commands?: CommandMapping<A['behaviors'][Uncapitalize<K>], D>;*/
	//};
}>;

type t = SimplifyDeep<ClusterMapping<Clusters.OnOffCluster, ISYDevice.InstanceTypeOf<typeof DevicesNS.Insteon.RelayLamp>>>;
//type t2 = SimplifyDeep<EndpointMapping<OnOffLightDevice, DevicesNS.Insteon['RelayLamp']>>;
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


type Devices = typeof DevicesNS;

type SupportedFamily = keyof Devices & keyof typeof Family;
export type FamilyToClusterMap<T extends SupportedFamily> = { Family: T } & {
	[Type in keyof Devices[T]]?: DeviceToClusterMap<Devices[T][Type], MutableEndpoint>;
} & { add<D extends keyof Devices[T], M extends MutableEndpoint>(mapping: { [x in D]?: DeviceToClusterMap<Devices[T][x], M> }): FamilyToClusterMap<T>; };

interface ISYtoMatterMapping<N extends ISYDevice.Any, M extends MutableEndpoint> extends DeviceToClusterMap<N, M> {}

export function add<const F extends SupportedFamily, const Y extends keyof Devices[F], const D extends MutableEndpoint>(
	This: FamilyToClusterMap<F> & object,
	mapping: { [x in Y]?: DeviceToClusterMap<Devices[F][x], D> }
): FamilyToClusterMap<F> {
	let m = { ...This, ...mapping } as FamilyToClusterMap<F> & object;
	//@ts-ignore
	let s = {
		...m,
		add<K extends keyof Devices[F], const M extends MutableEndpoint>(mapping2: { [x in K]?: DeviceToClusterMap<Devices[F][x], M> }) {
			return add<F, K, M>(m, mapping2);
		}
	};
	return s;
}

export function hasConverter<X, Y>(mapping: { driver: X; converter: Y; } | X): mapping is { driver: X; converter: Y; } {
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
export type SBAttributeMapping<SB extends SupportedBehaviors, D> = {
	[K in keyof SB]: Partial<Record<any, DriversOf<D> | { driver: DriversOf<D>; converter?: string; }>>;
};
export type SBCommandMapping<SB extends SupportedBehaviors, D> = {
	//@ts-expect-error
	[K in Capitalize<keyof SB>]?: SB[Uncapitalize<K>] extends { cluster: { commands; }; } ? Partial<Record<string, CommandsOf<D> | { driver: DriversOf<D>; converter?: string; }>> : never;
};
type a = Cluster.ClusterType.CommandsOf<OnOffLightDevice['behaviors']['onOff']['cluster']>;
type d = FamilyToClusterMap<'Insteon'>;
export type parameterMapping = {
	[key: string]: { parameter: string; converter?: string; };
};

// #endregion Type aliases (16)

// #region Classes (1)

export class MappingRegistry {
	// #region Properties (1)

	public static map: Map<keyof typeof Family, Map<string, DeviceToClusterMap<ISYDevice.Any, MutableEndpoint>>> = new Map();

	public static cache: { [x: string]: DeviceToClusterMap<ISYDevice.Any, MutableEndpoint>; } = {};

	// #endregion Properties (1)

	// #region Public Static Methods (3)

	public static getMapping<const T extends ISYDevice.Any>(device: T): DeviceToClusterMap<T, MutableEndpoint> {
		let m = this.cache[device.address];
		if (!m) {
			if (ISYDevice.isNode(device)) {
				if (MappingRegistry.map.has(Family[device.family] as keyof typeof Family)) {
					let g = MappingRegistry.map.get(Family[device.family] as keyof typeof Family);
					//let m: DeviceToClusterMap<T,MutableEndpoint>;
					if (g.has(device.constructor.name)) {
						m = g.get(device.constructor.name);
					} else if (g.has(device.nodeDefId)) {
						m = g.get(device.nodeDefId);
					} else if (g.has(device.type)) {
						m = g.get(device.type);
					}

					if (!m) {
						for (var nodeDefId of ISYNode.getImplements(device)) {
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
		}

		return m;
	}

	public static getMappingForBehavior<T extends ISYDevice.Any, const B extends ClusterBehavior>(device: T, behavior: B): ClusterMapping<B['cluster'], T> {
		//var m = MappingRegistry.getMapping(device);

		//return m[behavior.cluster.name];
		for (var m in MappingRegistry.getMapping(device).mapping) {
			if (behavior.cluster.name === m) return MappingRegistry.getMapping(device).mapping[m] as unknown as ClusterMapping<B['cluster'], T>;
		}
	}

	public static add<T extends 'Insteon', D extends keyof Devices['Insteon'], M extends MutableEndpoint>(mapping: { [x in D]?: DeviceToClusterMap<Devices[T][x], M> }): typeof MappingRegistry;
	public static add<T extends SupportedFamily, D extends keyof Devices[T], M extends MutableEndpoint>(mapping: { [x in D]?: DeviceToClusterMap<Devices[T][x], M> }): typeof MappingRegistry {
		MappingRegistry.register<T>(mapping as unknown as FamilyToClusterMap<T>);
		return MappingRegistry;
	}
	//@ts-ignore
	public static register<const T extends SupportedFamily>(map: FamilyToClusterMap<T>, family?: T): void {
		if ('Family' in map) {
			let regMap: Map<string, DeviceToClusterMap<any, any>>;
			let Devices = DevicesNS[map.Family];
			if (!MappingRegistry.map.has(map.Family)) {
				MappingRegistry.map.set(map.Family, new Map());
			}

			regMap = MappingRegistry.map.get(map.Family);
			for (var key in map) {
				if (key !== 'Family' && key !== 'add') {
					let m = map[key] as DeviceToClusterMap<ISYDevice.Any, MutableEndpoint> & { toJSON: () => any };

					m = { deviceType: m.deviceType.with(BridgedDeviceBasicInformationBehavior, ISYBridgedDeviceBehavior), mapping: m.mapping,

					toJSON() {
						return { deviceType: this.deviceType.name, mapping: this.mapping };


					 }};
					if (m.mapping != undefined) {
						for (var key1 in m.mapping) {
							for (var key2 in m.mapping[key1].attributes) {
								let attribute = m.mapping[key1].attributes[key2];
								{
									let d = attribute;
									try {
										if (typeof d === 'string') {
											m.mapping[key1].attributes[key2] = Devices[key]?.Drivers[d];
										} else if (hasConverter(m.mapping[key1].attributes[key2])) {
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
					console.log('Registering', JSON.stringify({ keys: [key, Devices[key]?.Class?.name, Devices[key]?.Class?.nodeDefId], mapping: m },null,2));
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
