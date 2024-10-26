"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertSmoke = void 0;
var AlertSmoke;
(function (AlertSmoke) {
    AlertSmoke[AlertSmoke["Idle"] = 0] = "Idle";
    AlertSmoke[AlertSmoke["SmokeDetected"] = 1] = "SmokeDetected";
    AlertSmoke[AlertSmoke["SmokeDetectedNoLocation"] = 2] = "SmokeDetectedNoLocation";
    AlertSmoke[AlertSmoke["SmokeAlarmTest"] = 3] = "SmokeAlarmTest";
    AlertSmoke[AlertSmoke["ReplacementRequired"] = 4] = "ReplacementRequired";
    AlertSmoke[AlertSmoke["ReplacementRequiredEndOfLife"] = 5] = "ReplacementRequiredEndOfLife";
    AlertSmoke[AlertSmoke["AlarmSilenced"] = 6] = "AlarmSilenced";
    AlertSmoke[AlertSmoke["InspectionRequired"] = 7] = "InspectionRequired";
    AlertSmoke[AlertSmoke["DustInDevice"] = 8] = "DustInDevice";
    AlertSmoke[AlertSmoke["UnknownEvent"] = 254] = "UnknownEvent";
})(AlertSmoke || (exports.AlertSmoke = AlertSmoke = {}));
//# sourceMappingURL=AlertSmoke.js.map