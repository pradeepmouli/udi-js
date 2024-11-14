import { Family } from '../Definitions/Global/Families.js';
import { UnitOfMeasure } from '../Definitions/Global/UOM.js';
export declare class EnumDefinition<T extends Family> {
    readonly family: T;
    readonly id: string;
    name: string;
    values: {
        [y: string]: number;
    };
    usages: Set<`${string}:Unknown` | `${string}:Boolean` | `${string}:LevelFrom0To255` | `${string}:Ampere` | `${string}:BtuPerHour` | `${string}:Celsius` | `${string}:Centimeter` | `${string}:CubicFeet` | `${string}:CubicFeetPerMinute` | `${string}:CubicMeter` | `${string}:Day` | `${string}:Days` | `${string}:DeadboltStatus` | `${string}:Decibel` | `${string}:DecibelA` | `${string}:Degree` | `${string}:DoorLockAlarm` | `${string}:EuropeanMacroseismic` | `${string}:Fahrenheit` | `${string}:Feet` | `${string}:Hour` | `${string}:Hours` | `${string}:AbsoluteHumidity` | `${string}:RelativeHumidity` | `${string}:InchesOfMercury` | `${string}:InchesPerHour` | `${string}:Index` | `${string}:Kelvin` | `${string}:Keyword` | `${string}:Kilogram` | `${string}:Kilovolt` | `${string}:Kilowatt` | `${string}:Kilopascal` | `${string}:KilometersPerHour` | `${string}:KilowattsPerHour` | `${string}:Liedu` | `${string}:Liter` | `${string}:Lux` | `${string}:Mercalli` | `${string}:Meter` | `${string}:CubicMetersPerHour` | `${string}:MPS` | `${string}:Milliamp` | `${string}:Millisecond` | `${string}:Millivolt` | `${string}:Minute` | `${string}:DurationInMinutes` | `${string}:MillimetersPerHour` | `${string}:Month` | `${string}:MilesPerHour` | `${string}:MetersPerSecond` | `${string}:Ohm` | `${string}:Percent` | `${string}:Pound` | `${string}:PowerFactor` | `${string}:PartsPerMillion` | `${string}:PulseCount` | `${string}:RawValue` | `${string}:Second` | `${string}:DurationInSeconds` | `${string}:SiemensPerMeter` | `${string}:BodyWaveMagnitudeScale` | `${string}:RichterScale` | `${string}:MomentMagnitudeScale` | `${string}:SurfaceWaveMagnitudeScale` | `${string}:Shindo` | `${string}:SML` | `${string}:ThermostatHeatCoolState` | `${string}:ThermostatMode` | `${string}:ThermostatFanMode` | `${string}:USGallon` | `${string}:UserNumber` | `${string}:UVIndex` | `${string}:Volt` | `${string}:Watt` | `${string}:WattsPerSquareMeter` | `${string}:Weekday` | `${string}:WindDirectionInDegrees` | `${string}:Year` | `${string}:OffOn` | `${string}:OpenClose` | `${string}:ThermostatFanRunState` | `${string}:ThermostatFanModeOverride` | `${string}:Millimeter` | `${string}:Kilometer` | `${string}:SecureMode` | `${string}:OhmMeter` | `${string}:KiloOhm` | `${string}:CubicMeterPerCubicMeter` | `${string}:WaterActivity` | `${string}:RotationsPerMinute` | `${string}:Hertz` | `${string}:AnglePositionDegreesNorthPole` | `${string}:AnglePositionDegreesSouthPole` | `${string}:PowerManagementAlarm` | `${string}:ApplianceAlarm` | `${string}:HomeHealthAlarm` | `${string}:VOCLevel` | `${string}:BarrierStatus` | `${string}:InsteonThermostatMode` | `${string}:InsteonThermostatFanMode` | `${string}:DegreeX2` | `${string}:KilowattSecond` | `${string}:Dollar` | `${string}:Cent` | `${string}:Inch` | `${string}:MillimetersPerDay` | `${string}:Raw1ByteUnsignedValue` | `${string}:Raw2ByteUnsignedValue` | `${string}:Raw3ByteUnsignedValue` | `${string}:Raw4ByteUnsignedValue` | `${string}:Raw1ByteSignedValue` | `${string}:Raw2ByteSignedValue` | `${string}:Raw3ByteSignedValue` | `${string}:Raw4ByteSignedValue` | `${string}:MostRecentOnStyleActionTakenForLampControl` | `${string}:Mile` | `${string}:Millibar` | `${string}:Hectopascal` | `${string}:WattHour` | `${string}:InchesPerDay` | `${string}:MolePerCubicMeter` | `${string}:MicrogramPerCubicMeter` | `${string}:BecquerelPerCubicMeter` | `${string}:PicocuriesPerLiter` | `${string}:Acidity` | `${string}:BeatsPerMinute` | `${string}:MillimetersOfMercury` | `${string}:Joule` | `${string}:BodyMassIndex` | `${string}:LitersPerHour` | `${string}:DecibelMilliwatts` | `${string}:BreathsPerMinute` | `${string}:Kilohertz` | `${string}:MetersPerSquaredSeconds` | `${string}:ApparentPower` | `${string}:ReactivePower` | `${string}:NTPDateTime` | `${string}:PoundPerSquareInch` | `${string}:Degrees0To360` | `${string}:MilligramPerLiter` | `${string}:Newton` | `${string}:USGallonsPerSecond` | `${string}:USGallonsPerMinute` | `${string}:USGallonsPerHour` | `${string}:Text` | `${string}:ReservedForSystemEditors1` | `${string}:XML` | `${string}:ReservedForSystemEditors2` | `${string}:DegreeOfHue0To360` | `${string}:URLForStreaming` | `${string}:UnixTimestamp`>;
    repType: {
        type: 'enum';
    } | {
        type: 'boolean';
        trueValue: number;
        falseValue: number;
        nullValue?: boolean;
    } | {
        type: 'const';
        value: 'number' | 'bigint';
    };
    constructor(family: T, indexDef: {
        id: string;
        values: {
            [y: number]: string;
        };
    });
}
export declare namespace EnumDefinition {
    function get<T extends Family>(family: T, id: string, uom: UnitOfMeasure, nodeDefId: string): EnumDefinition<T> | undefined;
    function generate<T extends Family = Family>(family?: T): {
        [x: string]: EnumDefinition<Family>;
    };
    function generateAll(): any;
    function load(path: string): Map<Family, {
        [x: string]: EnumDefinition<Family>;
    }>;
}
export declare const EnumDefinitionMap: Map<Family, {
    [x: string]: EnumDefinition<Family>;
}>;
export declare function buildEnumDefinitions(NLSIndexMap: Map<Family, {
    [x: string]: {
        [y: number]: string;
    };
}>): Map<Family, {
    [x: string]: EnumDefinition<Family>;
}>;
//# sourceMappingURL=EnumDefinition.d.ts.map