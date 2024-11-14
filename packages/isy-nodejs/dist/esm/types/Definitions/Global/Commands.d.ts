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
        [K in keyof T]: For<T[K]["name"], T[K]["label"], T[K]>;
    };
}
//# sourceMappingURL=Commands.d.ts.map