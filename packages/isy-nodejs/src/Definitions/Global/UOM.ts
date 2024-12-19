import { Type } from 'ts-morph';
import type { Integer, IntRange } from 'type-fest';
import type { NumberLiteralType } from 'typescript';


export enum UnitOfMeasure {
	Unknown = 0,
	Ampere = 1,
	Boolean = 2,
	BtuPerHour = 3,
	Celsius = 4,
	Centimeter = 5,
	CubicFeet = 6,
	CubicFeetPerMinute = 7,
	CubicMeter = 8,
	Day = 9,
	Days = 10,
	DeadboltStatus = 11,
	Decibel = 12,
	DecibelA = 13,
	Degree = 14,
	DoorLockAlarm = 15,
	EuropeanMacroseismic = 16,
	Fahrenheit = 17,
	Feet = 18,
	Hour = 19,
	Hours = 20,
	AbsoluteHumidity = 21,
	RelativeHumidity = 22,
	InchesOfMercury = 23,
	InchesPerHour = 24,
	Index = 25,
	Kelvin = 26,
	Keyword = 27,
	Kilogram = 28,
	Kilovolt = 29,
	Kilowatt = 30,
	Kilopascal = 31,
	KilometersPerHour = 32,
	KilowattsPerHour = 33,
	Liedu = 34,
	Liter = 35,
	Lux = 36,
	Mercalli = 37,
	Meter = 38,
	CubicMetersPerHour = 39,
	MPS = 40,
	Milliamp = 41,
	Millisecond = 42,
	Millivolt = 43,
	Minute = 44,
	DurationInMinutes = 45,
	MillimetersPerHour = 46,
	Month = 47,
	MilesPerHour = 48,
	MetersPerSecond = 49,
	Ohm = 50,
	Percent = 51,
	Pound = 52,
	PowerFactor = 53,
	PartsPerMillion = 54,
	PulseCount = 55,
	RawValue = 56,
	Second = 57,
	DurationInSeconds = 58,
	SiemensPerMeter = 59,
	BodyWaveMagnitudeScale = 60,
	RichterScale = 61,
	MomentMagnitudeScale = 62,
	SurfaceWaveMagnitudeScale = 63,
	Shindo = 64,
	SML = 65,
	ThermostatHeatCoolState = 66,
	ThermostatMode = 67,
	ThermostatFanMode = 68,
	USGallon = 69,
	UserNumber = 70,
	UVIndex = 71,
	Volt = 72,
	Watt = 73,
	WattsPerSquareMeter = 74,
	Weekday = 75,
	WindDirectionInDegrees = 76,
	Year = 77,
	OffOn = 78,
	OpenClose = 79,
	ThermostatFanRunState = 80,
	ThermostatFanModeOverride = 81,
	Millimeter = 82,
	Kilometer = 83,
	SecureMode = 84,
	OhmMeter = 85,
	KiloOhm = 86,
	CubicMeterPerCubicMeter = 87,
	WaterActivity = 88,
	RotationsPerMinute = 89,
	Hertz = 90,
	AnglePositionDegreesNorthPole = 91,
	AnglePositionDegreesSouthPole = 92,
	PowerManagementAlarm = 93,
	ApplianceAlarm = 94,
	HomeHealthAlarm = 95,
	VOCLevel = 96,
	BarrierStatus = 97,
	InsteonThermostatMode = 98,
	InsteonThermostatFanMode = 99,
	LevelFrom0To255 = 100,
	DegreeX2 = 101,
	KilowattSecond = 102,
	Dollar = 103,
	Cent = 104,
	Inch = 105,
	MillimetersPerDay = 106,
	Raw1ByteUnsignedValue = 107,
	Raw2ByteUnsignedValue = 108,
	Raw3ByteUnsignedValue = 109,
	Raw4ByteUnsignedValue = 110,
	Raw1ByteSignedValue = 111,
	Raw2ByteSignedValue = 112,
	Raw3ByteSignedValue = 113,
	Raw4ByteSignedValue = 114,
	MostRecentOnStyleActionTakenForLampControl = 115,
	Mile = 116,
	Millibar = 117,
	Hectopascal = 118,
	WattHour = 119,
	InchesPerDay = 120,
	MolePerCubicMeter = 121,
	MicrogramPerCubicMeter = 122,
	BecquerelPerCubicMeter = 123,
	PicocuriesPerLiter = 124,
	Acidity = 125,
	BeatsPerMinute = 126,
	MillimetersOfMercury = 127,
	Joule = 128,
	BodyMassIndex = 129,
	LitersPerHour = 130,
	DecibelMilliwatts = 131,
	BreathsPerMinute = 132,
	Kilohertz = 133,
	MetersPerSquaredSeconds = 134,
	ApparentPower = 135,
	ReactivePower = 136,
	NTPDateTime = 137,
	PoundPerSquareInch = 138,
	Degrees0To360 = 139,
	MilligramPerLiter = 140,
	Newton = 141,
	USGallonsPerSecond = 142,
	USGallonsPerMinute = 143,
	USGallonsPerHour = 144,
	Text = 145,
	ReservedForSystemEditors1 = 146,
	XML = 147,
	ReservedForSystemEditors2 = 148,
	DegreeOfHue0To360 = 149,
	URLForStreaming = 150,
	UnixTimestamp = 151
}

export function toString(this: UnitOfMeasure): keyof typeof UnitOfMeasure {
	return UnitOfMeasure[this] as keyof typeof UnitOfMeasure;
}



//import { Converters } from "../../Converters.js";
export namespace UnitOfMeasure {
	export type ToType<X extends UnitOfMeasure> = X extends keyof UnitOfMeasure ? TypeMap[X] : number;




	export type Standard = keyof typeof UnitOfMeasure;

	export type Matter = 'LightingLevel' | 'RampRate';

	type TypeMap = {
		[UnitOfMeasure.Percent]: IntRange<0, 100>;
		[UnitOfMeasure.Boolean]: boolean;
		[UnitOfMeasure.Degree]: IntRange<0, 360>;
		[UnitOfMeasure.DegreeX2]: IntRange<0, 720>;
		[UnitOfMeasure.LevelFrom0To255]: IntRange<0, 255>;
		[UnitOfMeasure.Text]: string;
		[UnitOfMeasure.URLForStreaming]: string;
		[UnitOfMeasure.UnixTimestamp]: number;
		[UnitOfMeasure.NTPDateTime]: Date;
		[UnitOfMeasure.Raw1ByteUnsignedValue]: IntRange<0, 255>;
		//[UnitOfMeasure.Raw1ByteSignedValue]: IntRange<-128, 127>;
		[UnitOfMeasure.Celsius]: number;
		[UnitOfMeasure.Fahrenheit]: number;
		[UnitOfMeasure.Unknown]: any;

	}





	/*export function convertTo<X extends UnitOfMeasure, Y extends UnitOfMeasure>(
		this: X,
		targetUOM: Y,
		value: ToType<Y>
	): ToType<X> {
		const converter = Converters.Standard[this.toString()]?.[targetUOM];
		if (converter) {
			return converter.to(value);
		}
		return value as unknown as ToType<X>;
	}

	export function convertFrom<X extends UnitOfMeasure, Y extends UnitOfMeasure>(
		this: X,
		sourceUOM: Y,
		value: ToType<Y>
	): ToType<X> {
		const converter = Converters.Standard[this.toString()]?.[sourceUOM];
		if (converter) {
			return converter.from(value);
		}
		return value as unknown as ToType<X>;
	}*/


}
