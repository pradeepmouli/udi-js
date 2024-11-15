import { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import type { Endpoint, EndpointType, MutableEndpoint } from '@project-chip/matter.js/endpoint';
import type { SupportedBehaviors } from '@project-chip/matter.js/endpoint/properties';
import 'winston';
export interface ISYBinaryStateDevice {
    get state(): Promise<boolean>;
}
export interface ISYLevelDevice {
    get level(): number;
}
export interface MapsToEndpointType<T extends EndpointType> {
    initialize(endpoint: Endpoint<T>): void;
}
type BehaviorList<T extends ClusterBehavior> = SupportedBehaviors & T;
export interface MapsToEndpoint<T extends ClusterBehavior> {
    initialize<K extends MutableEndpoint.With<EndpointType.Empty, BehaviorList<T>>>(endpoint: Endpoint<K>): void;
}
export {};
//# sourceMappingURL=ISYDevice.d.ts.map