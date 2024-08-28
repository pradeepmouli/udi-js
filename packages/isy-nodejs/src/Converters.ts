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
      to: (value: number): number => {
        return Math.round((value * 255) / 100);
      },
      from: (value: number): number => {
        return Math.round((value * 100) / 255);
      },
    },
  },
};

StandardConverters.Percent.LevelFrom0To255 = invert(StandardConverters.LevelFrom0To255.Percent);
StandardConverters.LevelFrom0To255.Boolean = invert(StandardConverters.Boolean.LevelFrom0To255);

export const ConverterRegistry = new Map<UnitOfMeasure, Map<UnitOfMeasure, Converter<any, any>>>();

function registerConverters(){
  for (const from in StandardConverters) {
    for (const to in StandardConverters[from]) {
      registerConverter(UnitOfMeasure[from], UnitOfMeasure[to], StandardConverters[from][to] as Converter<any, any>);
    }
  }
}

export function registerConverter(from: UnitOfMeasure, to: UnitOfMeasure, converter: Converter<any, any>)
{
  if (!ConverterRegistry.has(from)) {
    ConverterRegistry.set(from, new Map());
  }
  ConverterRegistry.get(from).set(to, converter);
}

export namespace Converters {
  export const Standard : typeof StandardConverters = StandardConverters;

  export const Matter: { [x in `${keyof typeof UnitOfMeasure}`]?: { [y: string]: Converter<any, any> } } = {
    LevelFrom0To255: {
      LightingLevel: {
        from: (value) => (value === 1 ? 0 : value === 254 ? 255 : value),
        to: (value) => (value === 0 ? 1 : value === 255 ? 254 : value),
      },
    }
  };

  export function getConverter(from: UnitOfMeasure, to: UnitOfMeasure): Converter<any, any> {
    if (!ConverterRegistry.has(from)) {
      return null;
    }
    return ConverterRegistry.get(from).get(to);
  }

  export function convert<F,T>(from: UnitOfMeasure, to: UnitOfMeasure, value: F): T {
    const converter = getConverter(from, to);
    if (converter) {
      return converter.to(value);
    }
    return null;
  }
}

registerConverters();