import type { Constructor, SimplifyDeep } from 'type-fest';
import type { Family } from '../Definitions/index.js';
import { ISY } from '../ISY.js';
import type { ISYDevice } from '../ISYDevice.js';
import { ISYNode } from '../ISYNode.js';
import type { NodeInfo } from '../Model/NodeInfo.js';
import type { Factory, InstanceOf, ObjectToUnion, StringKeys } from '../Utils.js';
export type CompositeDevice<F extends Family, N extends {
    [x: string]: ISYNode.Factory<F, any>;
}, R = N[keyof N]> = SimplifyDeep<{
    [x in keyof N]: InstanceOf<N[x]>;
}> & {
    root: R;
    events: {
        [x in keyof N]: InstanceType<N[x]['Class']>['events'];
    };
    drivers: {
        [x in keyof N]: InstanceType<N[x]['Class']>['drivers'];
    };
    commands: {
        [x in keyof N]: InstanceType<N[x]['Class']>['commands'];
    };
    addNode: (node: NodeInfo | ISYNode, isy?: ISY) => void;
} & Omit<ISYDevice<Family, unknown, unknown, unknown>, 'drivers' | 'commands' | 'events'>;
export declare namespace CompositeDevice {
    type DriversOf<N extends CompositeDevice<any, any>> = N['drivers'];
    type CommandsOf<N extends CompositeDevice<any, any>> = N['commands'];
    type EventsOf<N extends CompositeDevice<any, any>> = N['events'];
    type DriverNamesOf<N extends CompositeDevice<any, any>> = ObjectToUnion<{
        [x in StringKeys<DriversOf<N>>]: `${x}.${ISYNode.DriverNamesOf<N[x]> & string}`;
    }>;
    type CommandNamesOf<N> = N extends Factory<CompositeDevice<any, infer X>> ? CommandNamesOf<X[keyof X]> : never;
    type EventNamesOf<N extends CompositeDevice<any, any>> = ObjectToUnion<{
        [x in StringKeys<DriversOf<N>>]: `${x}.${ISYNode.EventNamesOf<N[x]> & string}`;
    }>;
    type DriverKeysOf<N extends CompositeDevice<any, any>> = ObjectToUnion<{
        [x in StringKeys<DriversOf<N>>]: `${x}.${ISYNode.DriverKeysOf<N[x]> & string}`;
    }>;
    type CommandKeysOf<N extends CompositeDevice<any, any>> = ObjectToUnion<{
        [x in StringKeys<CommandsOf<N>>]: `${x}.${ISYNode.CommandKeysOf<N[x]> & string}`;
    }>;
    function of<F extends Family, N extends {
        [x: string]: ISYNode.Factory<F, any>;
    }>(nodes: {
        [x in keyof N]: InstanceType<N[x]['Class']>;
    }, keyFunction: (node: NodeInfo) => [keyof N, boolean]): Constructor<CompositeDevice<F, N>>;
    function of<F extends Family, N extends {
        [x: string]: ISYNode.Factory<F, any>;
    }>(nodes: {
        [x in keyof N]: InstanceType<N[x]['Class']>;
    }, keyMap: {
        [x in keyof N]: number | string;
    }): Constructor<CompositeDevice<F, N, N[0]>>;
    function isComposite(device: ISYDevice<any, any, any, any>): device is CompositeDevice<any, any>;
}
export declare function CompositeOf<F extends Family, N extends {
    [x: string]: ISYNode.Factory<F, any>;
}>(nodes: {
    [x in keyof N]: N[x];
}, keyFunction: (node: NodeInfo | ISYNode) => [keyof N, boolean]): Constructor<CompositeDevice<F, N>>;
//# sourceMappingURL=CompositeDevice.d.ts.map