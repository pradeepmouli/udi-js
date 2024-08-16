import { Family } from "../ISY.js";
import { Insteon } from "./Insteon/index.js";
import { ZWaveBaseDevice } from "./ZWave/ZWaveBaseDevice.js";
export declare const Devices: {
    Insteon: {
        LeakSensor: typeof import("./Insteon/InsteonLeakSensorDevice.js").InsteonLeakSensorDevice;
        MotionSensor: typeof import("./Insteon/InsteonMotionSensorDevice.js").InsteonMotionSensorDevice;
        SmokeSensor: typeof import("./Insteon/InsteonSmokeSensorDevice.js").InsteonSmokeSensorDevice;
        RelaySwitch: typeof import("./Insteon/InsteonRelaySwitchDevice.js").InsteonRelaySwitchDevice;
        DoorWindowSensor: typeof import("./Insteon/InsteonDoorWindowSensorDevice.js").InsteonDoorWindowSensorDevice;
        DimmerSwitch: typeof import("./Insteon/InsteonDimmerSwitchDevice.js").InsteonDimmerSwitchDevice;
        DimmerOutlet: typeof import("./Insteon/InsteonDimmerOutletDevice.js").InsteonDimmerOutletDevice;
        Relay: typeof import("./Insteon/InsteonRelayDevice.js").InsteonRelayDevice;
        Dimmer: typeof import("./Insteon/InsteonDimmableDevice.js").InsteonDimmableDevice;
        KeypadDimmer: typeof import("./Insteon/InsteonKeypadDimmerDevice.js").InsteonKeypadDimmerDevice;
        Thermostat: typeof import("./Insteon/InsteonThermostatDevice.js").InsteonThermostatDevice;
        Lock: typeof import("./Insteon/InsteonLockDevice.js").InsteonLockDevice;
        Fan: typeof import("./Insteon/InsteonFanDevice.js").InsteonFanDevice;
    };
    ZWave: {
        Base: typeof ZWaveBaseDevice;
    };
    ZigBee: {};
};
export declare namespace Devices {
    type Insteon = typeof Insteon;
    type ZWave = {
        Base: ZWaveBaseDevice;
    };
    type ZigBee = {};
}
export type Devices<T extends Family.Insteon | Family.ZWave | Family.ZigBee> = (typeof Devices)[`Insteon`];
export type ToDevice<T extends keyof Devices<any>> = T extends keyof Devices<infer B> ? Devices<B>[`${T}`] : never;
export default Devices;
//# sourceMappingURL=index.d.ts.map