import type { ClusterBehavior } from "@project-chip/matter.js/behavior/cluster";
import type { ISYDeviceNode } from "../../ISYNode.js";
import '@project-chip/matter.js/device';
import type { Constructor } from "../../Devices/Constructor.js";
import { type ISYDevice } from "../../ISY.js";
import { type ClusterMapping, type DriversOf } from "../../Model/ClusterMap.js";
export type ConstructedType<B extends Constructor<any>> = B extends Constructor<infer C> ? C : never;
export type ClusterForBehavior<B> = B extends ClusterBehavior.Type<infer C, infer D, infer E> ? C : never;
export type PropertyChange<P extends ISYDevice<any, any, any>> = {
    driver: DriversOf<P>;
    newValue: any;
    oldValue: any;
    formattedValue: string;
};
export declare function ISYClusterBehavior<T extends Constructor<ClusterBehavior> & {
    cluster: unknown;
}, P extends ISYDeviceNode<any, any, any>>(base: T, p: Constructor<P>): typeof base & {
    new (...args: any[]): DeviceBehavior<P, T>;
};
export type DeviceBehavior<P extends ISYDevice<any, any, any>, T extends {
    cluster: any;
}> = {
    device: P;
    map: ClusterMapping<T["cluster"], P>;
    handlePropertyChange(chg: PropertyChange<P>): void;
};
