"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converters = exports.ConverterRegistry = void 0;
exports.registerConverter = registerConverter;
const UOM_js_1 = require("./Definitions/Global/UOM.js");
const Utils_js_1 = require("./Utils.js");
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
StandardConverters.Percent.LevelFrom0To255 = (0, Utils_js_1.invert)(StandardConverters.LevelFrom0To255.Percent);
StandardConverters.LevelFrom0To255.Boolean = (0, Utils_js_1.invert)(StandardConverters.Boolean.LevelFrom0To255);
exports.ConverterRegistry = new Map();
function registerConverters() {
    for (const from in StandardConverters) {
        for (const to in StandardConverters[from]) {
            registerConverter(UOM_js_1.UnitOfMeasure[from], UOM_js_1.UnitOfMeasure[to], StandardConverters[from][to]);
        }
    }
}
function registerConverter(from, to, converter) {
    if (!exports.ConverterRegistry.has(from)) {
        exports.ConverterRegistry.set(from, new Map());
    }
    exports.ConverterRegistry.get(from).set(to, converter);
}
var Converters;
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
        if (!exports.ConverterRegistry.has(from)) {
            return null;
        }
        return exports.ConverterRegistry.get(from).get(to);
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
})(Converters || (exports.Converters = Converters = {}));
registerConverters();
//# sourceMappingURL=Converters.js.map