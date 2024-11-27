import { UnitOfMeasure } from './Definitions/Global/UOM.js';
import { type StringKeys } from './Utils.js';
import { Paths } from 'type-fest';
declare const StandardConverters: {
    Boolean: {
        LevelFrom0To255: {
            to: (value: boolean) => 0 | 255;
            from: (value: number) => boolean;
        };
        Percent: {
            to: (value: boolean) => 0 | 100;
            from: (value: number) => boolean;
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
    export const Standard: typeof StandardConverters;
    export const Matter: {
        LevelFrom0To255: {
            LightingLevel: {
                from: (value: number) => number;
                to: (value: number) => number;
            };
        };
        Percent: {
            LightingLevel: {
                from: (value: number) => number;
                to: (value: number) => number;
            };
        };
        Boolean: {
            LightingLevel: {
                from: (value: number) => boolean;
                to: (value: any) => 0 | 254;
            };
        };
    };
    export type ConverterTypes = `${StringKeys<typeof StandardConverters>}`;
    type StandardConverters = Paths<typeof StandardConverters, {
        maxRecursionDepth: 1;
        bracketNotation: false;
    }>;
    type Invert<K extends string> = K extends `${infer T}.${infer U}` ? `${U}.${T}` | K : never;
    export type MatterISYConvertibleTypes = `${StringKeys<(typeof Matter)[`${keyof typeof Matter}`]>}`;
    export type ISYMatterConvertibleTypes = `${StringKeys<typeof Matter>}`;
    export type MatterConverters = Paths<typeof Matter, {
        maxRecursionDepth: 1;
        bracketNotation: false;
    }>;
    export type KnownConverters = Invert<StandardConverters> | Invert<MatterConverters>;
    export function get(label: KnownConverters): Converter<any, any>;
    export function get(from: UnitOfMeasure, to: UnitOfMeasure): Converter<any, any>;
    export function get(from: ConverterTypes, to: ConverterTypes): any;
    export function get(from: UnitOfMeasure, to: UnitOfMeasure): any;
    export function get(from: MatterISYConvertibleTypes, to: ISYMatterConvertibleTypes): any;
    export function get(to: ISYMatterConvertibleTypes, from: MatterISYConvertibleTypes): any;
    export function convert<F, T>(from: UnitOfMeasure, to: UnitOfMeasure, value: F): T;
    export function register<F, T>(from: UnitOfMeasure, to: UnitOfMeasure, converter: Converter<F, T>): void;
    export {};
}
export interface Converter<F, T> {
    from: (value: F) => T;
    to: (value: T) => F;
}
export declare function invert<F, T>(converter: Converter<F, T>): Converter<T, F>;
export {};
//# sourceMappingURL=Converters.d.ts.map