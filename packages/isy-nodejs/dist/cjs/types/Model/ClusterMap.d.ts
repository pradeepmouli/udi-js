import * as Clusters from '@project-chip/matter.js/cluster';
import { Family } from '../ISY.js';
import { type Device } from '@project-chip/matter.js/device';
import { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import { ClusterType, ToCompleteClusterByName } from './clusterEnum.js';
import { Devices } from '../Devices/index.js';
import { Behavior } from '@project-chip/matter.js/behavior';
import type { ISYDevice } from '../ISYNode.js';
import { SupportedBehaviors } from '@project-chip/matter.js/endpoint/properties';
import type { MutableEndpoint } from '@project-chip/matter.js/endpoint/type';
export type DeviceToClusterMap<T extends ISYDevice<Family, any, any>> = {
    deviceType: Partial<Device>;
    scope?: string;
    mapping: {
        [Type in ClusterType]?: ClusterTypeMapping<Type, T>;
    };
    behavior?: typeof ClusterBehavior;
};
export type DeviceToClusterMap2<T extends ISYDevice<Family, any, any>, TM extends MutableEndpoint> = {
    deviceType: TM;
    mapping: EndpointMapping<TM, T>;
};
export declare class MappingRegistry {
    static map: Map<string, DeviceToClusterMap<any>>;
    static register(map: Partial<FamilyToClusterMap<any>>): void;
    static getMapping<T extends ISYDevice<any, any, any>>(device: T): DeviceToClusterMap<T>;
    static getMappingForBehavior<T extends ISYDevice<any, any, any>, B extends ClusterBehavior>(device: T, behavior: B): ClusterMapping<B["cluster"], T>;
}
export type FamilyToClusterMap<T extends Family.Insteon | Family.ZWave | Family.ZigBee> = {
    [Type in keyof Devices<T>]?: DeviceToClusterMap<InstanceType<Devices<T>[Type]>>;
};
export type ClusterTypeMapping<A extends ClusterType, K> = {
    attributes: ClusterTypeAttributeMapping<A, K>;
    commands: ClusterTypeCommandMapping<A, K>;
};
export type ClusterMapping<A, K> = {
    attributes: ClusterAttributeMapping<A, K>;
    commands: ClusterCommandMapping<A, K>;
};
export type DriversOf<T> = T extends ISYDevice<any, infer B, any> ? B : never;
export type CommandsOf<T> = T extends ISYDevice<any, any, infer C> ? C : never;
export type ClusterTypeAttributeMapping<A extends ClusterType, K> = {
    [key in keyof Clusters.ClusterType.AttributesOf<ToCompleteClusterByName<A>>]?: {
        driver: DriversOf<K>;
        converter?: string;
    } | DriversOf<K>;
};
export type EndpointMapping1<A extends MutableEndpoint, K> = {
    attributes?: SBAttributeMapping<A["behaviors"], K>;
    commands?: SBCommandMapping<A["behaviors"], K>;
};
type StringKeys<T> = Extract<keyof T, string>;
export type EndpointMapping<A extends MutableEndpoint, D> = {
    [K in Capitalize<StringKeys<A["behaviors"]>>]?: {
        attributes?: AttributeMapping<A["behaviors"][Uncapitalize<K>], D>;
        commands?: CommandMapping<A["behaviors"][Uncapitalize<K>], D>;
    };
};
export type SBAttributeMapping<SB extends SupportedBehaviors, D> = {
    [K in keyof SB]: Partial<Record<keyof Behavior.StateOf<SB[K]>, DriversOf<D> | {
        driver: DriversOf<D>;
        converter?: string;
    }>>;
};
export type AttributeMapping<B, D> = B extends {
    cluster: {
        attributes: infer E extends {
            [K in string]: Clusters.ClusterType.Attribute;
        };
    };
} ? Partial<Record<keyof E, DriversOf<D> | {
    driver: DriversOf<D>;
    converter?: string;
}>> : never;
export type CommandMapping<B, D> = B extends {
    cluster: {
        commands: infer E extends {
            [K in string]: Clusters.ClusterType.Command;
        };
    };
} ? Partial<Record<keyof E, CommandsOf<D> | {
    command: CommandsOf<D>;
    parameters?: parameterMapping;
}>> : never;
export type SBCommandMapping<SB extends SupportedBehaviors, D> = {
    [K in Capitalize<keyof SB>]?: SB[Uncapitalize<K>] extends {
        cluster: {
            commands: any;
        };
    } ? Partial<Record<keyof SB[K]["cluster"]["commands"], CommandsOf<D> | {
        driver: DriversOf<D>;
        converter?: string;
    }>> : never;
};
export type ClusterAttributeMapping<A, K> = {
    [key in keyof Clusters.ClusterType.AttributesOf<A>]?: {
        driver: DriversOf<K>;
        converter?: (value: any) => any;
    } | DriversOf<K>;
};
export type ClusterTypeCommandMapping<A extends ClusterType, K> = {
    [key in keyof Clusters.ClusterType.CommandsOf<ToCompleteClusterByName<A>>]?: {
        command: CommandsOf<K>;
        parameters?: parameterMapping;
    } | CommandsOf<K>;
};
export type ClusterCommandMapping<A, K> = {
    [key in keyof Clusters.ClusterType.CommandsOf<A>]?: {
        command: CommandsOf<K>;
        parameters?: parameterMapping;
    } | CommandsOf<K>;
};
export type parameterMapping = {
    [key: string]: {
        parameter: string;
        converter?: (string);
    };
};
export {};
//# sourceMappingURL=ClusterMap.d.ts.map