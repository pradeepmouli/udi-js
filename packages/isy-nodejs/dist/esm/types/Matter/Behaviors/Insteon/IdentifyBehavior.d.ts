import { Identify } from '@project-chip/matter.js/cluster';
import * as Insteon from '../../../Devices/Insteon/index.js';
declare const IdentifyBehavior_base: import("@matter/node").ClusterBehavior.Type<import("@project-chip/matter.js/cluster").ElementModifier.WithAlterations<Identify.Cluster, {
    readonly commands: {
        readonly triggerEffect: {
            readonly optional: false;
        };
    };
}>, typeof import("@matter/node/behaviors").IdentifyServer, import("@matter/node/behaviors").IdentifyInterface> & (new (...args: any[]) => import("../ISYClusterBehavior.js").DeviceBehavior<Insteon.Relay, import("@matter/node").ClusterBehavior.Type<import("@project-chip/matter.js/cluster").ElementModifier.WithAlterations<Identify.Cluster, {
    readonly commands: {
        readonly triggerEffect: {
            readonly optional: false;
        };
    };
}>, typeof import("@matter/node/behaviors").IdentifyServer, import("@matter/node/behaviors").IdentifyInterface>>) & {
    nodeClass: import("../../../Devices/Constructor.js").Constructor<Insteon.Relay>;
};
export declare class IdentifyBehavior extends IdentifyBehavior_base {
    initialize(_options?: {}): Promise<void>;
    identify(): Promise<any>;
    triggerEffect(request: Identify.TriggerEffectRequest): Promise<any>;
}
export {};
//# sourceMappingURL=IdentifyBehavior.d.ts.map