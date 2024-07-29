import type { UnitOfMeasure } from './UOM.js';
import type { ISYNodeDevice } from '../../ISYNode.js';
import type { DriverState } from '../PropertyStatus.js';
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
    CustomControl30 = "GV30",
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
    VolatileOrganicCompoundVOCLevel = "VOCLVL",
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
export type EnumFromLabel<L extends keyof N, N> = N[L];
export type DriverTypeFromName<N extends keyof typeof DriverType> = EnumFromLabel<N, typeof DriverType>;
export type EnumLiteral<T extends string | number | bigint | boolean> = T extends string ? `${T}` : T extends boolean ? T extends true ? true : false : T;
export type DriverList<D extends DriverType | EnumLiteral<DriverType>> = (D extends DriverType ? {
    [K in D]: Driver<K>;
} & {
    add(driver: Driver<D>): void;
} : D extends EnumLiteral<infer R extends DriverType> ? {
    [K in R]: Driver<K>;
} & {
    add(driver: Driver<R>): void;
} : {}) & {
    [N in keyof typeof DriverType]?: Driver<DriverTypeFromName<N>>;
};
export declare class Drivers<D extends DriverType> {
    [x: string]: any;
    DriverHandler: ProxyHandler<Drivers<D>>;
    constructor();
    add<K extends D>(driver: Driver<K>): void;
}
export interface Driver<D extends DriverType> {
    id: D;
    stateless?: true;
    uom: UnitOfMeasure;
    state: {
        initial: boolean;
        value: any;
        formattedValue?: any;
        pendingValue: any;
    };
    value: any;
    query: () => Promise<DriverState>;
    name: string;
}
export type DriverTypeLiteral = EnumLiteral<DriverType>;
export type DriverTypeWithLiteral = DriverType | EnumLiteral<DriverType>;
export type EnumWithLiteral<D extends string | bigint | number | boolean> = D | EnumLiteral<D>;
export declare namespace Driver {
    type Type = DriverType;
    type Literal = EnumLiteral<DriverType>;
    type LiteralWithType = EnumWithLiteral<DriverType>;
    function create<D extends DriverType>(driver: EnumWithLiteral<D>, node: ISYNodeDevice<any, any, any>, initState: DriverState, stateless?: boolean): Driver<DriverType>;
}
