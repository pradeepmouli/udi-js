export type RelaxTypes<V> = V extends number ? number : V extends bigint ? bigint : V extends object ? V extends (...args: any[]) => any ? V : {
    [K in keyof V]: RelaxTypes<V[K]>;
} : V;
//# sourceMappingURL=MapsTo.d.ts.map