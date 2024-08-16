import { Endpoint } from '@project-chip/matter.js/endpoint';
import { SupportedBehaviors } from '@project-chip/matter.js/endpoint/properties';
import { Behavior } from '@project-chip/matter.js/behavior';
import { MutableEndpoint, EndpointType } from '@project-chip/matter.js/endpoint/type';
import type { ClusterBehavior } from '@project-chip/matter.js/behavior/cluster';
import { type ClusterType } from '@project-chip/matter.js/cluster';
import type { Constructor } from './Constructor.js';
import type { ISYDeviceNode } from '../ISYNode.js';
import { BridgedDeviceBasicInformationServer } from '@project-chip/matter.js/behaviors/bridged-device-basic-information';
export type RelaxTypes<V> = V extends number ? number : V extends bigint ? bigint : V extends object ? V extends (...args: any[]) => any ? V : {
    [K in keyof V]: RelaxTypes<V[K]>;
} : V;
export type RelaxedClusterType = RelaxTypes<ClusterType>;
export type EndpointFor<K extends Behavior.Type, K1 extends Behavior.Type = K, K2 extends Behavior.Type = K, K3 extends Behavior.Type = K> = {
    events: SupportedBehaviors.EventsOf<SupportedBehaviors.MapOf<[K, K1, K2, K3]>>;
} & MutableEndpoint.With<EndpointType.Empty, SupportedBehaviors.MapOf<[K, K1, K2, K3]>>;
export type BehaviorsOf<K extends ClusterType.Of<ClusterType.Options<{}>>, K1 extends ClusterType = K, K2 extends ClusterType = K, K3 extends ClusterType = K> = [ClusterBehavior.Type<K>, ClusterBehavior.Type<K1>, ClusterBehavior.Type<K2>, ClusterBehavior.Type<K3>];
export type SupportedBehaviorsOf<K extends ClusterType.Of<ClusterType.Options<{}>>, K1 extends ClusterType = K, K2 extends ClusterType = K, K3 extends ClusterType = K> = SupportedBehaviors.MapOf<BehaviorsOf<K, K1, K2, K3>>;
export type EndpointForCluster<K extends ClusterType.Of<ClusterType.Options<{}>>, K1 extends ClusterType = K, K2 extends ClusterType = K, K3 extends ClusterType = K> = {
    events: SupportedBehaviors.EventsOf<SupportedBehaviorsOf<K, K1, K2, K3>>;
    set: (values: SupportedBehaviors.StatePatchOf<SupportedBehaviorsOf<K, K1, K2, K3>>) => void;
};
export declare const MatterEndpoint: <P extends EndpointType & MutableEndpoint, T extends Constructor<ISYDeviceNode<any, any, any>>>(base: T, endpointType: P) => {
    new (...args: any[]): {
        endpointType: P;
        createEndpoint<K extends SupportedBehaviors>(): Endpoint;
    };
} & T;
export declare class BridgedISYNodeInformationServer extends BridgedDeviceBasicInformationServer {
    initialize(): Promise<void>;
}
export declare namespace BridgedISYNodeInformationServer {
    class State extends BridgedDeviceBasicInformationServer.State {
        address: string;
    }
}
//# sourceMappingURL=EndpointFor.d.ts.map