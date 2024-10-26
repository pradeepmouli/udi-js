"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertWater = void 0;
var AlertWater;
(function (AlertWater) {
    AlertWater[AlertWater["Idle"] = 0] = "Idle";
    AlertWater[AlertWater["LeakDetected"] = 1] = "LeakDetected";
    AlertWater[AlertWater["LeakDetectedNoLocation"] = 2] = "LeakDetectedNoLocation";
    AlertWater[AlertWater["LevelDrop"] = 3] = "LevelDrop";
    AlertWater[AlertWater["LevelDropNoLocation"] = 4] = "LevelDropNoLocation";
    AlertWater[AlertWater["ReplaceWaterFilter"] = 5] = "ReplaceWaterFilter";
    AlertWater[AlertWater["WaterFlow"] = 6] = "WaterFlow";
    AlertWater[AlertWater["WaterPressure"] = 7] = "WaterPressure";
    AlertWater[AlertWater["WaterTemperature"] = 8] = "WaterTemperature";
    AlertWater[AlertWater["WaterLevel"] = 9] = "WaterLevel";
    AlertWater[AlertWater["SumpPumpActive"] = 10] = "SumpPumpActive";
    AlertWater[AlertWater["SumpPumpFail"] = 11] = "SumpPumpFail";
    AlertWater[AlertWater["UnknownEvent"] = 254] = "UnknownEvent";
})(AlertWater || (exports.AlertWater = AlertWater = {}));
//# sourceMappingURL=AlertWater.js.map