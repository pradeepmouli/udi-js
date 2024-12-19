
import type { StringKeys } from '../../Utils.js';

export namespace Category {
	export enum Insteon {
		Controller = 0,
		DimmableControl = 1,
		RelayControl = 2,
		NetworkBridge = 3,
		IrrigationControl = 4,
		ClimateControl = 5,
		PoolControl = 6,
		SensorActuator = 7,
		HomeEntertainment = 8,
		EnergyManagement = 9,
		ApplianceControl = 10,
		WindowShadeControl = 14,
		AccessControl = 15,
		SecurityHealthSafety = 16,
		A10X10 = 113,
		Virtual = 127,
		Unknown = 254
	}

	export enum Domain {
		Home = 1,
		Outdoor = 2,
		Industrial = 3,
		Commercial = 4
	}

	export namespace Home {
		export enum Category {
			DeviceID = 0,
			Alarm = 1,
			Controller = 2,
			Sensor = 3,
			Relay = 4,
			Remote = 5,
			AudioVisual = 6,
			DoorLock = 7,
			Doorbell = 8,
			Camera = 9,
			DateTime = 10,
			Weather = 11,
			HVAC = 12,
			Display = 13,
			Gateway = 14,
			PowerManagement = 15,
			Appliance = 16,
			HomeHealth = 17,
			Barrier = 18,
			Automotive = 19
		}

		export enum Alarm {
			SecurityPanel = 1,
			Zone = 2,
			Partition = 3,
			Siren = 4
		}

		export enum Controller {
			ClassAMotorControl = 1,
			ClassBMotorControl = 2,
			ClassCMotorControl = 3,
			MotorMultiposition = 4,
			EntryControl = 5,
			PCController = 6,
			SceneController = 7,
			SubsystemController = 8,
			DimmerSwitch = 9,
			MultilevelSwitch = 10,
			SceneSwitch = 11,
			Toggle = 12,
			NonDimmingLighting = 16
		}

		export enum Sensor {
			BinarySensor = 1,
			MultilevelSensor = 2,
			ClimateSensor = 3,
			MotionSensor = 4,
			EnergyMeter = 5,
			PulseMeter = 6,
			WaterMeter = 7,
			GasMeter = 8,
			SmokeDetector = 9,
			TamperSensor = 10,
			TiltSensor = 11,
			WaterSensor = 12,
			DoorWindowSensor = 13,
			LowBatterySensor = 14,
			COEndOfLifeSensor = 15,
			OverheatSensor = 16,
			RapidTempRiseSensor = 17,
			UnderheatSensor = 18,
			LeakDetectedSensor = 19,
			LevelDropSensor = 20,
			FilterCloggedSensor = 21,
			IntrusionDetectSensor = 22,
			CO2Sensor = 23,
			COSensor = 24,
			FreezeSensor = 25,
			GlassBreakSensor = 26,
			HeatSensor = 27
		}

		export enum Relay {
			OnOffPowerStrip = 1,
			OnOffPowerSwitch = 2,
			OnOffSceneSwitch = 3,
			BinarySwitch = 4,
			OpenCloseValve = 5
		}

		export enum Remote {
			AVRemoteControl = 1,
			SimpleRemoteControl = 2
		}

		export enum AudioVisual {
			AVControlPoint = 1,
			SatelliteReceiver = 2,
			Television = 3,
			SetTopBox = 4
		}

		export enum DoorLock {
			Unknown = 1
		}

		export enum Doorbell {
			DoorBell = 1,
			Chime = 2
		}

		export enum Camera {
			Unknown = 1
		}

		export enum DateTime {
			Timer = 1
		}

		export enum Weather {
			WeatherStation = 0,
			Temperature = 1,
			Humidity = 2,
			BarometricPressure = 3,
			Wind = 4,
			Precipitation = 5,
			IlluminationLight = 6,
			Lightning = 7
		}

		export enum HVAC {
			Thermostat = 1,
			ResidentialHRV = 2
		}

		export enum Display {
			Unknown = 1
		}

		export enum Gateway {
			Unknown = 1
		}

		export enum PowerManagement {
			Unknown = 1
		}

		export enum Appliance {
			Unknown = 1
		}

		export enum HomeHealth {
			Unknown = 1
		}

		export enum Barrier {
			Unknown = 1
		}

		export enum Automotive {
			Tesla = 1
		}
	}

	export namespace Commercial {export enum Category {}}

	export namespace Outdoor {export enum Category {}}

	export namespace Industrial {export enum Category {}}
}
export type DeviceInfo<D extends keyof typeof Category.Domain, C extends keyof (typeof Category)[D], S extends keyof (typeof Category)[D][C]> = {
	domain: typeof Category.Domain[D];
	category: (typeof Category)[D][C];
	subcategory: (typeof Category)[D][C][S];
	model: number;
};


export type DeviceHint<D extends keyof typeof Category.Domain, C extends StringKeys<typeof Category[D]>, S extends StringKeys<typeof Category[D][C]>> = `${D}.${C}.${S}.${string}`;
