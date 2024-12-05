import type { ISYDevice } from '../ISYDevice.js';
import { ISYNode } from '../ISYNode.js';
import type { Family } from '../Definitions/index.js';
import { ISY } from '../ISY.js';
import type { NodeInfo } from '../Model/NodeInfo.js';
import type { Constructor } from 'type-fest';
import type { ISYDeviceNode } from './ISYDeviceNode.js';
import type { ObjectToUnion, StringKeys } from '../Utils.js';
export type CompositeDevice<F extends Family, N extends {
    [x: string]: ISYDeviceNode<F, any, any, any>;
}, R = N[keyof N]> = {
    [x in keyof N]: N[x];
} & {
    root: R;
    events: {
        [x in keyof N]: N[x]['events'];
    };
    drivers: {
        [x in keyof N]: N[x]['drivers'];
    };
    commands: {
        [x in keyof N]: N[x]['commands'];
    };
    addNode: (node: NodeInfo | ISYNode, isy?: ISY) => void;
} & ISYDevice<Family, any, unknown, any>;
export declare namespace CompositeDevice {
    type DriversOf<N extends CompositeDevice<any, any>> = N['drivers'];
    type CommandsOf<N extends CompositeDevice<any, any>> = N['commands'];
    type EventsOf<N extends CompositeDevice<any, any>> = N['events'];
    type DriverNamesOf<N extends CompositeDevice<any, any>> = ObjectToUnion<{
        [x in StringKeys<DriversOf<N>>]: `${x}.${ISYNode.DriverNamesOf<N[x]> & string}`;
    }>;
    type CommandNamesOf<N extends CompositeDevice<any, any>> = ObjectToUnion<{
        [x in StringKeys<DriversOf<N>>]: `${x}.${ISYNode.CommandNamesOf<N[x]> & string}`;
    }>;
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
        [x: string]: ISYDeviceNode<any, any, any, any>;
    }>(nodes: {
        [x in keyof N]: Constructor<N[x]>;
    }, keyFunction: (node: NodeInfo) => [keyof N, boolean]): Constructor<CompositeDevice<F, N>>;
    function of<F extends Family, N extends {
        [x: string]: ISYDeviceNode<any, any, any, any>;
    }>(nodes: {
        [x in keyof N]: Constructor<N[x]>;
    }, keyMap: {
        [x in keyof N]: number | string;
    }): Constructor<CompositeDevice<F, N>>;
    function isComposite(device: ISYDevice<any, any, any, any>): device is CompositeDevice<any, any>;
}
export declare function CompositeOf<F extends Family, N extends {
    [x: string]: ISYDeviceNode<any, any, any, any>;
}>(nodes: {
    [x in keyof N]: Constructor<N[x]>;
}, keyFunction: (node: NodeInfo | ISYNode) => [keyof N, boolean]): Constructor<CompositeDevice<F, N>>;
//# sourceMappingURL=CompositeDevice.d.ts.map