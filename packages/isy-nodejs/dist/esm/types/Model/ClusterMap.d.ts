import { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import * as Clusters from '@project-chip/matter.js/cluster';
import { SupportedBehaviors } from '@project-chip/matter.js/endpoint/properties';
import type { MutableEndpoint } from '@project-chip/matter.js/endpoint/type';
import type { Converter } from '../Converters.js';
import { Devices } from '../Devices/index.js';
import { CommandsOf, DriversOf, ISYNode } from '../ISYNode.js';
import type { Family } from '../Definitions/index.js';
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
export type DeviceToClusterMap<T extends ISYNode<Family, any, any, any>, D extends {
    behaviors: SupportedBehaviors;
    deviceType: string;
}> = D extends {
    behaviors: SupportedBehaviors;
    deviceType: string;
} ? {
    deviceType: D;
    mapping: EndpointMapping<D, T>;
} : never;
export type EndpointMapping<A extends {
    behaviors: any;
}, D extends ISYNode<Family, any, any, any>> = {
    [K in Capitalize<StringKeys<A['behaviors']>>]?: BehaviorMapping<A['behaviors'][Uncapitalize<K>], D>;
};
export type EndpointMapping1<A extends MutableEndpoint, K> = {
    attributes?: SBAttributeMapping<A['behaviors'], K>;
    commands?: SBCommandMapping<A['behaviors'], K>;
};
export type FamilyToClusterMap<T extends Family.Insteon | Family.ZWave | Family.ZigBee> = {
    Family: T;
} & {
    [Type in keyof Devices.Insteon]?: DeviceToClusterMap<InstanceType<Devices.Insteon[Type]>, any>;
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
    static map: Map<Family, Map<string, DeviceToClusterMap<any, any>>>;
    static getMapping<T extends ISYNode<any, any, any, any>>(device: ISYNode<any, any, any, any>): {
        deviceType: any;
        mapping: EndpointMapping<any, any>;
    };
    static getMappingForBehavior<T extends ISYNode<any, any, any, any>, B extends ClusterBehavior>(device: T, behavior: B): BehaviorMapping<B, T>;
    static register(map: Partial<FamilyToClusterMap<any>> | {
        [x in Paths<typeof Devices>]: DeviceToClusterMap<any, any>;
    }): void;
}
export {};
//# sourceMappingURL=ClusterMap.d.ts.map