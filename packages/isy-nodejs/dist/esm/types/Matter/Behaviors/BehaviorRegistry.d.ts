import { ClusterBehavior, type Behavior } from '@matter/node';
import type { Constructor } from '../../Devices/Constructor.js';
export declare namespace BehaviorRegistry {
    function register<T extends Behavior.Type>(behavior: {
        cluster: {
            name: string;
        };
    } & Constructor<ClusterBehavior>): void;
    function get(cluster: string): Constructor<ClusterBehavior>;
}
//# sourceMappingURL=BehaviorRegistry.d.ts.map