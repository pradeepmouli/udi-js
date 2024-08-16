export var AlarmSys;
(function (AlarmSys) {
    AlarmSys[AlarmSys["Idle"] = 0] = "Idle";
    AlarmSys[AlarmSys["HardwareFailure"] = 1] = "HardwareFailure";
    AlarmSys[AlarmSys["SoftwareFailure"] = 2] = "SoftwareFailure";
    AlarmSys[AlarmSys["HardwareFailureReason"] = 3] = "HardwareFailureReason";
    AlarmSys[AlarmSys["SoftwareFailureReason"] = 4] = "SoftwareFailureReason";
    AlarmSys[AlarmSys["Heartbeat"] = 5] = "Heartbeat";
    AlarmSys[AlarmSys["CoverRemoved"] = 6] = "CoverRemoved";
    AlarmSys[AlarmSys["EmergencyShutoff"] = 7] = "EmergencyShutoff";
    AlarmSys[AlarmSys["DigitalInputHighState"] = 9] = "DigitalInputHighState";
    AlarmSys[AlarmSys["DigitalInputLowState"] = 10] = "DigitalInputLowState";
    AlarmSys[AlarmSys["DigitalInputOpen"] = 11] = "DigitalInputOpen";
})(AlarmSys || (AlarmSys = {}));
//# sourceMappingURL=AlarmSys.js.map