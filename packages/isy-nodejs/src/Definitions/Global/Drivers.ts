import EventEmitter from 'events';
import { isBoxedPrimitive } from 'util/types';
import type { ISYNode } from '../../ISYNode.js';
import { UnitOfMeasure } from './UOM.js';

import type { Identity, MaybePromise, UnionToIntersection } from '@matter/general';
import { server } from 'typescript';
import { Converter } from '../../Converters.js';
import type { ISYDeviceNode } from '../../Devices/ISYDeviceNode.js';
import type { DriverState } from '../../Model/DriverState.js';
import type { StringKeys } from '../../Utils.js';
import type { Family } from './Families.js';

export enum DriverType {
	AccelerationXAxis = 'ACCX',
	AccelerationYAxis = 'ACCY',
	AccelerationZAxis = 'ACCZ',
	AirFlow = 'AIRFLOW',
	AirQualityIndex = 'AQI',
	Alarm = 'ALARM',
	AnglePosition = 'ANGLPOS',
	AtmosphericPressure = 'ATMPRES',
	AutoDRProcessingState = 'ADRPST',
	Awake = 'AWAKE',
	BarometricPressure = 'BARPRES',
	BatteryLevel = 'BATLVL',
	Beep = 'BEEP',
	BloodPressureDiastolic = 'BPDIA',
	BloodPressureSystolic = 'BPSYS',
	BodyMassIndex = 'BMI',
	BoneMass = 'BONEM',
	Brighten = 'BRT',
	CarbonMonoxideLevel = 'CO',
	CO2Level = 'CO2LVL',
	ControllerAction = 'CTL',
	CoolSetpoint = 'CLISPC',
	CurrentCurrent = 'CC',
	CurrentPowerUsed = 'CPW',
	CurrentTemperature = 'CLITEMP',
	CurrentVoltage = 'CV',
	CustomControl0 = 'GV0',
	CustomControl1 = 'GV1',
	CustomControl2 = 'GV2',
	CustomControl3 = 'GV3',

	CustomControl4 = 'GV4',
	CustomControl5 = 'GV5',
	CustomControl6 = 'GV6',
	CustomControl7 = 'GV7',
	CustomControl8 = 'GV8',
	CustomControl9 = 'GV9',
	CustomControl10 = 'GV10',
	CustomControl11 = 'GV11',
	CustomControl12 = 'GV12',
	CustomControl13 = 'GV13',
	CustomControl14 = 'GV14',
	CustomControl15 = 'GV15',
	CustomControl16 = 'GV16',
	CustomControl17 = 'GV17',
	CustomControl18 = 'GV18',
	CustomControl19 = 'GV19',
	CustomControl20 = 'GV20',
	CustomControl21 = 'GV21',
	CustomControl22 = 'GV22',
	CustomControl23 = 'GV23',
	CustomControl24 = 'GV24',
	CustomControl25 = 'GV25',
	CustomControl26 = 'GV26',
	CustomControl27 = 'GV27',
	CustomControl28 = 'GV28',
	CustomControl29 = 'GV29',
	CustomControl30 = 'GV30',
	Delay = 'DELAY',
	DewPoint = 'DEWPT',
	DeviceIsBusy = 'BUSY',
	DeviceSecureMode = 'SECMD',
	Dim = 'DIM',
	Distance = 'DISTANC',
	DomesticHotWaterTemperature = 'WATERTD',
	Duration = 'DUR',
	ElectricalConductivity = 'ELECCON',
	ElectricalResistivity = 'ELECRES',
	EnergyMode = 'CLIEMD',
	Error = 'ERR',
	Evapotranspiration = 'ETO',
	ExhaustTemperature = 'TEMPEXH',
	FadeDown = 'FDDOWN',
	FadeStop = 'FDSTOP',
	FadeUp = 'FDUP',
	FanRunningState = 'CLIFRS',
	FanSetting = 'CLIFS',
	FanSettingOverride = 'CLIFSO',
	FastOff = 'DFOF',
	FastOn = 'DFON',
	FormaldehydeCH2OLevel = 'CH20',
	Frequency = 'FREQ',
	GeneralPurposeValue = 'GPV',
	GenericVolume = 'GVOL',
	Gust = 'GUST',
	HeatCoolState = 'CLIHCS',
	HeatIndex = 'HEATIX',
	HeatSetpoint = 'CLISPH',
	Hail = 'HAIL',
	HeartRate = 'HR',
	Humidity = 'CLIHUM',
	Luminance = 'LUMIN',
	MethaneDensity = 'METHANE',
	Mode = 'MODE',
	Moisture = 'MOIST',
	MoonPhase = 'MOON',
	MuscleMass = 'MUSCLEM',
	Off = 'DOF',
	Off3KeyPresses = 'DOF3',
	Off4KeyPresses = 'DOF4',
	Off5KeyPresses = 'DOF5',
	On = 'DON',
	On3KeyPresses = 'DON3',
	On4KeyPresses = 'DON4',
	On5KeyPresses = 'DON5',
	OnLevel = 'OL',
	Ozone = 'OZONE',
	ParticulateMatter10 = 'PM10',
	ParticulateMatter25 = 'PM25',
	PercentChanceOfPrecipitation = 'POP',
	PolarizedPowerUsed = 'PPW',
	PowerFactor = 'PF',
	Precipitation = 'PRECIP',
	PulseCount = 'PULSCNT',
	QueryDevice = 'QUERY',
	RadonConcentration = 'RADON',
	RainRate = 'RAINRT',
	RampRate = 'RR',
	RelativeModulationLevel = 'RELMOD',
	ResetValues = 'RESET',
	RespiratoryRate = 'RESPR',
	RFSignalStrength = 'RFSS',
	Rotation = 'ROTATE',
	ScheduleMode = 'CLISMD',
	SeismicIntensity = 'SEISINT',
	SeismicMagnitude = 'SEISMAG',
	SmokeDensity = 'SMOKED',
	SoilHumidity = 'SOILH',
	SoilReactivity = 'SOILR',
	SoilSalinity = 'SOILS',
	SoilTemperature = 'SOILT',
	SolarRadiation = 'SOLRAD',
	SoundVolume = 'SVOL',
	Speed = 'SPEED',
	Status = 'ST',
	TankCapacity = 'TANKCAP',
	TheUserAccessCodeThatAssociatedWithTheMostRecentAlarm = 'USRNUM',
	ThermostatMode = 'CLIMD',
	TideLevel = 'TIDELVL',
	Time = 'TIME',
	TimeRemaining = 'TIMEREM',
	TotalBodyWater = 'TBW',
	TotalPowerUsed = 'TPW',
	Ultraviolet = 'UV',
	ValidUserAccessCodeEntered = 'UAC',
	Velocity = 'SPEED',
	VOCLevel = 'VOCLVL',
	WaterFlow = 'WATERF',
	WaterPressure = 'WATERP',
	WaterTemperature = 'WATERT',
	WaterVolume = 'WVOL',
	Weight = 'WEIGHT',
	WindChill = 'WINDCH',
	WindDirection = 'WINDDIR',
	BoilerWaterTemperature = 'WATERTB',
	OutsideTemperature = 'TEMPOUT'
}

