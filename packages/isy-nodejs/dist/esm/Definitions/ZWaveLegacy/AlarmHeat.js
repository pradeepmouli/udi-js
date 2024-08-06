export var AlarmHeat;
(function (AlarmHeat) {
    AlarmHeat[AlarmHeat["Idle"] = 0] = "Idle";
    AlarmHeat[AlarmHeat["Overheat"] = 1] = "Overheat";
    AlarmHeat[AlarmHeat["OverheatNoLocation"] = 2] = "OverheatNoLocation";
    AlarmHeat[AlarmHeat["RapidTemperatureRise"] = 3] = "RapidTemperatureRise";
    AlarmHeat[AlarmHeat["RapidTemperatureRiseNoLocation"] = 4] = "RapidTemperatureRiseNoLocation";
    AlarmHeat[AlarmHeat["Underheat"] = 5] = "Underheat";
    AlarmHeat[AlarmHeat["UnderheatNoLocation"] = 6] = "UnderheatNoLocation";
    AlarmHeat[AlarmHeat["HeatAlarmTest"] = 7] = "HeatAlarmTest";
    AlarmHeat[AlarmHeat["ReplacementRequiredEndOfLife"] = 8] = "ReplacementRequiredEndOfLife";
    AlarmHeat[AlarmHeat["AlarmSilenced"] = 9] = "AlarmSilenced";
    AlarmHeat[AlarmHeat["DustInDevice"] = 10] = "DustInDevice";
    AlarmHeat[AlarmHeat["InspectionRequired"] = 11] = "InspectionRequired";
    AlarmHeat[AlarmHeat["RapidTemperatureFall"] = 12] = "RapidTemperatureFall";
    AlarmHeat[AlarmHeat["RapidTemperatureFallNoLocation"] = 13] = "RapidTemperatureFallNoLocation";
})(AlarmHeat || (AlarmHeat = {}));
