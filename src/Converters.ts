import { UnitOfMeasure } from "./Definitions/Global/UOM.js";
import { Converter, invert } from './Utils.js';


let BooleanPercentage: Converter<boolean, number>;

BooleanPercentage = {
  to: (value: number): boolean => {
    return value > 0;
  },
  from: (value: boolean): number => {
    return value ? 100 : 0;
  },
};


const StandardConverters : {
    [x in `${keyof typeof UnitOfMeasure}`]?: { [y in `${keyof typeof UnitOfMeasure}`]?: Converter<any, any> };
  }  = {
  Boolean: {
    LevelFrom0To255: {
      from: (value: number) => value > 0,
      to: (value: boolean) => (value ? 255 : 0),
    },
    Percent: BooleanPercentage,
  },
  Percent: {},
  LevelFrom0To255: {
    Percent: {
      from: (value: number): number => {
        return Math.round((value * 255) / 100);
      },
      to: (value: number): number => {
        return Math.round((value * 100) / 255);
      },
    },
  },
};

StandardConverters.Percent.LevelFrom0To255 = invert(StandardConverters.LevelFrom0To255.Percent);
StandardConverters.LevelFrom0To255.Boolean = invert(StandardConverters.Boolean.LevelFrom0To255);


export namespace Converters {
  export const Standard = StandardConverters;

  export const Matter: { [x in `${keyof typeof UnitOfMeasure}`]?: { [y: string]: Converter<any, any> } } = {
    LevelFrom0To255: {
      LightingLevel: {
        from: (value) => (value === 1 ? 0 : value === 254 ? 255 : value),
        to: (value) => (value === 0 ? 1 : value === 255 ? 254 : value),
      },
    }
  };
}
