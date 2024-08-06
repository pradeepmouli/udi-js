export enum AlarmWater {
    Idle = 0,
    LeakDetected = 1,
    LeakDetectedNoLocation = 2,
    LevelDrop = 3,
    LevelDropNoLocation = 4,
    ReplaceWaterFilter = 5,
    WaterFlow = 6,
    WaterPressure = 7,
    WaterTemperature = 8,
    WaterLevel = 9,
    SumpPumpActive = 10,
    SumpPumpFail = 11,
    UnknownEvent = 254
}
