import type { ClusterBehavior } from "@project-chip/matter.js/behavior/cluster";
import type { ISYDeviceNode } from "../../ISYNode.js";
import type { Constructor } from '../../Devices/Constructor.js';
export declare function ISYClusterBehavior<T extends Constructor<ClusterBehavior>, P extends ISYDeviceNode<any, string, string>>(base: T, p: Constructor<P>): T & Constructor<DeviceBehavior<P>>;
export interface DeviceBehavior<P> {
    device: P;
    handlePropertyChange(propertyName: string, value: any, newValue: any, formattedValue: string): void;
}
