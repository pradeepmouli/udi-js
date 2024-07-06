import { Behavior } from '@project-chip/matter.js/behavior';
import { EndpointFor, type EndpointForCluster } from './EndpointFor.js';
import type { ClusterType } from '@project-chip/matter.js/cluster';
export type RelaxTypes<V> = V extends number ? number : V extends bigint ? bigint : V extends object ? V extends (...args: any[]) => any ? V : {
    [K in keyof V]: RelaxTypes<V[K]>;
} : V;
export interface MapsTo<T extends Behavior.Type, T1 extends Behavior.Type = T, T2 extends Behavior.Type = T, T3 extends Behavior.Type = T> {
    initialize(endpoint: EndpointFor<T, T1, T2, T3>): void | Promise<void>;
}
export interface MapsToCluster<T extends ClusterType.Of<ClusterType.Options<{}>>, T1 extends ClusterType = T, T2 extends ClusterType = T, T3 extends ClusterType = T> {
    initialize(endpoint: EndpointForCluster<T, T1, T2, T3>): void;
}
