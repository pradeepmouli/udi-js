import { UnitOfMeasure } from './Definitions/Global/UOM.js';
let BooleanPercentage;
let NullConverter;
{
    to: (value) => value;
    from: (value) => value;
}
BooleanPercentage = {
    to: (value) => {
        return value > 0;
    },
    from: (value) => {
        return value ? 100 : 0;
    }
};
const StandardConverters = {
    Boolean: {
        LevelFrom0To255: {
            to: (value) => (value ? 255 : 0),
            from: (value) => value > 0
        },
        Percent: BooleanPercentage
    },
    Percent: {},
    LevelFrom0To255: {
        Percent: {
            to: (value) => {
                return Math.round((value * 100) / 255);
            },
            from: (value) => {
                return Math.round((value * 255) / 100);
            }
        }
    }
};
StandardConverters.Percent.LevelFrom0To255 = invert(StandardConverters.LevelFrom0To255.Percent);
StandardConverters.LevelFrom0To255.Boolean = invert(StandardConverters.Boolean.LevelFrom0To255);
export const StdConverterRegistry = new Map();
export const ConverterRegistry = new Map();
function registerConverters() {
    for (const from in StandardConverters) {
        for (const to in StandardConverters[from]) {
            registerConverter(from, to, StandardConverters[from][to]);
            registerConverter(to, from, invert(StandardConverters[from][to]));
        }
    }
    for (const from in Converter.Matter) {
        for (const to in Converter.Matter[from]) {
            registerConverter(from, to, Converter.Matter[from][to]);
            registerConverter(to, from, invert(Converter.Matter[from][to]));
        }
    }
}
export function registerConverter(from, to, converter) {
    if (!StdConverterRegistry.has(from)) {
        StdConverterRegistry.set(from, new Map());
    }
    StdConverterRegistry.get(from).set(to, converter);
    let key = from + '.' + to;
    if (!ConverterRegistry.has(key)) {
        ConverterRegistry.set(key, converter);
    }
}
export var Converter;
(function (Converter) {
    Converter.Standard = StandardConverters;
    Converter.Matter = {
        LevelFrom0To255: {
            LightingLevel: {
                from: (value) => value === 1 ? 0
                    : value === 254 ? 255
                        : value,
                to: (value) => value === 0 ? 1
                    : value === 255 ? 254
                        : value
            }
        }
    };
    const cache = {};
    function get(from, to) {
        if (to === undefined) {
            return ConverterRegistry.get(from) ?? NullConverter;
        }
        if (cache[`${from}.${to}`]) {
            return cache[`${from}.${to}`];
        }
        else if (cache[`${to}.${from}`]) {
            cache[`${from}.${to}`] = invert(cache[`${to}.${from}`]);
            return cache[`${from}.${to}`];
        }
        let isString = typeof from === 'string';
        let fuom = isString ? from : UnitOfMeasure[from];
        if (to) {
            let tuom = typeof to === 'string' ? to : UnitOfMeasure[to];
            ;
            if (StdConverterRegistry.has(fuom)) {
                if (StdConverterRegistry.get(fuom).has(tuom)) {
                    return StdConverterRegistry.get(fuom).get(tuom);
                }
            }
        }
        return NullConverter;
    }
    Converter.get = get;
    function convert(from, to, value) {
        const converter = get(from, to);
        if (converter) {
            return converter.to(value);
        }
        return null;
    }
    Converter.convert = convert;
})(Converter || (Converter = {}));
registerConverters();
//type DriverLabel = Values<IdentityOf<DriverType>>;
export function invert(converter) {
    return {
        from: converter.to,
        to: converter.from
    };
}
//# sourceMappingURL=Converters.js.map