type a = keyof typeof DriverType;

type EnumFromLabel<L extends keyof N, N> = N[L];

type DriverTypeFromName<N extends keyof typeof DriverType> = EnumFromLabel<N, typeof DriverType>;
type x = DriverTypeFromName<'Status' | 'SoilTemperature'>;

//export type DriverLabel<T extends DriverType> = ReturnType>LabelMap.get>

export type EnumLiteral<T> =
	T extends string ? `${T}`
	: T extends boolean ?
		T extends true ?
			true
		:	false
	:	T;

type y = EnumLiteral<DriverType.Status>;

type z = EnumLiteral<DriverType.Status | DriverType.Precipitation>;

type T = DriverTypeFromName<keyof typeof DriverType>;

//type Driver<D extends DriverType> = D extends D[0] | infer K extends DriverType ? D[0] | DriverLabels<K> : never;

type s = EnumLiteral<{ 100: true; 200: false }>;

export type DriverList<D> =
	D extends DriverType ? { [K in D]?: Driver<K, any, any> } & { add(driver: Driver<D, any, any>): void }
	: D extends EnumLiteral<infer R extends DriverType> ? { [K in R]?: Driver<R, any, any> } & { add(driver: Driver<R, any, any>): void }
	: {}; //& { [N in keyof typeof DriverType]?: Driver<DriverTypeFromName<N>> };

type KeyOrValue<K, D> =
	K extends D ? D
	: K extends keyof D ? D[K]
	: never;

const LabelMap = new Map<DriverType, keyof typeof DriverType>(Object.entries(DriverType).map(([a, b]) => [b, a]) as any);

///onst DriverNames = Object.entries(DriverType).(a)=>[a[1],a[0]]) as [DriverType,(keyof typeof DriverType)][];
type DriverListType<D extends DriverType> = Identity<DriverList<D>>;

export class Drivers<D extends DriverType> {
	// #region Properties (1)

