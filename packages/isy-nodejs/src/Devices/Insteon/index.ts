import { InsteonLeakSensorDevice } from "./InsteonLeakSensorDevice.js";
//import Base from "./InsteonBaseDevice.js"
import { InsteonLockDevice } from "./InsteonLockDevice.js";
import { InsteonFanDevice } from "./InsteonFanDevice.js";
import { InsteonRelayDevice } from "./InsteonRelayDevice.js";
import { InsteonDimmableDevice } from "./InsteonDimmableDevice.js";
import { InsteonKeypadDimmerDevice } from "./InsteonKeypadDimmerDevice.js";
import { InsteonMotionSensorDevice } from "./InsteonMotionSensorDevice.js";
import { InsteonDimmerSwitchDevice } from "./InsteonDimmerSwitchDevice.js";
import { InsteonSmokeSensorDevice } from "./InsteonSmokeSensorDevice.js";
import { InsteonDimmerOutletDevice } from "./InsteonDimmerOutletDevice.js";
import { InsteonRelaySwitchDevice } from "./InsteonRelaySwitchDevice.js";
import { InsteonThermostatDevice } from "./InsteonThermostatDevice.js";
import { InsteonDoorWindowSensorDevice } from './InsteonDoorWindowSensorDevice.js';

export {InsteonBaseDevice as Base} from  "./InsteonBaseDevice.js";


export const Insteon = {
  LeakSensor: InsteonLeakSensorDevice,
  MotionSensor: InsteonMotionSensorDevice,
  SmokeSensor: InsteonSmokeSensorDevice,
  RelaySwitch: InsteonRelaySwitchDevice,
  DoorWindowSensor: InsteonDoorWindowSensorDevice,
  DimmerSwitch: InsteonDimmerSwitchDevice,
  DimmerOutlet: InsteonDimmerOutletDevice,

  Relay: InsteonRelayDevice,
  Dimmer: InsteonDimmableDevice,
  KeypadDimmer: InsteonKeypadDimmerDevice,
  Thermostat: InsteonThermostatDevice,
  Lock: InsteonLockDevice,
  Fan: InsteonFanDevice
};


export namespace Insteon {
  //export type Base<D,C> = InsteonBaseDevice<D,C>;
  export type LeakSensor = InsteonLeakSensorDevice;
  export type MotionSensor = InsteonMotionSensorDevice;
  export type SmokeSensor = InsteonSmokeSensorDevice;
  export type RelaySwitch = InsteonRelaySwitchDevice;
  export type DimmerSwitch = InsteonDimmerSwitchDevice;
  export type DimmerOutlet = InsteonDimmerOutletDevice;
  export type Relay = InsteonRelayDevice;
  export type Dimmer = InsteonDimmableDevice;
  export type KeypadDimmer = InsteonKeypadDimmerDevice;
  export type Thermostat = InsteonThermostatDevice;
  export type Lock = InsteonLockDevice;
  export type Fan = InsteonFanDevice;
}
