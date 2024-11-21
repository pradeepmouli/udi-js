import { UnitOfMeasure } from './Definitions/Global/UOM.js';
import { type StringKeys } from './Utils.js';
declare const StandardConverters: {
    Boolean: {
        LevelFrom0To255: {
            to: (value: boolean) => 0 | 255;
            from: (value: number) => boolean;
        };
        Percent: {
            to: (value: number) => boolean;
            from: (value: boolean) => number;
        };
    };
    LevelFrom0To255: {
        Percent: {
            to: (value: number) => number;
            from: (value: number) => number;
        };
    };
};
export declare const StdConverterRegistry: Map<string | UnitOfMeasure, Map<string | UnitOfMeasure, Converter<any, any>>>;
export declare const ConverterRegistry: Map<string, Converter<any, any>>;
export declare namespace Converter {
    const Standard: typeof StandardConverters;
    const Matter: {
        LevelFrom0To255: {
            LightingLevel: {
                from: (value: any) => any;
                to: (value: any) => any;
            };
        };
        Percent: {
            LightingLevel: {
                from: (value: any) => number;
                to: (value: any) => number;
            };
        };
    };
    type ConverterTypes = `${StringKeys<typeof StandardConverters>}`;
    type StandardConverters = `${StringKeys<typeof StandardConverters>}.${StringKeys<typeof StandardConverters>}`;
    type MatterISYConvertibleTypes = `${StringKeys<(typeof Matter)[`${keyof typeof Matter}`]>}`;
    type ISYMatterConvertibleTypes = `${StringKeys<typeof Matter>}`;
    type MatterConverters = `${MatterISYConvertibleTypes}.${ISYMatterConvertibleTypes}` | `${ISYMatterConvertibleTypes}.${MatterISYConvertibleTypes}`;
    type KnownConverters = StandardConverters | MatterConverters;
    function get(label: KnownConverters): Converter<any, any>;
    function get(from: UnitOfMeasure, to: UnitOfMeasure): Converter<any, any>;
    function get(from: ConverterTypes, to: ConverterTypes): any;
    function get(from: UnitOfMeasure, to: UnitOfMeasure): any;
    function get(from: MatterISYConvertibleTypes, to: ISYMatterConvertibleTypes): any;
    function get(to: ISYMatterConvertibleTypes, from: MatterISYConvertibleTypes): any;
    function convert<F, T>(from: UnitOfMeasure, to: UnitOfMeasure, value: F): T;
    function register<F, T>(from: UnitOfMeasure, to: UnitOfMeasure, converter: Converter<F, T>): void;
}
export interface Converter<F, T> {
    from: (value: F) => T;
    to: (value: T) => F;
}
export declare function invert<F, T>(converter: Converter<F, T>): Converter<T, F>;
export {};
//# sourceMappingURL=Converters.d.ts.map