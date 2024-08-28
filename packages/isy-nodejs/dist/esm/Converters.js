import { UnitOfMeasure } from "./Definitions/Global/UOM.js";
import { invert } from './Utils.js';
let BooleanPercentage;
BooleanPercentage = {
    to: (value) => {
        return value > 0;
    },
    from: (value) => {
        return value ? 100 : 0;
    },
};
const StandardConverters = {
    Boolean: {
        LevelFrom0To255: {
            from: (value) => value > 0,
            to: (value) => (value ? 255 : 0),
        },
        Percent: BooleanPercentage,
    },
    Percent: {},
    LevelFrom0To255: {
        Percent: {
            to: (value) => {
                return Math.round((value * 255) / 100);
            },
            from: (value) => {
                return Math.round((value * 100) / 255);
            },
        },
    },
};
StandardConverters.Percent.LevelFrom0To255 = invert(StandardConverters.LevelFrom0To255.Percent);
StandardConverters.LevelFrom0To255.Boolean = invert(StandardConverters.Boolean.LevelFrom0To255);
export const ConverterRegistry = new Map();
function registerConverters() {
    for (const from in StandardConverters) {
        for (const to in StandardConverters[from]) {
            registerConverter(UnitOfMeasure[from], UnitOfMeasure[to], StandardConverters[from][to]);
        }
    }
}
export function registerConverter(from, to, converter) {
    if (!ConverterRegistry.has(from)) {
        ConverterRegistry.set(from, new Map());
    }
    ConverterRegistry.get(from).set(to, converter);
}
export var Converters;
(function (Converters) {
    Converters.Standard = StandardConverters;
    Converters.Matter = {
        LevelFrom0To255: {
            LightingLevel: {
                from: (value) => (value === 1 ? 0 : value === 254 ? 255 : value),
                to: (value) => (value === 0 ? 1 : value === 255 ? 254 : value),
            },
        }
    };
    function getConverter(from, to) {
        if (!ConverterRegistry.has(from)) {
            return null;
        }
        return ConverterRegistry.get(from).get(to);
    }
    Converters.getConverter = getConverter;
    function convert(from, to, value) {
        const converter = getConverter(from, to);
        if (converter) {
            return converter.to(value);
        }
        return null;
    }
    Converters.convert = convert;
})(Converters || (Converters = {}));
registerConverters();
//# sourceMappingURL=Converters.js.map