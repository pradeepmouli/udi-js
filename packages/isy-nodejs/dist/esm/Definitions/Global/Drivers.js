import { Converter } from '../../Converters.js';
export var DriverType;
(function (DriverType) {
    DriverType["AccelerationXAxis"] = "ACCX";
    DriverType["AccelerationYAxis"] = "ACCY";
    DriverType["AccelerationZAxis"] = "ACCZ";
    DriverType["AirFlow"] = "AIRFLOW";
    DriverType["AirQualityIndex"] = "AQI";
    DriverType["Alarm"] = "ALARM";
    DriverType["AnglePosition"] = "ANGLPOS";
    DriverType["AtmosphericPressure"] = "ATMPRES";
    DriverType["AutoDRProcessingState"] = "ADRPST";
    DriverType["Awake"] = "AWAKE";
    DriverType["BarometricPressure"] = "BARPRES";
    DriverType["BatteryLevel"] = "BATLVL";
    DriverType["Beep"] = "BEEP";
    DriverType["BloodPressureDiastolic"] = "BPDIA";
    DriverType["BloodPressureSystolic"] = "BPSYS";
    DriverType["BodyMassIndex"] = "BMI";
    DriverType["BoneMass"] = "BONEM";
    DriverType["Brighten"] = "BRT";
    DriverType["CarbonMonoxideLevel"] = "CO";
    DriverType["CO2Level"] = "CO2LVL";
    DriverType["ControllerAction"] = "CTL";
    DriverType["CoolSetpoint"] = "CLISPC";
    DriverType["CurrentCurrent"] = "CC";
    DriverType["CurrentPowerUsed"] = "CPW";
    DriverType["CurrentTemperature"] = "CLITEMP";
    DriverType["CurrentVoltage"] = "CV";
    DriverType["CustomControl0"] = "GV0";
    DriverType["CustomControl1"] = "GV1";
    DriverType["CustomControl2"] = "GV2";
    DriverType["CustomControl3"] = "GV3";
    DriverType["CustomControl4"] = "GV4";
    DriverType["CustomControl5"] = "GV5";
    DriverType["CustomControl6"] = "GV6";
    DriverType["CustomControl7"] = "GV7";
    DriverType["CustomControl8"] = "GV8";
    DriverType["CustomControl9"] = "GV9";
    DriverType["CustomControl10"] = "GV10";
    DriverType["CustomControl11"] = "GV11";
    DriverType["CustomControl12"] = "GV12";
    DriverType["CustomControl13"] = "GV13";
    DriverType["CustomControl14"] = "GV14";
    DriverType["CustomControl15"] = "GV15";
    DriverType["CustomControl16"] = "GV16";
    DriverType["CustomControl17"] = "GV17";
    DriverType["CustomControl18"] = "GV18";
    DriverType["CustomControl19"] = "GV19";
    DriverType["CustomControl20"] = "GV20";
    DriverType["CustomControl21"] = "GV21";
    DriverType["CustomControl22"] = "GV22";
    DriverType["CustomControl23"] = "GV23";
    DriverType["CustomControl24"] = "GV24";
    DriverType["CustomControl25"] = "GV25";
    DriverType["CustomControl26"] = "GV26";
    DriverType["CustomControl27"] = "GV27";
    DriverType["CustomControl28"] = "GV28";
    DriverType["CustomControl29"] = "GV29";
    DriverType["CustomControl30"] = "GV30";
    DriverType["Delay"] = "DELAY";
    DriverType["DewPoint"] = "DEWPT";
    DriverType["DeviceIsBusy"] = "BUSY";
    DriverType["DeviceSecureMode"] = "SECMD";
    DriverType["Dim"] = "DIM";
    DriverType["Distance"] = "DISTANC";
    DriverType["DomesticHotWaterTemperature"] = "WATERTD";
    DriverType["Duration"] = "DUR";
    DriverType["ElectricalConductivity"] = "ELECCON";
    DriverType["ElectricalResistivity"] = "ELECRES";
    DriverType["EnergyMode"] = "CLIEMD";
    DriverType["Error"] = "ERR";
    DriverType["Evapotranspiration"] = "ETO";
    DriverType["ExhaustTemperature"] = "TEMPEXH";
    DriverType["FadeDown"] = "FDDOWN";
    DriverType["FadeStop"] = "FDSTOP";
    DriverType["FadeUp"] = "FDUP";
    DriverType["FanRunningState"] = "CLIFRS";
    DriverType["FanSetting"] = "CLIFS";
    DriverType["FanSettingOverride"] = "CLIFSO";
    DriverType["FastOff"] = "DFOF";
    DriverType["FastOn"] = "DFON";
    DriverType["FormaldehydeCH2OLevel"] = "CH20";
    DriverType["Frequency"] = "FREQ";
    DriverType["GeneralPurposeValue"] = "GPV";
    DriverType["GenericVolume"] = "GVOL";
    DriverType["Gust"] = "GUST";
    DriverType["HeatCoolState"] = "CLIHCS";
    DriverType["HeatIndex"] = "HEATIX";
    DriverType["HeatSetpoint"] = "CLISPH";
    DriverType["Hail"] = "HAIL";
    DriverType["HeartRate"] = "HR";
    DriverType["Humidity"] = "CLIHUM";
    DriverType["Luminance"] = "LUMIN";
    DriverType["MethaneDensity"] = "METHANE";
    DriverType["Mode"] = "MODE";
    DriverType["Moisture"] = "MOIST";
    DriverType["MoonPhase"] = "MOON";
    DriverType["MuscleMass"] = "MUSCLEM";
    DriverType["Off"] = "DOF";
    DriverType["Off3KeyPresses"] = "DOF3";
    DriverType["Off4KeyPresses"] = "DOF4";
    DriverType["Off5KeyPresses"] = "DOF5";
    DriverType["On"] = "DON";
    DriverType["On3KeyPresses"] = "DON3";
    DriverType["On4KeyPresses"] = "DON4";
    DriverType["On5KeyPresses"] = "DON5";
    DriverType["OnLevel"] = "OL";
    DriverType["Ozone"] = "OZONE";
    DriverType["ParticulateMatter10"] = "PM10";
    DriverType["ParticulateMatter25"] = "PM25";
    DriverType["PercentChanceOfPrecipitation"] = "POP";
    DriverType["PolarizedPowerUsed"] = "PPW";
    DriverType["PowerFactor"] = "PF";
    DriverType["Precipitation"] = "PRECIP";
    DriverType["PulseCount"] = "PULSCNT";
    DriverType["QueryDevice"] = "QUERY";
    DriverType["RadonConcentration"] = "RADON";
    DriverType["RainRate"] = "RAINRT";
    DriverType["RampRate"] = "RR";
    DriverType["RelativeModulationLevel"] = "RELMOD";
    DriverType["ResetValues"] = "RESET";
    DriverType["RespiratoryRate"] = "RESPR";
    DriverType["RFSignalStrength"] = "RFSS";
    DriverType["Rotation"] = "ROTATE";
    DriverType["ScheduleMode"] = "CLISMD";
    DriverType["SeismicIntensity"] = "SEISINT";
    DriverType["SeismicMagnitude"] = "SEISMAG";
    DriverType["SmokeDensity"] = "SMOKED";
    DriverType["SoilHumidity"] = "SOILH";
    DriverType["SoilReactivity"] = "SOILR";
    DriverType["SoilSalinity"] = "SOILS";
    DriverType["SoilTemperature"] = "SOILT";
    DriverType["SolarRadiation"] = "SOLRAD";
    DriverType["SoundVolume"] = "SVOL";
    DriverType["Speed"] = "SPEED";
    DriverType["Status"] = "ST";
    DriverType["TankCapacity"] = "TANKCAP";
    DriverType["TheUserAccessCodeThatAssociatedWithTheMostRecentAlarm"] = "USRNUM";
    DriverType["ThermostatMode"] = "CLIMD";
    DriverType["TideLevel"] = "TIDELVL";
    DriverType["Time"] = "TIME";
    DriverType["TimeRemaining"] = "TIMEREM";
    DriverType["TotalBodyWater"] = "TBW";
    DriverType["TotalPowerUsed"] = "TPW";
    DriverType["Ultraviolet"] = "UV";
    DriverType["ValidUserAccessCodeEntered"] = "UAC";
    DriverType["Velocity"] = "SPEED";
    DriverType["VOCLevel"] = "VOCLVL";
    DriverType["WaterFlow"] = "WATERF";
    DriverType["WaterPressure"] = "WATERP";
    DriverType["WaterTemperature"] = "WATERT";
    DriverType["WaterVolume"] = "WVOL";
    DriverType["Weight"] = "WEIGHT";
    DriverType["WindChill"] = "WINDCH";
    DriverType["WindDirection"] = "WINDDIR";
    DriverType["BoilerWaterTemperature"] = "WATERTB";
    DriverType["OutsideTemperature"] = "TEMPOUT";
})(DriverType || (DriverType = {}));
const LabelMap = new Map(Object.entries(DriverType).map(([a, b]) => [b, a]));
export class Drivers {
    // #region Properties (1)
    DriverHandler = {
        set(target, p, newValue, receiver) {
            if (p in target) {
                if (p in DriverType) {
                    target[p] = newValue;
                    target[LabelMap.get(p)] = newValue;
                    return true;
                }
                else if (typeof p === 'string' && p in LabelMap.values()) {
                    target[DriverType[p]] = newValue;
                    target[p] = newValue;
                    return true;
                }
                return true;
            }
            return false;
        },
        get(target, p, receiver) {
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
    add(driver) {
        this[driver.id] = driver;
        this[LabelMap.get(driver.id)] = driver;
    }
}
export function isStateless(x) {
    return x.stateless;
}
export function isTrue(x) {
    return x;
}
export var Driver;
(function (Driver) {
    function create(driver, node, initState, driverSignature, stateless, converter) {
        const query = async () => {
            return await node.readProperty(driver);
        };
        if (isTrue(stateless)) {
            return {
                id: driver,
                stateless: true,
                uom: driverSignature.uom,
                serverUom: initState?.uom != driverSignature.uom ? initState?.uom : undefined,
                state: {
                    initial: true,
                    value: initState?.value, //TODO include converter
                    formattedValue: initState?.formatted,
                    pendingValue: null
                },
                query,
                get value() {
                    return query().then((p) => p.value);
                },
                name: initState?.name ?? driverSignature.name ?? driverSignature.label ?? driver,
                label: driverSignature.label ?? driver
            };
        }
        var c = {
            id: driver,
            initialized: initState ? true : false,
            uom: driverSignature?.uom,
            serverUom: initState?.uom != driverSignature?.uom ? initState?.uom : undefined,
            state: {
                initial: true,
                value: initState ?
                    converter ? converter.from(initState.value)
                        : driverSignature?.uom && initState?.uom != driverSignature?.uom ? Converter.convert(initState.uom, driverSignature.uom, initState.value)
                            : initState.value
                    : null,
                rawValue: initState ? initState.value : null,
                formattedValue: initState ? initState.formatted : null,
                pendingValue: null
            },
            async query() {
                let s = await query();
                this.state.value =
                    converter ? converter.from(s.value)
                        : this.uom !== s.uom ? Converter.convert(s.value, s.uom, this.uom)
                            : s.value;
                this.state.formattedValue = s.formatted;
                this.state.rawValue = s.value;
                return s;
            },
            apply(state, notify = true) {
                if (state.id == this.id) {
                    let previousValue = this.state.rawValue;
                    this.state.rawValue = state.value;
                    if (previousValue === this.state.rawValue) {
                        return false;
                    }
                    if (state.uom != this.uom) {
                        this.serverUom == state.uom;
                        this.state.value = converter ? converter.from(this.state.rawValue) : Converter.convert(state.uom, this.uom, this.state.rawValue);
                    }
                    else if (converter) {
                        this.state.value = converter.from(state.value);
                    }
                    else {
                        this.state.value = state.value;
                    }
                    this.state.formattedValue = state.formatted;
                    if (notify)
                        node.events.emit(`${this.name}Changed`, driver, this.state.value, previousValue, this.state.formattedValue);
                    if (!this.initialized) {
                        this.initialized = true;
                    }
                    return true;
                }
            },
            patch(value, formattedValue, uom, prec, notify = true) {
                let previousValue = this.state.rawValue;
                this.state.rawValue = value;
                this.state.formattedValue = formattedValue;
                if (uom != this.uom) {
                    this.serverUom == uom;
                    this.state.value = converter ? converter.from(this.state.rawValue) : Converter.convert(uom, this.uom, this.state.rawValue);
                }
                else if (converter) {
                    this.state.value = converter.from(value);
                }
                else {
                    this.state.value = value;
                }
                if (previousValue == this.state.value) {
                    return false;
                }
                if (notify)
                    node.events.emit(`${this.name}Changed`, driver, this.state.value, previousValue, formattedValue);
                if (!this.initialized) {
                    this.initialized = true;
                }
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
        return c;
    }
    Driver.create = create;
})(Driver || (Driver = {}));
// type EnumValues2<T extends string> = T extends { [Type in keyof T]: string } ? T extenDrivers[0] |  : never;
// type EnumValues<T> = T extends { [x in keyof T]: string }
//   ? T extends string | infer K extends string
//     ? [keyof T][0] | EnumValues<K>
//     : never
//   : T;
// type Driver = EnumValues2<Drivers>
// let x : Driver = "ACvCX"
//# sourceMappingURL=Drivers.js.map