import type { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import '@project-chip/matter.js/device';
import type { Constructor } from '../../Devices/Constructor.js';
import type { DriversOf, ISYNode } from '../../ISYNode.js';
import type { ClusterMapping } from '../Mappings/MappingRegistry.js';
import { ISYBridgedDeviceBehavior } from './ISYBridgedDeviceBehavior.js';
export type ClusterForBehavior<B> = B extends ClusterBehavior.Type<infer C, infer D, infer E> ? C : never;
export type ConstructedType<B extends Constructor<any>> = B extends Constructor<infer C> ? C : never;
export type DeviceBehavior<P extends ISYNode<any, any, any, any>, T extends {
    cluster?: any;
}> = {
    device: P;
    bridgedDeviceBehavior: ISYBridgedDeviceBehavior<P>;
    map: ClusterMapping<T, P>;
    handlePropertyChange(chg: PropertyChange<P>): void;
};
export type PropertyChange<P extends ISYNode<any, any, any, any>> = {
    driver: keyof DriversOf<P>;
    newValue: any;
    oldValue: any;
    formattedValue: string;
};
export declare function ISYClusterBehavior<T extends Constructor<ClusterBehavior> & {
    cluster: any;
}, P extends ISYNode<any, any, any, any>>(base: T, p: Constructor<P>): typeof base & {
    new (...args: any[]): DeviceBehavior<P, T>;
};
//# sourceMappingURL=ISYClusterBehavior.d.ts.map