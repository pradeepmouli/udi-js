"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controls = exports.parser = exports.ELKAlarmPanelDevice = exports.ElkAlarmSensorDevice = exports.NodeType = exports.ISYNode = exports.InsteonMotionSensorDevice = exports.InsteonRelayDevice = exports.InsteonDimmerSwitchDevice = exports.InsteonDoorWindowSensorDevice = exports.InsteonThermostatDevice = exports.InsteonLockDevice = exports.InsteonOnOffOutletDevice = exports.InsteonDimmerOutletDevice = exports.InsteonSmokeSensorDevice = exports.InsteonLeakSensorDevice = exports.InsteonFanMotorDevice = exports.InsteonFanDevice = exports.InsteonDimmableDevice = exports.InsteonKeypadButtonDevice = exports.InsteonKeypadRelayDevice = exports.InsteonKeypadDimmerDevice = exports.ISYDevice = exports.InsteonOutletDevice = exports.InsteonBaseDevice = exports.ISYVariable = exports.Props = exports.Categories = exports.VariableType = exports.Family = exports.States = exports.ISYScene = void 0;
const xml2js_1 = require("xml2js");
const processors_1 = require("xml2js/lib/processors");
const Categories_1 = require("./Categories");
Object.defineProperty(exports, "Categories", { enumerable: true, get: function () { return Categories_1.Categories; } });
const InsteonBaseDevice_1 = require("./Devices/Insteon/InsteonBaseDevice");
Object.defineProperty(exports, "InsteonBaseDevice", { enumerable: true, get: function () { return InsteonBaseDevice_1.InsteonBaseDevice; } });
const InsteonDevice_1 = require("./Devices/Insteon/InsteonDevice");
Object.defineProperty(exports, "InsteonOutletDevice", { enumerable: true, get: function () { return InsteonDevice_1.InsteonOutletDevice; } });
const InsteonDimmableDevice_1 = require("./Devices/Insteon/InsteonDimmableDevice");
Object.defineProperty(exports, "InsteonDimmableDevice", { enumerable: true, get: function () { return InsteonDimmableDevice_1.InsteonDimmableDevice; } });
const InsteonDimmerSwitchDevice_1 = require("./Devices/Insteon/InsteonDimmerSwitchDevice");
Object.defineProperty(exports, "InsteonDimmerSwitchDevice", { enumerable: true, get: function () { return InsteonDimmerSwitchDevice_1.InsteonDimmerSwitchDevice; } });
const InsteonDoorWindowSensorDevice_1 = require("./Devices/Insteon/InsteonDoorWindowSensorDevice");
Object.defineProperty(exports, "InsteonDoorWindowSensorDevice", { enumerable: true, get: function () { return InsteonDoorWindowSensorDevice_1.InsteonDoorWindowSensorDevice; } });
const InsteonFanDevice_1 = require("./Devices/Insteon/InsteonFanDevice");
Object.defineProperty(exports, "InsteonFanDevice", { enumerable: true, get: function () { return InsteonFanDevice_1.InsteonFanDevice; } });
Object.defineProperty(exports, "InsteonFanMotorDevice", { enumerable: true, get: function () { return InsteonFanDevice_1.InsteonFanMotorDevice; } });
const InsteonKeypadRelayDevice_1 = require("./Devices/Insteon/InsteonKeypadRelayDevice");
Object.defineProperty(exports, "InsteonKeypadRelayDevice", { enumerable: true, get: function () { return InsteonKeypadRelayDevice_1.InsteonKeypadRelayDevice; } });
const InsteonKeypadDimmerDevice_1 = require("./Devices/Insteon/InsteonKeypadDimmerDevice");
Object.defineProperty(exports, "InsteonKeypadDimmerDevice", { enumerable: true, get: function () { return InsteonKeypadDimmerDevice_1.InsteonKeypadDimmerDevice; } });
const InsteonLeakSensorDevice_1 = require("./Devices/Insteon/InsteonLeakSensorDevice");
Object.defineProperty(exports, "InsteonLeakSensorDevice", { enumerable: true, get: function () { return InsteonLeakSensorDevice_1.InsteonLeakSensorDevice; } });
const InsteonLockDevice_1 = require("./Devices/Insteon/InsteonLockDevice");
Object.defineProperty(exports, "InsteonLockDevice", { enumerable: true, get: function () { return InsteonLockDevice_1.InsteonLockDevice; } });
const InsteonMotionSensorDevice_1 = require("./Devices/Insteon/InsteonMotionSensorDevice");
Object.defineProperty(exports, "InsteonMotionSensorDevice", { enumerable: true, get: function () { return InsteonMotionSensorDevice_1.InsteonMotionSensorDevice; } });
const InsteonRelayDevice_1 = require("./Devices/Insteon/InsteonRelayDevice");
Object.defineProperty(exports, "InsteonRelayDevice", { enumerable: true, get: function () { return InsteonRelayDevice_1.InsteonRelayDevice; } });
const InsteonThermostatDevice_1 = require("./Devices/Insteon/InsteonThermostatDevice");
Object.defineProperty(exports, "InsteonThermostatDevice", { enumerable: true, get: function () { return InsteonThermostatDevice_1.InsteonThermostatDevice; } });
const Families_1 = require("./Families");
Object.defineProperty(exports, "Family", { enumerable: true, get: function () { return Families_1.Family; } });
const ISYConstants_1 = require("./ISYConstants");
Object.defineProperty(exports, "NodeType", { enumerable: true, get: function () { return ISYConstants_1.NodeType; } });
Object.defineProperty(exports, "Props", { enumerable: true, get: function () { return ISYConstants_1.Props; } });
Object.defineProperty(exports, "States", { enumerable: true, get: function () { return ISYConstants_1.States; } });
const ProductInfoData = require("./isyproductinfo.json");
const InsteonOnOffOutletDevice_1 = require("./Devices/Insteon/InsteonOnOffOutletDevice");
Object.defineProperty(exports, "InsteonOnOffOutletDevice", { enumerable: true, get: function () { return InsteonOnOffOutletDevice_1.InsteonOnOffOutletDevice; } });
const InsteonSmokeSensorDevice_1 = require("./Devices/Insteon/InsteonSmokeSensorDevice");
Object.defineProperty(exports, "InsteonSmokeSensorDevice", { enumerable: true, get: function () { return InsteonSmokeSensorDevice_1.InsteonSmokeSensorDevice; } });
const InsteonDimmerOutletDevice_1 = require("./Devices/Insteon/InsteonDimmerOutletDevice");
Object.defineProperty(exports, "InsteonDimmerOutletDevice", { enumerable: true, get: function () { return InsteonDimmerOutletDevice_1.InsteonDimmerOutletDevice; } });
const InsteonKeypadDevice_1 = require("./Devices/Insteon/InsteonKeypadDevice");
Object.defineProperty(exports, "InsteonKeypadButtonDevice", { enumerable: true, get: function () { return InsteonKeypadDevice_1.InsteonKeypadButtonDevice; } });
exports.parser = new xml2js_1.Parser({
    explicitArray: false,
    mergeAttrs: true,
    attrValueProcessors: [processors_1.parseBooleans, processors_1.parseNumbers],
    valueProcessors: [(a, b) => (0, processors_1.parseNumbers)(a), (a, b) => (0, processors_1.parseBooleans)(a)]
});
exports.Controls = {};
const ProductInfo = ProductInfoData;
