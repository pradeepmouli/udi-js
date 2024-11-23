
//import Base from "./InsteonBaseDevice.js"



export {InsteonBaseDevice as Base} from  "./InsteonBaseDevice.js";

export * from './Generated/index.js';

export {InsteonDimmableDevice as Dimmable} from "./InsteonDimmableDevice.js";

export {InsteonRelayDevice as Relay} from "./InsteonRelayDevice.js";

export {InsteonLeakSensorDevice as LeakSensor} from "./InsteonLeakSensorDevice.js";

export {InsteonMotionSensorDevice as MotionSensor} from "./InsteonMotionSensorDevice.js";

export {InsteonSmokeSensorDevice as SmokeSensor} from "./InsteonSmokeSensorDevice.js";

export {InsteonDoorWindowSensorDevice as DoorWindowSensor} from "./InsteonDoorWindowSensorDevice.js";

export {InsteonDimmerOutletDevice as DimmerOutlet} from "./InsteonDimmerOutletDevice.js";

/*export const Insteon = {
  LeakSensor: InsteonLeakSensorDevice,
  MotionSensor: InsteonMotionSensorDevice,
  SmokeSensor: InsteonSmokeSensorDevice,
  DoorWindowSensor: InsteonDoorWindowSensorDevice,
  DimmerOutlet: InsteonDimmerOutletDevice,
  Thermostat: InsteonThermostatDevice,
  Lock: InsteonLockDevice,
  Fan: InsteonFanDevice,
...Generated */
