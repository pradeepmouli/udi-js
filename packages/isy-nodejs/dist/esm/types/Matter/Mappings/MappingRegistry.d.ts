import * as Cluster from '@matter/types/cluster';
import { ClusterBehavior, MutableEndpoint, SupportedBehaviors } from '@matter/main';
import type { Converter } from '../../Converters.js';
import { Family } from '../../Definitions/index.js';
import type { Constructor } from '../../Devices/Constructor.js';
import { Devices } from '../../Devices/index.js';
import { CommandsOf, DriversOf, ISYNode } from '../../ISYNode.js';
import type { PathsWithLimit, StringKeys } from '../../Utils.js';
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
}, T extends ISYDevice.Any> = {
    attributes?: ClusterAttributeMapping<B, T>;
    commands?: ClusterCommandMapping<B, T>;
};
export type ClusterAttributeMapping<A extends {
    attributes: any;
}, K extends ISYDevice.Any> = {
    [key in keyof Extract<A["attributes"], Cluster.ClusterType.Attribute>]: {
        driver: ISYDevice.DriverNamesOf<K>;
        converter?: Converter.KnownConverters;
    } | Extract<keyof DriversOf<K>, string>;
};
export type ClusterCommandMapping<A, K extends ISYDevice.Any> = {
    [key in keyof Cluster.ClusterType.CommandsOf<A>]: {
        command: ISYDevice.CommandNamesOf<K>;
        parameters?: parameterMapping;
    } | keyof CommandsOf<K>;
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
export interface DeviceToClusterMap<T extends ISYDevice<any, any, any, any>, D extends MutableEndpoint> {
    deviceType: D;
    mapping: EndpointMapping<D, T>;
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
export type EndpointMapping<A extends MutableEndpoint, D extends ISYDevice<Family, any, any, any>> = {
    [K in StringKeys<A['behaviors']>]?: ClusterMapping<A['behaviors'][K], D>;
};
export type EndpointMapping1<A extends MutableEndpoint, K> = {
    attributes?: SBAttributeMapping<A['behaviors'], K>;
    commands?: SBCommandMapping<A['behaviors'], K>;
};
type SupportedFamily = Family.Insteon | Family.ZWave | Family.ZigBee;
export type FamilyToClusterMap<T extends SupportedFamily> = {
    Family: T;
} & {
    [Type in keyof Devices.Insteon]?: DeviceToClusterMap<ISYDevice.InstanceTypeOf<Devices.Insteon[Type]>, MutableEndpoint>;
};
export declare function add<const F extends SupportedFamily, X, const T extends ISYDevice<F, any, any, any>, const D extends MutableEndpoint>(This: X, mapping: {
    [x: Constructor<T>["name"]]: DeviceToClusterMap<T, D>;
}): X & typeof mapping;
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
    static map: Map<Family, Map<string, DeviceToClusterMap<ISYDevice.Any, MutableEndpoint>>>;
    static cache: {
        [x: string]: DeviceToClusterMap<ISYDevice.Any, MutableEndpoint>;
    };
    static getMapping<const T extends ISYDevice.Any>(device: T): DeviceToClusterMap<T, MutableEndpoint>;
    static getMappingForBehavior<T extends ISYDevice.Any, const B extends ClusterBehavior>(device: T, behavior: B): ClusterMapping<B, T>;
    static register<const T extends Family.Insteon | Family.ZWave | Family.ZigBee>(map: Partial<FamilyToClusterMap<T>> | {
        [x in PathsWithLimit<typeof Devices, 1>]: DeviceToClusterMap<any, any>;
    }): void;
}
export {};
//# sourceMappingURL=MappingRegistry.d.ts.map