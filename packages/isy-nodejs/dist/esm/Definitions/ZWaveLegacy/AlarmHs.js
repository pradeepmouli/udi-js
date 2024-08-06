export var AlarmHs;
(function (AlarmHs) {
    AlarmHs[AlarmHs["Idle"] = 0] = "Idle";
    AlarmHs[AlarmHs["Intrusion"] = 1] = "Intrusion";
    AlarmHs[AlarmHs["IntrusionNoLocation"] = 2] = "IntrusionNoLocation";
    AlarmHs[AlarmHs["TamperCoverRemoved"] = 3] = "TamperCoverRemoved";
    AlarmHs[AlarmHs["InvalidCode"] = 4] = "InvalidCode";
    AlarmHs[AlarmHs["GlassBreak"] = 5] = "GlassBreak";
    AlarmHs[AlarmHs["GlassBreakNoLocation"] = 6] = "GlassBreakNoLocation";
    AlarmHs[AlarmHs["Motion"] = 7] = "Motion";
    AlarmHs[AlarmHs["MotionNoLocation"] = 8] = "MotionNoLocation";
    AlarmHs[AlarmHs["TamperMoved"] = 9] = "TamperMoved";
    AlarmHs[AlarmHs["Impact"] = 10] = "Impact";
    AlarmHs[AlarmHs["MagneticInterference"] = 11] = "MagneticInterference";
    AlarmHs[AlarmHs["RfJamming"] = 12] = "RfJamming";
})(AlarmHs || (AlarmHs = {}));