	public DriverHandler: ProxyHandler<Drivers<D>> = {
		set(target, p: DriverType | keyof typeof DriverType, newValue, receiver) {
			if (p in target) {
				if (p in DriverType) {
					target[p] = newValue;
					target[LabelMap.get(p as DriverType)] = newValue;
					return true;
				} else if (typeof p === 'string' && p in LabelMap.values()) {
					target[DriverType[p]] = newValue;
					target[p] = newValue;
					return true;
				}
				return true;
			}
			return false;
		},
		get(target, p: DriverType | keyof typeof DriverType, receiver) {
			if (p in target) {
				return target[p];
			}
			return undefined;
		}
	};

	// #endregion Properties (1)

	// #region Constructors (1)

	constructor() {
		return new Proxy(this, this.DriverHandler);
	}

	// #endregion Constructors (1)

	// #region Public Methods (1)

	public add<K extends D>(driver: Driver<K, any, any>) {
		(this as unknown)[driver.id] = driver;
		(this as unknown)[LabelMap.get(driver.id)] = driver;
	}

	// #endregion Public Methods (1)
}

export interface Driver<
	D extends DriverType | EnumLiteral<DriverType> | `${string}.${EnumLiteral<DriverType>}` | string,
	U extends UnitOfMeasure,
	T = number,
	SU extends UnitOfMeasure = U,
	ST = number,
	N = string,
	L = string
> {
	// #region Properties (8)

	readonly value: T;

	id: D;
	label: L;
	name: N;
	query: () => Promise<DriverState>;
	serverUom?: SU;
	state: {
		initial: boolean;
		value: T;
		formattedValue?: any;
		pendingValue: T;
		rawValue?: ST;
	};
	uom: U;

	// #endregion Properties (8)

	// #region Public Methods (2)

	apply(state: DriverState, notify?: boolean): boolean;
	patch(value: T, formattedValue: string, uom: UnitOfMeasure, prec: number, notify?: boolean): boolean;

	// #endregion Public Methods (2)
	//override on('change', listener: (value: any) => void): this;
}

export interface StatelessDriver<
	D extends DriverType | EnumLiteral<DriverType> | `${string}.${EnumLiteral<DriverType>}` | string,
	U extends UnitOfMeasure,
	T = number,
	SU extends UnitOfMeasure = U,
	N = string,
	L = string
> {
	// #region Properties (9)

	readonly value: Promise<T>;

	id: D;
	label: L;
	name: N;
	query: () => Promise<DriverState>;
	serverUom?: SU;
	state: {
		initial: boolean;
		value: T;
		formattedValue?: any;
		pendingValue: T;
	};
	stateless: true;
	uom: U;

	// #endregion Properties (9)
	//override on('change', listener: (value: any) => void): this;
}

export function isStateless(x: any): x is StatelessDriver<any, any, any> {
	return x.stateless;
}

export function isTrue(x: true | false): x is true {
	return x;
}

export type DriverTypeLiteral = EnumLiteral<DriverType>;

export type EnumWithLiteral<D extends string | bigint | number | boolean> = D | EnumLiteral<D>;
export namespace Driver {
	export type Signature<U extends UnitOfMeasure = UnitOfMeasure, V = any, SU = U, N = string, L = N> = { uom: U; value: V; name: N; label: L; serverUom?: SU };

	export type Signatures<D> = UnionToIntersection<
		D extends string ? { [K in D]: Signature<UnitOfMeasure, any, UnitOfMeasure, string, string> }
		: D extends { [K in keyof D]: Signature } ? D
		: never
	>;

	///D extends (infer R extends string | infer K extends {[L in keyof K]: Signature}) ? {[J in R & string]: Signature} & K : D extends string ? { [K in D]: Signature } : D extends {[K in keyof D]: Signature} ? D : never;

	type test = Signatures<DriverType.Status | { ERR: Signature; BUSY: Signature } | { ERR: Signature; BUSY: Signature } | { ERR: Signature; BUSY: Signature }>;

	type Drivers = {
		ST?: {
			uom: UnitOfMeasure.Percent;
			value: number;
			name: 'status';
			label: 'Status';
		};
		ERR?: {
			uom: UnitOfMeasure.Index;
			value: number;
			name: 'responding';
			label: 'Responding';
		};
	};


	export type For<D extends string, T, S extends boolean = false> = T extends Signature<infer U, infer V, infer SU, infer N, infer L> ? StatelessOrStateful<D, U, V, N, L, S> : never;

	export type ForAll<T, S extends boolean = false> = {
		[K in StringKeys<T>]: T[K] extends Signature<UnitOfMeasure, any, UnitOfMeasure, string, string> ? For<K, T[K], S> : never;
	};

	type test2 = ForAll<Drivers>;

