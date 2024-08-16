export var AlarmApp;
(function (AlarmApp) {
    AlarmApp[AlarmApp["Idle"] = 0] = "Idle";
    AlarmApp[AlarmApp["ProgramStarted"] = 1] = "ProgramStarted";
    AlarmApp[AlarmApp["ProgramInProgress"] = 2] = "ProgramInProgress";
    AlarmApp[AlarmApp["ProgramCompleted"] = 3] = "ProgramCompleted";
    AlarmApp[AlarmApp["ReplaceMainFilter"] = 4] = "ReplaceMainFilter";
    AlarmApp[AlarmApp["FailureToSetTargetTemperature"] = 5] = "FailureToSetTargetTemperature";
    AlarmApp[AlarmApp["SupplyingWater"] = 6] = "SupplyingWater";
    AlarmApp[AlarmApp["WaterSupplyFailure"] = 7] = "WaterSupplyFailure";
    AlarmApp[AlarmApp["Boiling"] = 8] = "Boiling";
    AlarmApp[AlarmApp["BoilingFailure"] = 9] = "BoilingFailure";
    AlarmApp[AlarmApp["Washing"] = 10] = "Washing";
    AlarmApp[AlarmApp["WashingFailure"] = 11] = "WashingFailure";
    AlarmApp[AlarmApp["Rinsing"] = 12] = "Rinsing";
    AlarmApp[AlarmApp["RinsingFailure"] = 13] = "RinsingFailure";
    AlarmApp[AlarmApp["Draining"] = 14] = "Draining";
    AlarmApp[AlarmApp["DrainingFailure"] = 15] = "DrainingFailure";
    AlarmApp[AlarmApp["Spinning"] = 16] = "Spinning";
    AlarmApp[AlarmApp["SpinningFailure"] = 17] = "SpinningFailure";
    AlarmApp[AlarmApp["Drying"] = 18] = "Drying";
    AlarmApp[AlarmApp["DryingFailure"] = 19] = "DryingFailure";
    AlarmApp[AlarmApp["FanFailure"] = 20] = "FanFailure";
    AlarmApp[AlarmApp["CompressorFailure"] = 21] = "CompressorFailure";
})(AlarmApp || (AlarmApp = {}));
//# sourceMappingURL=AlarmApp.js.map