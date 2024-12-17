import { Behavior } from '@matter/node';
import type { ISYNode } from '../../ISYNode.js';
import type { Constructor } from 'type-fest';
import type { ISYDeviceNode } from '../../Devices/ISYDeviceNode.js';
import { Family } from '../../Definitions/Global/Families.js';
export declare namespace BehaviorRegistry {
    function register<T extends Behavior.Type, F extends Family, P extends ISYNode<F>>(behavior: T & {
        cluster: {
            name: string;
        };
        nodeClass: Constructor<P>;
    }, family?: keyof typeof Family): void;
    function get<T extends ISYDeviceNode<any, any, any, any>>(node: T, cluster: string): Behavior.Type;
}
//# sourceMappingURL=BehaviorRegistry.d.ts.map