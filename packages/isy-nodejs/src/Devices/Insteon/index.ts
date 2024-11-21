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

import { ISYNode } from '../../ISYNode.js';
import type * as GeneratedTypes from "./Generated/index.js";

export {InsteonBaseDevice as Base} from  "./InsteonBaseDevice.js";

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


export * from './Generated/index.js';