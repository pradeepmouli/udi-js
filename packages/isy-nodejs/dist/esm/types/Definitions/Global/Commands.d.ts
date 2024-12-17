import type { ISYNode } from '../../ISYNode.js';
import { UnitOfMeasure } from './UOM.js';
export interface Parameter<P, T> {
    id?: P;
    name?: string;
    label?: string;
    value?: T;
    uom: UnitOfMeasure;
    serverUom?: UnitOfMeasure;
    converter?: (value: T) => T;
    driver: string;
}
type ParameterCollection = {
    [K: string]: Parameter<typeof K, any>;
};
export type Command<C extends string, N = C, L = N, P extends {
    [K: string]: Parameter<typeof K, any>;
} | Parameter<string, any> = null> = P extends null ? {
    id: C;
    label: L;
    name: N;
} : P extends Parameter<string, any> ? {
    id: C;
    label: L;
    name: N;
    uom: P['uom'];
    serverUom?: P['serverUom'];
    converter?: (value: P['value']) => P['value'];
    driver: P['driver'];
} : P extends ParameterCollection ? {
    (params: {
        [x in keyof P]: P[x]["value"];
    }): Promise<boolean>;
    id: C;
    label: L;
    name: N;
    parameters: P;
} : never;
export declare namespace Command {
    type Signature<F extends {
        name: any;
    } = CallableFunction, L extends string = string, N extends string = string> = F & {
        label: L;
        name: N;
    };
    type Signatures<C extends string> = {
        [K in C]: Signature<(...args: any[]) => Promise<Boolean>, string, string>;
    };
    type NoExtraKeys<U> = U extends infer F ? F : never;
    type NoExtend<F, T> = F extends T ? F : never;
    type For<N extends string, L extends string, T> = T extends Signature<infer F, L, N> ? F : T;
    type ForAll<T extends Signatures<any>> = {
        [K in keyof T]: For<T[K]['name'], T[K]['label'], T[K]>;
    };
    function create<C extends string, N = string, L = string, P extends ParameterCollection | Parameter<any, any> | null = null>(command: C, node: ISYNode<any, any, any, any>, label: L, name: N, parameters?: P): Command<C, N, L, P>;
}
export {};
//# sourceMappingURL=Commands.d.ts.map