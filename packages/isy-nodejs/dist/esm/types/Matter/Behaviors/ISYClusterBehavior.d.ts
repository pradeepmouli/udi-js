import type { ClusterBehavior } from "@project-chip/matter.js/behavior/cluster";
import type { DriversOf, ISYNode } from '../../ISYNode.js';
import '@project-chip/matter.js/device';
import type { Constructor } from "../../Devices/Constructor.js";
import { type ClusterMapping } from "../../Model/ClusterMap.js";
export type ConstructedType<B extends Constructor<any>> = B extends Constructor<infer C> ? C : never;
export type ClusterForBehavior<B> = B extends ClusterBehavior.Type<infer C, infer D, infer E> ? C : never;
export type PropertyChange<P extends ISYNode<any, any, any, any>> = {
    driver: keyof DriversOf<P>;
    newValue: any;
    oldValue: any;
    formattedValue: string;
};
export declare function ISYClusterBehavior<T extends Constructor<ClusterBehavior> & {
    cluster: unknown;
}, P extends ISYNode<any, any, any, any>>(base: T, p: Constructor<P>): typeof base & {
    new (...args: any[]): DeviceBehavior<P, T>;
};
export type DeviceBehavior<P extends ISYNode, T extends {
    cluster: any;
}> = {
    device: P;
    map: ClusterMapping<T["cluster"], P>;
    handlePropertyChange(chg: PropertyChange<P>): void;
};
//# sourceMappingURL=ISYClusterBehavior.d.ts.map