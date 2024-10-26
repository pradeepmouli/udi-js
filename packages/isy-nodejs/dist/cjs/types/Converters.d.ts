import { UnitOfMeasure } from "./Definitions/Global/UOM.js";
import { Converter } from './Utils.js';
declare const StandardConverters: {
    [x in `${keyof typeof UnitOfMeasure}`]?: {
        [y in `${keyof typeof UnitOfMeasure}`]?: Converter<any, any>;
    };
};
export declare const ConverterRegistry: Map<UnitOfMeasure, Map<UnitOfMeasure, Converter<any, any>>>;
export declare function registerConverter(from: UnitOfMeasure, to: UnitOfMeasure, converter: Converter<any, any>): void;
export declare namespace Converters {
    const Standard: typeof StandardConverters;
    const Matter: {
        [x in `${keyof typeof UnitOfMeasure}`]?: {
            [y: string]: Converter<any, any>;
        };
    };
    function getConverter(from: UnitOfMeasure, to: UnitOfMeasure): Converter<any, any>;
    function convert<F, T>(from: UnitOfMeasure, to: UnitOfMeasure, value: F): T;
}
export {};
//# sourceMappingURL=Converters.d.ts.map