import * as Clusters from '@project-chip/matter.js/cluster';
import { Family } from '../ISY.js';
import { type Device } from '@project-chip/matter.js/device';
import type { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import { ClusterType, ToCompleteClusterByName } from './clusterEnum.js';
import { Devices, type ToDevice } from '../Devices/index.js';
import type { ISYDevice } from '../ISYNode.js';
export type DeviceToClusterMap<T extends ISYDevice<Family, any, any>> = {
    deviceType: Partial<Device>;
    scope?: string;
    mapping: {
        [Type in ClusterType]?: ClusterTypeMapping<Type, T>;
    };
    behavior?: typeof ClusterBehavior;
};
export declare class MappingRegistry {
    static map: Map<string, DeviceToClusterMap<any>>;
    static register(map: Partial<FamilyToClusterMap<any>>): void;
    static getMapping<T extends ISYDevice<any, any, any>>(device: T): DeviceToClusterMap<T>;
    static getMappingForBehavior<T extends ISYDevice<any, any, any>, B extends ClusterBehavior>(device: T, behavior: B): ClusterMapping<B["cluster"], T>;
}
export type FamilyToClusterMap<T extends Family.Insteon | Family.ZWave | Family.ZigBee> = {
    [Type in keyof Devices<T>]?: DeviceToClusterMap<InstanceType<ToDevice<Type>>>;
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
