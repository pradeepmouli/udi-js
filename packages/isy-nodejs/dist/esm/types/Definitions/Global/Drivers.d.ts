import type { ISYNode } from '../../ISYNode.js';
import { UnitOfMeasure } from './UOM.js';
import type { UnionToIntersection } from '@project-chip/matter.js/util';
import { Converter } from '../../Converters.js';
import type { DriverState } from '../../Model/DriverState.js';
import type { StringKeys } from '../../Utils.js';
import type { Family } from './Families.js';
export declare enum DriverType {
    AccelerationXAxis = "ACCX",
    AccelerationYAxis = "ACCY",
    AccelerationZAxis = "ACCZ",
    AirFlow = "AIRFLOW",
    AirQualityIndex = "AQI",
    Alarm = "ALARM",
    AnglePosition = "ANGLPOS",
    AtmosphericPressure = "ATMPRES",
    AutoDRProcessingState = "ADRPST",
    Awake = "AWAKE",
    BarometricPressure = "BARPRES",
    BatteryLevel = "BATLVL",
    Beep = "BEEP",
    BloodPressureDiastolic = "BPDIA",
    BloodPressureSystolic = "BPSYS",
    BodyMassIndex = "BMI",
    BoneMass = "BONEM",
    Brighten = "BRT",
    CarbonMonoxideLevel = "CO",
    CO2Level = "CO2LVL",
    ControllerAction = "CTL",
    CoolSetpoint = "CLISPC",
    CurrentCurrent = "CC",
    CurrentPowerUsed = "CPW",
    CurrentTemperature = "CLITEMP",
    CurrentVoltage = "CV",
    CustomControl0 = "GV0",
    CustomControl1 = "GV1",
    CustomControl2 = "GV2",
    CustomControl3 = "GV3",
    CustomControl4 = "GV4",
    CustomControl5 = "GV5",
    CustomControl6 = "GV6",
    CustomControl7 = "GV7",
    CustomControl8 = "GV8",
    CustomControl9 = "GV9",
    CustomControl10 = "GV10",
    CustomControl11 = "GV11",
    CustomControl12 = "GV12",
    CustomControl13 = "GV13",
    CustomControl14 = "GV14",
    CustomControl15 = "GV15",
    CustomControl16 = "GV16",
    CustomControl17 = "GV17",
    CustomControl18 = "GV18",
    CustomControl19 = "GV19",
    CustomControl20 = "GV20",
    CustomControl21 = "GV21",
    CustomControl22 = "GV22",
    CustomControl23 = "GV23",
    CustomControl24 = "GV24",
    CustomControl25 = "GV25",
    CustomControl26 = "GV26",
    CustomControl27 = "GV27",
    CustomControl28 = "GV28",
    CustomControl29 = "GV29",
    CustomControl30 = "GV30",
    Delay = "DELAY",
    DewPoint = "DEWPT",
    DeviceIsBusy = "BUSY",
    DeviceSecureMode = "SECMD",
    Dim = "DIM",
    Distance = "DISTANC",
    DomesticHotWaterTemperature = "WATERTD",
    Duration = "DUR",
    ElectricalConductivity = "ELECCON",
    ElectricalResistivity = "ELECRES",
    EnergyMode = "CLIEMD",
    Error = "ERR",
    Evapotranspiration = "ETO",
    ExhaustTemperature = "TEMPEXH",
    FadeDown = "FDDOWN",
    FadeStop = "FDSTOP",
    FadeUp = "FDUP",
    FanRunningState = "CLIFRS",
    FanSetting = "CLIFS",
    FanSettingOverride = "CLIFSO",
    FastOff = "DFOF",
    FastOn = "DFON",
    FormaldehydeCH2OLevel = "CH20",
    Frequency = "FREQ",
    GeneralPurposeValue = "GPV",
    GenericVolume = "GVOL",
    Gust = "GUST",
    HeatCoolState = "CLIHCS",
    HeatIndex = "HEATIX",
    HeatSetpoint = "CLISPH",
    Hail = "HAIL",
    HeartRate = "HR",
    Humidity = "CLIHUM",
    Luminance = "LUMIN",
    MethaneDensity = "METHANE",
    Mode = "MODE",
    Moisture = "MOIST",
    MoonPhase = "MOON",
    MuscleMass = "MUSCLEM",
    Off = "DOF",
    Off3KeyPresses = "DOF3",
    Off4KeyPresses = "DOF4",
    Off5KeyPresses = "DOF5",
    On = "DON",
    On3KeyPresses = "DON3",
    On4KeyPresses = "DON4",
    On5KeyPresses = "DON5",
    OnLevel = "OL",
    Ozone = "OZONE",
    ParticulateMatter10 = "PM10",
    ParticulateMatter25 = "PM25",
    PercentChanceOfPrecipitation = "POP",
    PolarizedPowerUsed = "PPW",
    PowerFactor = "PF",
    Precipitation = "PRECIP",
    PulseCount = "PULSCNT",
    QueryDevice = "QUERY",
    RadonConcentration = "RADON",
    RainRate = "RAINRT",
    RampRate = "RR",
    RelativeModulationLevel = "RELMOD",
    ResetValues = "RESET",
    RespiratoryRate = "RESPR",
    RFSignalStrength = "RFSS",
    Rotation = "ROTATE",
    ScheduleMode = "CLISMD",
    SeismicIntensity = "SEISINT",
    SeismicMagnitude = "SEISMAG",
    SmokeDensity = "SMOKED",
    SoilHumidity = "SOILH",
    SoilReactivity = "SOILR",
    SoilSalinity = "SOILS",
    SoilTemperature = "SOILT",
    SolarRadiation = "SOLRAD",
    SoundVolume = "SVOL",
    Speed = "SPEED",
    Status = "ST",
    TankCapacity = "TANKCAP",
    TheUserAccessCodeThatAssociatedWithTheMostRecentAlarm = "USRNUM",
    ThermostatMode = "CLIMD",
    TideLevel = "TIDELVL",
    Time = "TIME",
    TimeRemaining = "TIMEREM",
    TotalBodyWater = "TBW",
    TotalPowerUsed = "TPW",
    Ultraviolet = "UV",
    ValidUserAccessCodeEntered = "UAC",
    Velocity = "SPEED",
    VOCLevel = "VOCLVL",
    WaterFlow = "WATERF",
    WaterPressure = "WATERP",
    WaterTemperature = "WATERT",
    WaterVolume = "WVOL",
    Weight = "WEIGHT",
    WindChill = "WINDCH",
    WindDirection = "WINDDIR",
    BoilerWaterTemperature = "WATERTB",
    OutsideTemperature = "TEMPOUT"
}
export type EnumLiteral<T> = T extends string ? `${T}` : T extends boolean ? T extends true ? true : false : T;
export type DriverList<D> = D extends DriverType ? {
    [K in D]?: Driver<K, any, any>;
} & {
    add(driver: Driver<D, any, any>): void;
} : D extends EnumLiteral<infer R extends DriverType> ? {
    [K in R]?: Driver<R, any, any>;
} & {
    add(driver: Driver<R, any, any>): void;
} : {};
export declare class Drivers<D extends DriverType> {
    DriverHandler: ProxyHandler<Drivers<D>>;
    constructor();
    add<K extends D>(driver: Driver<K, any, any>): void;
}
export interface Driver<D extends DriverType | EnumLiteral<DriverType> | `${string}.${EnumLiteral<DriverType>}` | string, U extends UnitOfMeasure, T = number, SU extends UnitOfMeasure = U, ST = number, N = string, L = string> {
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
    };
    uom: U;
    apply(state: DriverState, notify?: boolean): boolean;
    patch(value: T, formattedValue: string, uom: UnitOfMeasure, prec: number, notify?: boolean): boolean;
}
export interface StatelessDriver<D extends DriverType | EnumLiteral<DriverType> | `${string}.${EnumLiteral<DriverType>}` | string, U extends UnitOfMeasure, T = number, SU extends UnitOfMeasure = U, N = string, L = string> {
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
}
export declare function isStateless(x: any): x is StatelessDriver<any, any, any>;
export declare function isTrue(x: true | false): x is true;
export type DriverTypeLiteral = EnumLiteral<DriverType>;
export type EnumWithLiteral<D extends string | bigint | number | boolean> = D | EnumLiteral<D>;
export declare namespace Driver {
    export type Signature<U extends UnitOfMeasure = UnitOfMeasure, V = any, SU = U, N = string, L = N> = {
        uom: U;
        value: V;
        name: N;
        label: L;
        serverUom?: SU;
    };
    export type Signatures<D> = UnionToIntersection<D extends string ? {
        [K in D]: Signature<UnitOfMeasure, any, UnitOfMeasure, string, string>;
    } : D extends {
        [K in keyof D]: Signature;
    } ? D : never>;
    export type For<D extends string, T, S extends boolean = false> = T extends Signature<infer U, infer V, infer SU, infer N, infer L> ? StatelessOrStateful<D, U, V, N, L, S> : never;
    export type ForAll<T, S extends boolean = false> = {
        [K in StringKeys<T>]: T[K] extends Signature<UnitOfMeasure, any, UnitOfMeasure, string, string> ? For<K, T[K], S> : never;
    };
    export type Type = DriverType;
    export type Literal = EnumLiteral<DriverType>;
    export type LiteralWithExtensions = Literal | `${string}.${Literal}`;
    export type LiteralWithType = EnumWithLiteral<DriverType>;
    type StatelessOrStateful<D extends string, U extends UnitOfMeasure, T = number, N = string, L = string, S extends boolean = false> = S extends true ? StatelessDriver<D, U, T, U, N, L> : Driver<D, U, T, U, N, L>;
    export function create<D extends Literal, U extends UnitOfMeasure, T = number, N extends string = string, L extends string = string, S extends boolean = false>(driver: EnumWithLiteral<D>, node?: ISYNode<Family, any, any, any>, initState?: DriverState, driverSignature?: {
        uom: U;
        label: L;
        name: N;
    }, stateless?: S, converter?: Converter<any, T>): StatelessOrStateful<D, U, T, N, L, S>;
    export {};
}
//# sourceMappingURL=Drivers.d.ts.map