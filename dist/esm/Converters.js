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
            from: (value) => {
                return Math.round((value * 255) / 100);
            },
            to: (value) => {
                return Math.round((value * 100) / 255);
            },
        },
    },
};
StandardConverters.Percent.LevelFrom0To255 = invert(StandardConverters.LevelFrom0To255.Percent);
StandardConverters.LevelFrom0To255.Boolean = invert(StandardConverters.Boolean.LevelFrom0To255);
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
})(Converters || (Converters = {}));
