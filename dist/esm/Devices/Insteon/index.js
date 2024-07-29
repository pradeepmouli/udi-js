import { InsteonLeakSensorDevice } from "./InsteonLeakSensorDevice.js";
import { InsteonBaseDevice } from "./InsteonBaseDevice.js";
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
export const Insteon = {
    LeakSensor: InsteonLeakSensorDevice,
    MotionSensor: InsteonMotionSensorDevice,
    SmokeSensor: InsteonSmokeSensorDevice,
    RelaySwitch: InsteonRelaySwitchDevice,
    DoorWindowSensor: InsteonDoorWindowSensorDevice,
    DimmerSwitch: InsteonDimmerSwitchDevice,
    DimmerOutlet: InsteonDimmerOutletDevice,
    Base: InsteonBaseDevice,
    Relay: InsteonRelayDevice,
    Dimmer: InsteonDimmableDevice,
    KeypadDimmer: InsteonKeypadDimmerDevice,
    Thermostat: InsteonThermostatDevice,
    Lock: InsteonLockDevice,
    Fan: InsteonFanDevice
};
