import type { ISYNode } from '../ISYNode.js';
import { ISY } from '../ISY.js';
import type { NodeInfo } from '../Model/NodeInfo.js';
import type { Constructor } from 'type-fest';
export type CompositeDevice<N extends {
    [x: string]: ISYNode<any, any, any, any>;
}> = {
    [x in keyof N]: N[x];
} & {
    events: {
        [x in keyof N]: N[x]['events'];
    };
    drivers: {
        [x in keyof N]: N[x]['drivers'];
    };
    commands: {
        [x in keyof N]: N[x]['commands'];
    };
    addNode: (isy: ISY, node: NodeInfo) => void;
};
export declare function CompositeOf<N extends {
    [x: string]: ISYNode<any, any, any, any>;
}>(nodes: {
    [x in keyof N]: Constructor<N[x]>;
}, keyFunction: (node: NodeInfo) => keyof N): Constructor<CompositeDevice<N>>;
//# sourceMappingURL=ISYMultiNodeDevice.d.ts.map