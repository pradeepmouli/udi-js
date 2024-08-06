import { Converters } from "../../Converters.js";
export var UnitOfMeasure;
(function (UnitOfMeasure) {
    UnitOfMeasure[UnitOfMeasure["Unknown"] = 0] = "Unknown";
    UnitOfMeasure[UnitOfMeasure["Ampere"] = 1] = "Ampere";
    UnitOfMeasure[UnitOfMeasure["Boolean"] = 2] = "Boolean";
    UnitOfMeasure[UnitOfMeasure["BtuPerHour"] = 3] = "BtuPerHour";
    UnitOfMeasure[UnitOfMeasure["Celsius"] = 4] = "Celsius";
    UnitOfMeasure[UnitOfMeasure["Centimeter"] = 5] = "Centimeter";
    UnitOfMeasure[UnitOfMeasure["CubicFeet"] = 6] = "CubicFeet";
    UnitOfMeasure[UnitOfMeasure["CubicFeetPerMinute"] = 7] = "CubicFeetPerMinute";
    UnitOfMeasure[UnitOfMeasure["CubicMeter"] = 8] = "CubicMeter";
    UnitOfMeasure[UnitOfMeasure["Day"] = 9] = "Day";
    UnitOfMeasure[UnitOfMeasure["Days"] = 10] = "Days";
    UnitOfMeasure[UnitOfMeasure["DeadboltStatus"] = 11] = "DeadboltStatus";
    UnitOfMeasure[UnitOfMeasure["Decibel"] = 12] = "Decibel";
    UnitOfMeasure[UnitOfMeasure["DecibelA"] = 13] = "DecibelA";
    UnitOfMeasure[UnitOfMeasure["Degree"] = 14] = "Degree";
    UnitOfMeasure[UnitOfMeasure["DoorLockAlarm"] = 15] = "DoorLockAlarm";
    UnitOfMeasure[UnitOfMeasure["EuropeanMacroseismic"] = 16] = "EuropeanMacroseismic";
    UnitOfMeasure[UnitOfMeasure["Fahrenheit"] = 17] = "Fahrenheit";
    UnitOfMeasure[UnitOfMeasure["Feet"] = 18] = "Feet";
    UnitOfMeasure[UnitOfMeasure["Hour"] = 19] = "Hour";
    UnitOfMeasure[UnitOfMeasure["Hours"] = 20] = "Hours";
    UnitOfMeasure[UnitOfMeasure["AbsoluteHumidity"] = 21] = "AbsoluteHumidity";
    UnitOfMeasure[UnitOfMeasure["RelativeHumidity"] = 22] = "RelativeHumidity";
    UnitOfMeasure[UnitOfMeasure["InchesOfMercury"] = 23] = "InchesOfMercury";
    UnitOfMeasure[UnitOfMeasure["InchesPerHour"] = 24] = "InchesPerHour";
    UnitOfMeasure[UnitOfMeasure["Index"] = 25] = "Index";
    UnitOfMeasure[UnitOfMeasure["Kelvin"] = 26] = "Kelvin";
    UnitOfMeasure[UnitOfMeasure["Keyword"] = 27] = "Keyword";
    UnitOfMeasure[UnitOfMeasure["Kilogram"] = 28] = "Kilogram";
    UnitOfMeasure[UnitOfMeasure["Kilovolt"] = 29] = "Kilovolt";
    UnitOfMeasure[UnitOfMeasure["Kilowatt"] = 30] = "Kilowatt";
    UnitOfMeasure[UnitOfMeasure["Kilopascal"] = 31] = "Kilopascal";
    UnitOfMeasure[UnitOfMeasure["KilometersPerHour"] = 32] = "KilometersPerHour";
    UnitOfMeasure[UnitOfMeasure["KilowattsPerHour"] = 33] = "KilowattsPerHour";
    UnitOfMeasure[UnitOfMeasure["Liedu"] = 34] = "Liedu";
    UnitOfMeasure[UnitOfMeasure["Liter"] = 35] = "Liter";
    UnitOfMeasure[UnitOfMeasure["Lux"] = 36] = "Lux";
    UnitOfMeasure[UnitOfMeasure["Mercalli"] = 37] = "Mercalli";
    UnitOfMeasure[UnitOfMeasure["Meter"] = 38] = "Meter";
    UnitOfMeasure[UnitOfMeasure["CubicMetersPerHour"] = 39] = "CubicMetersPerHour";
    UnitOfMeasure[UnitOfMeasure["MPS"] = 40] = "MPS";
    UnitOfMeasure[UnitOfMeasure["Milliamp"] = 41] = "Milliamp";
    UnitOfMeasure[UnitOfMeasure["Millisecond"] = 42] = "Millisecond";
    UnitOfMeasure[UnitOfMeasure["Millivolt"] = 43] = "Millivolt";
    UnitOfMeasure[UnitOfMeasure["Minute"] = 44] = "Minute";
    UnitOfMeasure[UnitOfMeasure["DurationInMinutes"] = 45] = "DurationInMinutes";
    UnitOfMeasure[UnitOfMeasure["MillimetersPerHour"] = 46] = "MillimetersPerHour";
    UnitOfMeasure[UnitOfMeasure["Month"] = 47] = "Month";
    UnitOfMeasure[UnitOfMeasure["MilesPerHour"] = 48] = "MilesPerHour";
    UnitOfMeasure[UnitOfMeasure["MetersPerSecond"] = 49] = "MetersPerSecond";
    UnitOfMeasure[UnitOfMeasure["Ohm"] = 50] = "Ohm";
    UnitOfMeasure[UnitOfMeasure["Percent"] = 51] = "Percent";
    UnitOfMeasure[UnitOfMeasure["Pound"] = 52] = "Pound";
    UnitOfMeasure[UnitOfMeasure["PowerFactor"] = 53] = "PowerFactor";
    UnitOfMeasure[UnitOfMeasure["PartsPerMillion"] = 54] = "PartsPerMillion";
    UnitOfMeasure[UnitOfMeasure["PulseCount"] = 55] = "PulseCount";
    UnitOfMeasure[UnitOfMeasure["RawValue"] = 56] = "RawValue";
    UnitOfMeasure[UnitOfMeasure["Second"] = 57] = "Second";
    UnitOfMeasure[UnitOfMeasure["DurationInSeconds"] = 58] = "DurationInSeconds";
    UnitOfMeasure[UnitOfMeasure["SiemensPerMeter"] = 59] = "SiemensPerMeter";
    UnitOfMeasure[UnitOfMeasure["BodyWaveMagnitudeScale"] = 60] = "BodyWaveMagnitudeScale";
    UnitOfMeasure[UnitOfMeasure["RichterScale"] = 61] = "RichterScale";
    UnitOfMeasure[UnitOfMeasure["MomentMagnitudeScale"] = 62] = "MomentMagnitudeScale";
    UnitOfMeasure[UnitOfMeasure["SurfaceWaveMagnitudeScale"] = 63] = "SurfaceWaveMagnitudeScale";
    UnitOfMeasure[UnitOfMeasure["Shindo"] = 64] = "Shindo";
    UnitOfMeasure[UnitOfMeasure["SML"] = 65] = "SML";
    UnitOfMeasure[UnitOfMeasure["ThermostatHeatCoolState"] = 66] = "ThermostatHeatCoolState";
    UnitOfMeasure[UnitOfMeasure["ThermostatMode"] = 67] = "ThermostatMode";
    UnitOfMeasure[UnitOfMeasure["ThermostatFanMode"] = 68] = "ThermostatFanMode";
    UnitOfMeasure[UnitOfMeasure["USGallon"] = 69] = "USGallon";
    UnitOfMeasure[UnitOfMeasure["UserNumber"] = 70] = "UserNumber";
    UnitOfMeasure[UnitOfMeasure["UVIndex"] = 71] = "UVIndex";
    UnitOfMeasure[UnitOfMeasure["Volt"] = 72] = "Volt";
    UnitOfMeasure[UnitOfMeasure["Watt"] = 73] = "Watt";
    UnitOfMeasure[UnitOfMeasure["WattsPerSquareMeter"] = 74] = "WattsPerSquareMeter";
    UnitOfMeasure[UnitOfMeasure["Weekday"] = 75] = "Weekday";
    UnitOfMeasure[UnitOfMeasure["WindDirectionInDegrees"] = 76] = "WindDirectionInDegrees";
    UnitOfMeasure[UnitOfMeasure["Year"] = 77] = "Year";
    UnitOfMeasure[UnitOfMeasure["OffOn"] = 78] = "OffOn";
    UnitOfMeasure[UnitOfMeasure["OpenClose"] = 79] = "OpenClose";
    UnitOfMeasure[UnitOfMeasure["ThermostatFanRunState"] = 80] = "ThermostatFanRunState";
    UnitOfMeasure[UnitOfMeasure["ThermostatFanModeOverride"] = 81] = "ThermostatFanModeOverride";
    UnitOfMeasure[UnitOfMeasure["Millimeter"] = 82] = "Millimeter";
    UnitOfMeasure[UnitOfMeasure["Kilometer"] = 83] = "Kilometer";
    UnitOfMeasure[UnitOfMeasure["SecureMode"] = 84] = "SecureMode";
    UnitOfMeasure[UnitOfMeasure["OhmMeter"] = 85] = "OhmMeter";
    UnitOfMeasure[UnitOfMeasure["KiloOhm"] = 86] = "KiloOhm";
    UnitOfMeasure[UnitOfMeasure["CubicMeterPerCubicMeter"] = 87] = "CubicMeterPerCubicMeter";
    UnitOfMeasure[UnitOfMeasure["WaterActivity"] = 88] = "WaterActivity";
    UnitOfMeasure[UnitOfMeasure["RotationsPerMinute"] = 89] = "RotationsPerMinute";
    UnitOfMeasure[UnitOfMeasure["Hertz"] = 90] = "Hertz";
    UnitOfMeasure[UnitOfMeasure["AnglePositionDegreesNorthPole"] = 91] = "AnglePositionDegreesNorthPole";
    UnitOfMeasure[UnitOfMeasure["AnglePositionDegreesSouthPole"] = 92] = "AnglePositionDegreesSouthPole";
    UnitOfMeasure[UnitOfMeasure["PowerManagementAlarm"] = 93] = "PowerManagementAlarm";
    UnitOfMeasure[UnitOfMeasure["ApplianceAlarm"] = 94] = "ApplianceAlarm";
    UnitOfMeasure[UnitOfMeasure["HomeHealthAlarm"] = 95] = "HomeHealthAlarm";
    UnitOfMeasure[UnitOfMeasure["VOCLevel"] = 96] = "VOCLevel";
    UnitOfMeasure[UnitOfMeasure["BarrierStatus"] = 97] = "BarrierStatus";
    UnitOfMeasure[UnitOfMeasure["InsteonThermostatMode"] = 98] = "InsteonThermostatMode";
    UnitOfMeasure[UnitOfMeasure["InsteonThermostatFanMode"] = 99] = "InsteonThermostatFanMode";
    UnitOfMeasure[UnitOfMeasure["LevelFrom0To255"] = 100] = "LevelFrom0To255";
    UnitOfMeasure[UnitOfMeasure["DegreeX2"] = 101] = "DegreeX2";
    UnitOfMeasure[UnitOfMeasure["KilowattSecond"] = 102] = "KilowattSecond";
    UnitOfMeasure[UnitOfMeasure["Dollar"] = 103] = "Dollar";
    UnitOfMeasure[UnitOfMeasure["Cent"] = 104] = "Cent";
    UnitOfMeasure[UnitOfMeasure["Inch"] = 105] = "Inch";
    UnitOfMeasure[UnitOfMeasure["MillimetersPerDay"] = 106] = "MillimetersPerDay";
})(UnitOfMeasure || (UnitOfMeasure = {}));
export function toString() {
    return UnitOfMeasure[this];
}
(function (UnitOfMeasure) {
    function convertTo(targetUOM, value) {
        const converter = Converters.Standard[this.toString()]?.[targetUOM];
        if (converter) {
            return converter.to(value);
        }
        return value;
    }
    UnitOfMeasure.convertTo = convertTo;
    function convertFrom(sourceUOM, value) {
        const converter = Converters.Standard[this.toString()]?.[sourceUOM];
        if (converter) {
            return converter.from(value);
        }
        return value;
    }
    UnitOfMeasure.convertFrom = convertFrom;
})(UnitOfMeasure || (UnitOfMeasure = {}));
//# sourceMappingURL=UOM.js.map