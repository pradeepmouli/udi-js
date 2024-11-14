"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = exports.ConverterRegistry = exports.StdConverterRegistry = void 0;
exports.registerConverter = registerConverter;
exports.invert = invert;
const UOM_js_1 = require("./Definitions/Global/UOM.js");
let BooleanPercentage;
let NullConverter;
{
    to: (value) => value;
    from: (value) => value;
}
const StandardConverters = {
    Boolean: {
        LevelFrom0To255: {
            to: (value) => (value ? 255 : 0),
            from: (value) => value > 0
        },
        Percent: {
            to: (value) => {
                return value > 0;
            },
            from: (value) => {
                return value ? 100 : 0;
            }
        }
    },
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
//StandardConverters.Percent.LevelFrom0To255 = invert(StandardConverters.LevelFrom0To255.Percent);
//StandardConverters.LevelFrom0To255.Boolean = invert(StandardConverters.Boolean.LevelFrom0To255);
exports.StdConverterRegistry = new Map();
exports.ConverterRegistry = new Map();
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
function registerConverter(from, to, converter) {
    if (!exports.StdConverterRegistry.has(from)) {
        exports.StdConverterRegistry.set(from, new Map());
    }
    exports.StdConverterRegistry.get(from).set(to, converter);
    let key = from + '.' + to;
    if (!exports.ConverterRegistry.has(key)) {
        exports.ConverterRegistry.set(key, converter);
    }
}
var Converter;
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
            return exports.ConverterRegistry.get(from) ?? NullConverter;
        }
        if (cache[`${from}.${to}`]) {
            return cache[`${from}.${to}`];
        }
        else if (cache[`${to}.${from}`]) {
            cache[`${from}.${to}`] = invert(cache[`${to}.${from}`]);
            return cache[`${from}.${to}`];
        }
        let isString = typeof from === 'string';
        let fuom = isString ? from : UOM_js_1.UnitOfMeasure[from];
        if (to) {
            let tuom = typeof to === 'string' ? to : UOM_js_1.UnitOfMeasure[to];
            if (exports.StdConverterRegistry.has(fuom)) {
                if (exports.StdConverterRegistry.get(fuom).has(tuom)) {
                    return exports.StdConverterRegistry.get(fuom).get(tuom);
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
})(Converter || (exports.Converter = Converter = {}));
registerConverters();
//type DriverLabel = Values<IdentityOf<DriverType>>;
function invert(converter) {
    return {
        from: converter.to,
        to: converter.from
    };
}
//# sourceMappingURL=Converters.js.map