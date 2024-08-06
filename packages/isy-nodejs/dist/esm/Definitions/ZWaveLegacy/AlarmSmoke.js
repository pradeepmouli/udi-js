export var AlarmSmoke;
(function (AlarmSmoke) {
    AlarmSmoke[AlarmSmoke["Idle"] = 0] = "Idle";
    AlarmSmoke[AlarmSmoke["SmokeDetected"] = 1] = "SmokeDetected";
    AlarmSmoke[AlarmSmoke["SmokeDetectedNoLocation"] = 2] = "SmokeDetectedNoLocation";
    AlarmSmoke[AlarmSmoke["SmokeAlarmTest"] = 3] = "SmokeAlarmTest";
    AlarmSmoke[AlarmSmoke["ReplacementRequired"] = 4] = "ReplacementRequired";
    AlarmSmoke[AlarmSmoke["ReplacementRequiredEndOfLife"] = 5] = "ReplacementRequiredEndOfLife";
    AlarmSmoke[AlarmSmoke["AlarmSilenced"] = 6] = "AlarmSilenced";
    AlarmSmoke[AlarmSmoke["InspectionRequired"] = 7] = "InspectionRequired";
    AlarmSmoke[AlarmSmoke["DustInDevice"] = 8] = "DustInDevice";
    AlarmSmoke[AlarmSmoke["UnknownEvent"] = 254] = "UnknownEvent";
})(AlarmSmoke || (AlarmSmoke = {}));
