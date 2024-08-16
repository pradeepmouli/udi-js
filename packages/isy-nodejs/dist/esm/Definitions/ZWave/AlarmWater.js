export var AlarmWater;
(function (AlarmWater) {
    AlarmWater[AlarmWater["Idle"] = 0] = "Idle";
    AlarmWater[AlarmWater["LeakDetected"] = 1] = "LeakDetected";
    AlarmWater[AlarmWater["LeakDetectedNoLocation"] = 2] = "LeakDetectedNoLocation";
    AlarmWater[AlarmWater["LevelDrop"] = 3] = "LevelDrop";
    AlarmWater[AlarmWater["LevelDropNoLocation"] = 4] = "LevelDropNoLocation";
    AlarmWater[AlarmWater["ReplaceWaterFilter"] = 5] = "ReplaceWaterFilter";
    AlarmWater[AlarmWater["WaterFlow"] = 6] = "WaterFlow";
    AlarmWater[AlarmWater["WaterPressure"] = 7] = "WaterPressure";
    AlarmWater[AlarmWater["WaterTemperature"] = 8] = "WaterTemperature";
    AlarmWater[AlarmWater["WaterLevel"] = 9] = "WaterLevel";
    AlarmWater[AlarmWater["SumpPumpActive"] = 10] = "SumpPumpActive";
    AlarmWater[AlarmWater["SumpPumpFail"] = 11] = "SumpPumpFail";
    AlarmWater[AlarmWater["UnknownEvent"] = 254] = "UnknownEvent";
})(AlarmWater || (AlarmWater = {}));
//# sourceMappingURL=AlarmWater.js.map