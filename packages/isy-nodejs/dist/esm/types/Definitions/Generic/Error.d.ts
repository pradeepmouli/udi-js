import type { Converter } from '../../Converters.js';
export declare enum Error {
    True = 0,
    False = 1
}
export declare namespace Error {
    const Boolean: Converter<boolean, Error>;
    const Index: Converter<Error, number>;
}
//# sourceMappingURL=Error.d.ts.map