import { Driver } from '../Definitions/Global/Drivers.js';
import type { MaybeArray } from '../Utils.js';
export interface DriverDef {
    id: Driver.Type;
    editor: string;
    hide?: string;
}
export interface SendCommandDef {
    id: string;
}
export interface AcceptCommandDef {
    name?: string;
    id?: string;
    p?: MaybeArray<{
        id: string;
        editor: string;
        init: string;
        optional?: string;
    }>;
}
export interface NodeDef extends Nested<"st"> {
    id: string;
    nls: string;
    nodeType: string;
    eventMap: string;
    links: Link;
    sts: {
        st: MaybeArray<DriverDef>;
    };
    cmds: {
        sends: {
            cmd: MaybeArray<SendCommandDef>;
        };
        accepts: {
            cmd: MaybeArray<AcceptCommandDef>;
        };
    };
}
export interface Accept {
    cmd: Cmd[];
}
export interface Cmd {
    accepts: Accept;
}
export interface Link {
    linkdef: string;
}
export interface Rsp {
    link: Link[];
}
export interface Link {
    ctl: string;
    rsp: Rsp;
}
export interface NodeDefs {
    nodeDef: MaybeArray<NodeDef>;
}
type NestedObject<Label extends string> = {
    [x in `${Label}s`]: {
        [y in `${Label}`]: any;
    };
};
type Singular<T> = T extends `${infer R}s` ? R : never;
type Nested<T extends string> = {
    [x in T]: {
        [y in Singular<x>]: any;
    };
};
export declare function flattenNestedProperty<T extends string>(input: NestedObject<T>, property: T): NestedObject<T> & {
    [x: string]: any;
};
export declare function flattenNestedObject<Label extends string, T = unknown>(input: NestedObject<Label>): Omit<typeof input, Label> & {
    [x in `${Label}s`]: MaybeArray<T> | T | T[];
};
export {};
