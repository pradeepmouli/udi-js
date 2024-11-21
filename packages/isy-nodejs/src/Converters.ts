import { UnitOfMeasure } from './Definitions/Global/UOM.js';
import { type Leaves, type Paths, type PathsWithLimit, type StringKeys } from './Utils.js';

let BooleanPercentage: Converter<boolean, number>;
let NullConverter: Converter<any, any>;
{
	to: (value: any) => value;
	from: (value: any) => value;
}

const StandardConverters = {
	Boolean: {
		LevelFrom0To255: {
			to: (value: boolean) => (value ? 255 : 0),
			from: (value: number) => value > 0
		},
		Percent: {
			to: (value: number): boolean => {
				return value > 0;
			},
			from: (value: boolean): number => {
				return value ? 100 : 0;
			}
		}
	},
	LevelFrom0To255: {
		Percent: {
			to: (value: number): number => {
				return Math.round((value * 100) / 255);
			},
			from: (value: number): number => {
				return Math.round((value * 255) / 100);
			}
		}
	}
};

//StandardConverters.Percent.LevelFrom0To255 = invert(StandardConverters.LevelFrom0To255.Percent);
//StandardConverters.LevelFrom0To255.Boolean = invert(StandardConverters.Boolean.LevelFrom0To255);

export const StdConverterRegistry = new Map<UnitOfMeasure | string, Map<UnitOfMeasure | string, Converter<any, any>>>();

export const ConverterRegistry = new Map<string, Converter<any, any>>();

function registerConverters() {
	for (const from in StandardConverters) {
		for (const to in StandardConverters[from]) {
			registerConverter(from, to, StandardConverters[from][to] as Converter<any, any>);
			registerConverter(to, from, invert(StandardConverters[from][to]) as Converter<any, any>);
		}
	}
	for (const from in Converter.Matter) {
		for (const to in Converter.Matter[from]) {
			registerConverter(from, to, Converter.Matter[from][to] as Converter<any, any>);
			registerConverter(to, from, invert(Converter.Matter[from][to]) as Converter<any, any>);
		}
	}
}

function registerConverter(
	from: keyof typeof StandardConverters | keyof typeof Converter.Matter | Paths<typeof StandardConverters> | Paths<typeof Converter.Matter> | string,
	to: keyof typeof StandardConverters | keyof typeof Converter.Matter | string,
	converter: Converter<any, any>
) {
	if (!StdConverterRegistry.has(from)) {
		StdConverterRegistry.set(from, new Map());
	}

	StdConverterRegistry.get(from).set(to, converter);
	let key = from + '.' + to;
	if (!ConverterRegistry.has(key)) {
		ConverterRegistry.set(key, converter);
	}
}

export namespace Converter {
	export const Standard: typeof StandardConverters = StandardConverters;

	export const Matter = {
		LevelFrom0To255: {
			LightingLevel: {
				from: (value) =>
					value === 1 ? 0
					: value === 254 ? 255
					: value,
				to: (value) =>
					value === 0 ? 1
					: value === 255 ? 254
					: value
			}

		},
		Percent: {
			LightingLevel: {
				from: (value) =>
					value === 1 ? 0
					: value === 254 ? 100
					: Math.round(value / 254 * 100),
				to: (value) =>
					value === 0 ? 1
					: value === 100 ? 254
					: Math.round(value / 100 * 254)
			}
		}
	};

	export type ConverterTypes = `${StringKeys<typeof StandardConverters>}`;

	export type StandardConverters = `${StringKeys<typeof StandardConverters>}.${StringKeys<typeof StandardConverters>}`;

	//export type StandardConvertersList = PathsWithLimit<typeof StandardConverters, 1>;

	export type MatterISYConvertibleTypes = `${StringKeys<(typeof Matter)[`${keyof typeof Matter}`]>}`;

	export type ISYMatterConvertibleTypes = `${StringKeys<typeof Matter>}`;

	export type MatterConverters = `${MatterISYConvertibleTypes}.${ISYMatterConvertibleTypes}` | `${ISYMatterConvertibleTypes}.${MatterISYConvertibleTypes}`;

	export type KnownConverters = StandardConverters | MatterConverters;
	const cache: { [x: string]: Converter<any, any> } = {};
	export function get(label: KnownConverters): Converter<any, any>;
	export function get(from: UnitOfMeasure, to: UnitOfMeasure): Converter<any,any>
	export function get(from: ConverterTypes, to: ConverterTypes);
	export function get(from: UnitOfMeasure, to: UnitOfMeasure);
	export function get(from: MatterISYConvertibleTypes, to: ISYMatterConvertibleTypes);
	export function get(to: ISYMatterConvertibleTypes, from: MatterISYConvertibleTypes);
	export function get(from: UnitOfMeasure | `${keyof typeof UnitOfMeasure}` | string, to?: UnitOfMeasure | `${keyof typeof UnitOfMeasure}` | string): Converter<any, any> {
		if (to === undefined) {
			return ConverterRegistry.get(from as string) ?? NullConverter;
		}
		if (cache[`${from}.${to}`]) {
			return cache[`${from}.${to}`];
		} else if (cache[`${to}.${from}`]) {
			cache[`${from}.${to}`] = invert(cache[`${to}.${from}`]);
			return cache[`${from}.${to}`];
		}
		let isString = typeof from === 'string';
		let fuom = isString ? from : UnitOfMeasure[from];
		if (to) {
			let tuom = typeof to === 'string' ? to : UnitOfMeasure[to];

			if (StdConverterRegistry.has(fuom)) {
				if (StdConverterRegistry.get(fuom).has(tuom)) {
					return StdConverterRegistry.get(fuom).get(tuom);
				}
			}
		}
		return NullConverter;
	}

	export function convert<F, T>(from: UnitOfMeasure, to: UnitOfMeasure, value: F): T {
		const converter = get(from, to);
		if (converter) {
			return converter.to(value);
		}
		return null;
	}


	export function register<F,T>(from: UnitOfMeasure, to: UnitOfMeasure, converter: Converter<F, T>) {
		registerConverter(UnitOfMeasure[from], UnitOfMeasure[to], converter);
	}

}

registerConverters();
export interface Converter<F, T> {
	// #region Properties (2)
	from: (value: F) => T;
	to: (value: T) => F;
} //onst D: d = 'ST';
//type DriverLabel = Values<IdentityOf<DriverType>>;

export function invert<F, T>(converter: Converter<F, T>): Converter<T, F> {
	return {
		from: converter.to,
		to: converter.from
	};
}
