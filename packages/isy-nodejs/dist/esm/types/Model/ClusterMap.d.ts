import * as Clusters from '@project-chip/matter.js/cluster';
import type { Converter } from '../Converters.js';
import { Devices } from '../Devices/index.js';
import { ClusterBehavior, MutableEndpoint, SupportedBehaviors } from '@matter/main';
import { Family } from '../Definitions/index.js';
import { CommandsOf, DriversOf, ISYNode } from '../ISYNode.js';
import type { PickOfType, Remove } from '../Utils.js';
export type AttributeMapping<B, D> = B extends {
    cluster: {
        attributes: infer E extends {
            [K in string]: Clusters.ClusterType.Attribute;
        };
    };
} ? Partial<Record<keyof E, keyof DriversOf<D> | {
    driver: keyof DriversOf<D>;
    converter?: Converter.KnownConverters;
}>> : never;
export type BehaviorMapping<B extends {
    cluster?: any;
}, T extends ISYNode<any, any, any, any>> = {
    attributes?: AttributeMapping<B, T>;
    commands?: CommandMapping<B, T>;
};
export type ClusterAttributeMapping<A, K> = {
    [key in keyof Clusters.ClusterType.AttributesOf<A>]?: {
        driver: Extract<keyof DriversOf<K>, string>;
        converter?: (value: any) => any;
    } | Extract<keyof DriversOf<K>, string>;
};
export type ClusterCommandMapping<A, K> = {
    [key in keyof Clusters.ClusterType.CommandsOf<A>]?: {
        command: keyof CommandsOf<K>;
        parameters?: parameterMapping;
    } | keyof CommandsOf<K>;
};
export type ClusterMapping<A, K> = {
    attributes: ClusterAttributeMapping<A, K>;
    commands: ClusterCommandMapping<A, K>;
};
export type CommandMapping<B, D> = B extends ({
    cluster: {
        commands: infer E extends {
            [K in string]: Clusters.ClusterType.Command;
        };
    };
}) ? Partial<Record<keyof E, keyof CommandsOf<D> | {
    command: keyof CommandsOf<D>;
    parameters?: parameterMapping;
}>> : never;
export type DeviceToClusterMap<T extends ISYNode<Family, any, any, any>, D extends MutableEndpoint> = {
    deviceType: D;
    mapping: EndpointMapping<D, T>;
};
export type EndpointMapping<A extends MutableEndpoint, D extends ISYNode<Family, any, any, any>> = {
    [K in StringKeys<PickOfType<A['behaviors'], ClusterBehavior>> as Capitalize<K>]?: A['behaviors'][K] extends ClusterBehavior ? BehaviorMapping<A['behaviors'][K], D> : undefined;
};
export type EndpointMapping1<A extends MutableEndpoint, K> = {
    attributes?: SBAttributeMapping<A['behaviors'], K>;
    commands?: SBCommandMapping<A['behaviors'], K>;
};
export type FamilyToClusterMap<T extends Family.Insteon | Family.ZWave | Family.ZigBee> = {
    Family: T;
} & {
    [Type in Extract<keyof Devices.Insteon, `${string}Node`> as Remove<Type, 'Node'>]?: DeviceToClusterMap<InstanceType<Devices.Insteon[Type]>, MutableEndpoint>;
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
type StringKeys<T> = Extract<keyof T, string>;
export type parameterMapping = {
    [key: string]: {
        parameter: string;
        converter?: string;
    };
};
export declare class MappingRegistry {
    static map: Map<Family, Map<string, DeviceToClusterMap<ISYNode, MutableEndpoint>>>;
    static cache: {
        [x: string]: DeviceToClusterMap<ISYNode, MutableEndpoint>;
    };
    static getMapping<T extends ISYNode<any, any, any, any>>(device: T): DeviceToClusterMap<T, MutableEndpoint>;
    static getMappingForBehavior<T extends ISYNode<any, any, any, any>, B extends ClusterBehavior>(device: T, behavior: B): BehaviorMapping<B, T>;
    static register(map: Partial<FamilyToClusterMap<any>> | {
        [x in Paths<typeof Devices>]: DeviceToClusterMap<any, any>;
    }): void;
}
export {};
//# sourceMappingURL=ClusterMap.d.ts.map