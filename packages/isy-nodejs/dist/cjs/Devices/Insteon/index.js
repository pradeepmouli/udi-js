"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Insteon = exports.Base = void 0;
const InsteonLeakSensorDevice_js_1 = require("./InsteonLeakSensorDevice.js");
//import Base from "./InsteonBaseDevice.js"
const InsteonLockDevice_js_1 = require("./InsteonLockDevice.js");
const InsteonFanDevice_js_1 = require("./InsteonFanDevice.js");
const InsteonRelayDevice_js_1 = require("./InsteonRelayDevice.js");
const InsteonDimmableDevice_js_1 = require("./InsteonDimmableDevice.js");
const InsteonKeypadDimmerDevice_js_1 = require("./InsteonKeypadDimmerDevice.js");
const InsteonMotionSensorDevice_js_1 = require("./InsteonMotionSensorDevice.js");
const InsteonDimmerSwitchDevice_js_1 = require("./InsteonDimmerSwitchDevice.js");
const InsteonSmokeSensorDevice_js_1 = require("./InsteonSmokeSensorDevice.js");
const InsteonDimmerOutletDevice_js_1 = require("./InsteonDimmerOutletDevice.js");
const InsteonRelaySwitchDevice_js_1 = require("./InsteonRelaySwitchDevice.js");
const InsteonThermostatDevice_js_1 = require("./InsteonThermostatDevice.js");
const InsteonDoorWindowSensorDevice_js_1 = require("./InsteonDoorWindowSensorDevice.js");
var InsteonBaseDevice_js_1 = require("./InsteonBaseDevice.js");
Object.defineProperty(exports, "Base", { enumerable: true, get: function () { return InsteonBaseDevice_js_1.InsteonBaseDevice; } });
exports.Insteon = {
    LeakSensor: InsteonLeakSensorDevice_js_1.InsteonLeakSensorDevice,
    MotionSensor: InsteonMotionSensorDevice_js_1.InsteonMotionSensorDevice,
    SmokeSensor: InsteonSmokeSensorDevice_js_1.InsteonSmokeSensorDevice,
    RelaySwitch: InsteonRelaySwitchDevice_js_1.InsteonRelaySwitchDevice,
    DoorWindowSensor: InsteonDoorWindowSensorDevice_js_1.InsteonDoorWindowSensorDevice,
    DimmerSwitch: InsteonDimmerSwitchDevice_js_1.InsteonDimmerSwitchDevice,
    DimmerOutlet: InsteonDimmerOutletDevice_js_1.InsteonDimmerOutletDevice,
    Relay: InsteonRelayDevice_js_1.InsteonRelayDevice,
    Dimmer: InsteonDimmableDevice_js_1.InsteonDimmableDevice,
    KeypadDimmer: InsteonKeypadDimmerDevice_js_1.InsteonKeypadDimmerDevice,
    Thermostat: InsteonThermostatDevice_js_1.InsteonThermostatDevice,
    Lock: InsteonLockDevice_js_1.InsteonLockDevice,
    Fan: InsteonFanDevice_js_1.InsteonFanDevice
};
//# sourceMappingURL=index.js.map