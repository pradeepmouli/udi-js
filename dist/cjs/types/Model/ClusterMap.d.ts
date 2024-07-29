import * as Clusters from '@project-chip/matter.js/cluster';
import { Family, ISYDevice } from '../ISY.js';
import { type Device } from '@project-chip/matter.js/device';
import type { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import { ClusterType, ToCompleteClusterByName } from './clusterEnum.js';
import { Devices, type ToDevice } from '../Devices/index.js';
type ChildrenOf<T> = T extends Family.Global ? Family | typeof ISYDevice | string : T extends Family ? typeof ISYDevice | string : string;
export type ClusterMap<T extends Family | ISYDevice<Family> | string> = T extends ISYDevice<Family> ? {
    deviceType: Partial<Device>;
    scope?: ChildrenOf<T>;
    mapping: [ClusterTypeMapping<ClusterType, T>];
    behavior?: typeof ClusterBehavior;
} : {
    scope?: ChildrenOf<T>;
    mapping: [ClusterTypeMapping<ClusterType, any>];
    behavior?: typeof ClusterBehavior;
};
export type DeviceToClusterMap<T extends ISYDevice<Family>> = {
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
    [Type in keyof Devices<T>]: DeviceToClusterMap<InstanceType<ToDevice<Type>>>;
};
export type ClusterTypeMapping<A extends ClusterType, K extends ISYDevice<any>> = {
    attributes: ClusterTypeAttributeMapping<A, K>;
    commands: ClusterTypeCommandMapping<A, K>;
};
export type ClusterMapping<A, K extends ISYDevice<any>> = {
    attributes: ClusterAttributeMapping<A, K>;
    commands: ClusterCommandMapping<A, K>;
};
export type ClusterMappings = {
    OnOffCluster: ClusterTypeMapping<ClusterType.OnOff, ISYDevice<Family>>;
};
export type DriversOf<T> = T extends ISYDevice<any, infer B, any> | typeof ISYDevice<any, infer B, any> ? B : never;
export type CommandsOf<T> = T extends ISYDevice<any, any, infer C> ? C : never;
type ClusterTypeAttributeMapping<A extends ClusterType, K extends ISYDevice<Family>> = {
    [key in keyof Clusters.ClusterType.AttributesOf<ToCompleteClusterByName<A>>]?: {
        driver: DriversOf<K>;
        converter?: string;
    } | DriversOf<K>;
};
type ClusterAttributeMapping<A, K extends ISYDevice<Family>> = {
    [key in keyof Clusters.ClusterType.AttributesOf<A>]?: {
        driver: DriversOf<K>;
        converter?: (value: any) => any;
    } | DriversOf<K>;
};
type ClusterTypeCommandMapping<A extends ClusterType, K extends ISYDevice<Family>> = {
    [key in keyof Clusters.ClusterType.CommandsOf<ToCompleteClusterByName<A>>]?: {
        command: keyof CommandsOf<K>;
        parameters?: parameterMapping;
    } | CommandsOf<K>;
};
type ClusterCommandMapping<A, K extends ISYDevice<Family>> = {
    [key in keyof Clusters.ClusterType.CommandsOf<A>]?: {
        command: keyof CommandsOf<K>;
        parameters?: parameterMapping;
    } | CommandsOf<K>;
};
type parameterMapping = {
    [key: string]: {
        parameter: string;
        converter?: (string);
    };
};
export {};
