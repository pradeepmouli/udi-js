"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertApp = void 0;
var AlertApp;
(function (AlertApp) {
    AlertApp[AlertApp["Idle"] = 0] = "Idle";
    AlertApp[AlertApp["ProgramStarted"] = 1] = "ProgramStarted";
    AlertApp[AlertApp["ProgramInProgress"] = 2] = "ProgramInProgress";
    AlertApp[AlertApp["ProgramCompleted"] = 3] = "ProgramCompleted";
    AlertApp[AlertApp["ReplaceMainFilter"] = 4] = "ReplaceMainFilter";
    AlertApp[AlertApp["FailureToSetTargetTemperature"] = 5] = "FailureToSetTargetTemperature";
    AlertApp[AlertApp["SupplyingWater"] = 6] = "SupplyingWater";
    AlertApp[AlertApp["WaterSupplyFailure"] = 7] = "WaterSupplyFailure";
    AlertApp[AlertApp["Boiling"] = 8] = "Boiling";
    AlertApp[AlertApp["BoilingFailure"] = 9] = "BoilingFailure";
    AlertApp[AlertApp["Washing"] = 10] = "Washing";
    AlertApp[AlertApp["WashingFailure"] = 11] = "WashingFailure";
    AlertApp[AlertApp["Rinsing"] = 12] = "Rinsing";
    AlertApp[AlertApp["RinsingFailure"] = 13] = "RinsingFailure";
    AlertApp[AlertApp["Draining"] = 14] = "Draining";
    AlertApp[AlertApp["DrainingFailure"] = 15] = "DrainingFailure";
    AlertApp[AlertApp["Spinning"] = 16] = "Spinning";
    AlertApp[AlertApp["SpinningFailure"] = 17] = "SpinningFailure";
    AlertApp[AlertApp["Drying"] = 18] = "Drying";
    AlertApp[AlertApp["DryingFailure"] = 19] = "DryingFailure";
    AlertApp[AlertApp["FanFailure"] = 20] = "FanFailure";
    AlertApp[AlertApp["CompressorFailure"] = 21] = "CompressorFailure";
})(AlertApp || (exports.AlertApp = AlertApp = {}));
//# sourceMappingURL=AlertApp.js.map