	export type Type = DriverType;
	export type Literal = EnumLiteral<DriverType>;
	export type LiteralWithExtensions = Literal | `${string}.${Literal}`;
	export type LiteralWithType = EnumWithLiteral<DriverType>;
	type StatelessOrStateful<D extends string, U extends UnitOfMeasure, T = number, N = string, L = string, S extends boolean = false> =
		S extends true ? StatelessDriver<D, U, T, U, N, L> : Driver<D, U, T, U, N, L>;

	export function create<D extends Literal, U extends UnitOfMeasure, T = number, N extends string = string, L extends string = string, S extends boolean = false>(
		driver: EnumWithLiteral<D>,

		node?: ISYNode<Family, any, any, any>,
		initState?: DriverState,
		driverSignature?: { uom: U; label: L; name: N },
		stateless?: S,
		converter?: Converter<any, T>
	): StatelessOrStateful<D, U, T, N, L, S> {
		const query = async () => {
			return await node.readProperty(driver as D);
		};

		if (isTrue(stateless)) {
			return {
				id: driver as D,
				stateless: true,
				uom: driverSignature.uom as U,
				serverUom: initState?.uom != driverSignature.uom ? initState?.uom : undefined,
				state: {
					initial: true,
					value: initState?.value, //TODO include converter
					formattedValue: initState.formatted,
					pendingValue: null
				},
				query,
				get value() {
					return query().then((p) => p.value) as Promise<T>;
				},
				name: initState.name ?? driverSignature.name ?? driverSignature.label ?? driver,
				label: driverSignature.label ?? driver
			} as unknown as StatelessOrStateful<D, U, T, N, L, typeof stateless>;
		}
		var c = {
			id: driver as D,
			uom: driverSignature?.uom as U,
			serverUom: initState?.uom != driverSignature?.uom ? initState?.uom : undefined,
			state: {
				initial: true,
				value:
					initState ?
						converter ? converter.from(initState.value)
						: driverSignature?.uom && initState?.uom != driverSignature?.uom ? Converter.convert(initState.uom, driverSignature.uom, initState.value)
					:	initState.value : null,
				rawValue: initState ? initState.value : null,
				formattedValue: initState ? initState.formatted : null,
				pendingValue: null
			},
			async query() {
				let s = await query();
				this.state.value = converter ? converter.from(s.value) : this.uom !== s.uom ? Converter.convert(s.value, s.uom, this.uom) : s.value;
				this.state.formattedValue = s.formatted;
				this.state.rawValue = s.value;
				return s;
			},
			apply(state: DriverState, notify = false) {
				let previousValue = this.state.rawValue;
				this.state.rawValue = state.value;
				if (previousValue === this.state.rawValue) {
					return false;
				}
				if (state.uom != this.uom) {
					this.serverUom == state.uom;
					this.state.value = converter ? converter.from(this.state.rawValue) : Converter.convert(state.uom, this.uom, this.state.rawValue);
				} else if (converter) {
					this.state.value = converter.from(state.value);
				} else {
					this.state.value = state.value;
				}
				this.state.formattedValue = state.formatted;
				if (notify) node.events.emit(`${this.name}Changed`, driver as D, this.state.value, previousValue, this.state.formattedValue);
				return true;
			},
			patch(value: T, formattedValue: string, uom: UnitOfMeasure, prec: number, notify = true) {
				let previousValue = this.state.rawValue;
				this.state.rawValue = value;
				this.state.formattedValue = formattedValue;
				if (uom != this.uom) {
					this.serverUom == uom;
					this.state.value = converter ? converter.from(this.state.rawValue) : Converter.convert(uom, this.uom, this.state.rawValue);
				} else if (converter) {
					this.state.value = converter.from(value);
				} else {
					this.state.value = value;
				}
				if (previousValue == this.state.value) {
					return false;
				}
				if (notify) node.events.emit(`${this.name}Changed`, driver as D, this.state.value, previousValue, formattedValue);
				return true;
			},
			get value() {
				return c.state.value;
			},
			name: initState?.name ?? driverSignature?.name ?? driver,
			label: driverSignature?.label ?? driver
		};
		//  node.on('PropertyChanged', (propertyName, newValue, oldValue, formattedValue) => {
		//     if (propertyName === driver) {
		//         c.state.initial = false;
		//         c.state.value = node.convertFrom(newValue,c.uom,driver as D);
		//         c.state.formattedValue = formattedValue;
		//     }

		//});
		return c as unknown as StatelessOrStateful<D, U, T, N, L, typeof stateless>;
	}
}

// type EnumValues2<T extends string> = T extends { [Type in keyof T]: string } ? T extenDrivers[0] |  : never;

// type EnumValues<T> = T extends { [x in keyof T]: string }
//   ? T extends string | infer K extends string
//     ? [keyof T][0] | EnumValues<K>
//     : never
//   : T;

// type Driver = EnumValues2<Drivers>
// let x : Driver = "ACvCX"
