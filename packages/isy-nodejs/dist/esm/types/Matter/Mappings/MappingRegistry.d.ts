import * as Cluster from '@matter/types/cluster';
import { ClusterBehavior, MutableEndpoint, SupportedBehaviors } from '@matter/main';
import type { Simplify, SimplifyDeep } from 'type-fest';
import type { Converter } from '../../Converters.js';
import { Family } from '../../Definitions/index.js';
import { Devices as DevicesNS } from '../../Devices/index.js';
import { CommandsOf, DriversOf, ISYNode } from '../../ISYNode.js';
import type { ExtractKeys } from '../../Utils.js';
import { ISYDevice } from '../../ISYDevice.js';
export type AttributeMapping<B, D> = B extends {
    cluster: {
        attributes: infer E extends {
            [K in string]: Cluster.ClusterType.Attribute;
        };
    };
} ? Partial<Record<keyof E, keyof DriversOf<D> | {
    driver: keyof DriversOf<D>;
    converter?: Converter.KnownConverters;
}>> : never;
export type ClusterMapping<B extends {
    attributes: any;
    commands: any;
}, T> = {
    attributes?: ClusterAttributeMapping<B, T>;
    commands?: ClusterCommandMapping<B, T>;
};
export type ClusterAttributeMapping<A extends {
    attributes: any;
}, K> = {
    [key in keyof Cluster.ClusterType.AttributesOf<A>]?: {
        driver: ISYDevice.DriverNamesOf<K>;
        converter?: Converter.KnownConverters;
    } | ISYDevice.DriverNamesOf<K>;
};
export type ClusterCommandMapping<A, K> = {
    [key in keyof Cluster.ClusterType.CommandsOf<A>]?: {
        command: ISYDevice.CommandNamesOf<K>;
        parameters?: parameterMapping;
    } | ISYDevice.CommandNamesOf<K>;
};
export type CommandMapping<B, D> = B extends ({
    cluster: {
        commands: infer E extends {
            [K in string]: Cluster.ClusterType.Command;
        };
    };
}) ? Partial<Record<keyof E, keyof CommandsOf<D> | {
    command: keyof CommandsOf<D>;
    parameters?: parameterMapping;
}>> : never;
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
                [K2 in keyof Cluster.ClusterType.AttributesOf<D['behaviors'][K]>]: {
                    driver: keyof DriversOf<T>;
                    converter?: Converter.KnownConverters;
                } | keyof DriversOf<T>;
            };
            commands?: {
                [K2 in keyof Cluster.ClusterType.CommandsOf<D['behaviors'][K]>]: {
                    command: keyof CommandsOf<T>;
                    converter?: Converter.KnownConverters;
                } | keyof CommandsOf<T>;
            };
        };
    };
}
export type EndpointMapping<A extends MutableEndpoint, D> = Simplify<{
    [K in ExtractKeys<A['behaviors'], {
        cluster: {
            attributes: any;
            commands: any;
        };
    }>]?: SimplifyDeep<ClusterMapping<A['behaviors'][K]['cluster'], D>>;
}>;
export type EndpointMapping1<A extends MutableEndpoint, K> = {
    attributes?: SBAttributeMapping<A['behaviors'], K>;
    commands?: SBCommandMapping<A['behaviors'], K>;
};
type Devices = typeof DevicesNS;
export type FamilyToClusterMap<T extends keyof Devices> = {
    Family: T;
} & {
    [Type in keyof Devices[T]]?: DeviceToClusterMap<Devices[T][Type], MutableEndpoint>;
} & {
    add<D extends keyof Devices[T], M extends MutableEndpoint>(mapping: {
        [x in D]?: DeviceToClusterMap<Devices[T][x], M>;
    }): FamilyToClusterMap<T>;
};
export declare function add<const F extends keyof Devices, const Y extends keyof Devices[F], const D extends MutableEndpoint>(This: FamilyToClusterMap<F> & object, mapping: {
    [x in Y]?: DeviceToClusterMap<Devices[F][x], D>;
}): FamilyToClusterMap<F>;
export declare function hasConverter<X, Y>(mapping: {
    driver: X;
    converter: Y;
} | X): mapping is {
    driver: X;
    converter: Y;
};
export type SBAttributeMapping<SB extends SupportedBehaviors, D> = {
    [K in keyof SB]: Partial<Record<any, DriversOf<D> | {
        driver: DriversOf<D>;
        converter?: string;
    }>>;
};
export type SBCommandMapping<SB extends SupportedBehaviors, D> = {
    [K in Capitalize<keyof SB>]?: SB[Uncapitalize<K>] extends {
        cluster: {
            commands: any;
        };
    } ? Partial<Record<string, CommandsOf<D> | {
        driver: DriversOf<D>;
        converter?: string;
    }>> : never;
};
export type parameterMapping = {
    [key: string]: {
        parameter: string;
        converter?: string;
    };
};
export declare class MappingRegistry {
    static map: Map<keyof typeof Family, Map<string, DeviceToClusterMap<ISYDevice.Any, MutableEndpoint>>>;
    static cache: {
        [x: string]: DeviceToClusterMap<ISYDevice.Any, MutableEndpoint>;
    };
    static getMapping<const T extends ISYDevice.Any>(device: T): DeviceToClusterMap<T, MutableEndpoint>;
    static getMappingForBehavior<T extends ISYDevice.Any, const B extends ClusterBehavior>(device: T, behavior: B): ClusterMapping<B['cluster'], T>;
    static add<T extends 'Insteon', D extends keyof Devices['Insteon'], M extends MutableEndpoint>(mapping: {
        [x in D]?: DeviceToClusterMap<Devices[T][x], M>;
    }): typeof MappingRegistry;
    static register<const T extends keyof Devices>(map: FamilyToClusterMap<T>, family?: T): void;
}
export {};
//# sourceMappingURL=MappingRegistry.d.ts.map