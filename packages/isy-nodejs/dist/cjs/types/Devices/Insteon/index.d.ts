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
export declare const Insteon: {
    LeakSensor: typeof InsteonLeakSensorDevice;
    MotionSensor: typeof InsteonMotionSensorDevice;
    SmokeSensor: typeof InsteonSmokeSensorDevice;
    RelaySwitch: typeof InsteonRelaySwitchDevice;
    DoorWindowSensor: typeof InsteonDoorWindowSensorDevice;
    DimmerSwitch: typeof InsteonDimmerSwitchDevice;
    DimmerOutlet: typeof InsteonDimmerOutletDevice;
    Base: typeof InsteonBaseDevice;
    Relay: typeof InsteonRelayDevice;
    Dimmer: typeof InsteonDimmableDevice;
    KeypadDimmer: typeof InsteonKeypadDimmerDevice;
    Thermostat: typeof InsteonThermostatDevice;
    Lock: typeof InsteonLockDevice;
    Fan: typeof InsteonFanDevice;
};
export declare namespace Insteon {
    type Base = InsteonBaseDevice;
    type LeakSensor = InsteonLeakSensorDevice;
    type MotionSensor = InsteonMotionSensorDevice;
    type SmokeSensor = InsteonSmokeSensorDevice;
    type RelaySwitch = InsteonRelaySwitchDevice;
    type DimmerSwitch = InsteonDimmerSwitchDevice;
    type DimmerOutlet = InsteonDimmerOutletDevice;
    type Relay = InsteonRelayDevice;
    type Dimmer = InsteonDimmableDevice;
    type KeypadDimmer = InsteonKeypadDimmerDevice;
    type Thermostat = InsteonThermostatDevice;
    type Lock = InsteonLockDevice;
    type Fan = InsteonFanDevice;
}
//# sourceMappingURL=index.d.ts.map