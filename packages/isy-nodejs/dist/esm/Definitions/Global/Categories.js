export var Category;
(function (Category_1) {
    let Insteon;
    (function (Insteon) {
        Insteon[Insteon["Controller"] = 0] = "Controller";
        Insteon[Insteon["DimmableControl"] = 1] = "DimmableControl";
        Insteon[Insteon["RelayControl"] = 2] = "RelayControl";
        Insteon[Insteon["NetworkBridge"] = 3] = "NetworkBridge";
        Insteon[Insteon["IrrigationControl"] = 4] = "IrrigationControl";
        Insteon[Insteon["ClimateControl"] = 5] = "ClimateControl";
        Insteon[Insteon["PoolControl"] = 6] = "PoolControl";
        Insteon[Insteon["SensorActuator"] = 7] = "SensorActuator";
        Insteon[Insteon["HomeEntertainment"] = 8] = "HomeEntertainment";
        Insteon[Insteon["EnergyManagement"] = 9] = "EnergyManagement";
        Insteon[Insteon["ApplianceControl"] = 10] = "ApplianceControl";
        Insteon[Insteon["WindowShadeControl"] = 14] = "WindowShadeControl";
        Insteon[Insteon["AccessControl"] = 15] = "AccessControl";
        Insteon[Insteon["SecurityHealthSafety"] = 16] = "SecurityHealthSafety";
        Insteon[Insteon["A10X10"] = 113] = "A10X10";
        Insteon[Insteon["Virtual"] = 127] = "Virtual";
        Insteon[Insteon["Unknown"] = 254] = "Unknown";
    })(Insteon = Category_1.Insteon || (Category_1.Insteon = {}));
    let Domain;
    (function (Domain) {
        Domain[Domain["Home"] = 1] = "Home";
        Domain[Domain["Outdoor"] = 2] = "Outdoor";
        Domain[Domain["Industrial"] = 3] = "Industrial";
        Domain[Domain["Commercial"] = 4] = "Commercial";
    })(Domain = Category_1.Domain || (Category_1.Domain = {}));
    let Home;
    (function (Home) {
        let Category;
        (function (Category) {
            Category[Category["DeviceID"] = 0] = "DeviceID";
            Category[Category["Alarm"] = 1] = "Alarm";
            Category[Category["Controller"] = 2] = "Controller";
            Category[Category["Sensor"] = 3] = "Sensor";
            Category[Category["Relay"] = 4] = "Relay";
            Category[Category["Remote"] = 5] = "Remote";
            Category[Category["AudioVisual"] = 6] = "AudioVisual";
            Category[Category["DoorLock"] = 7] = "DoorLock";
            Category[Category["Doorbell"] = 8] = "Doorbell";
            Category[Category["Camera"] = 9] = "Camera";
            Category[Category["DateTime"] = 10] = "DateTime";
            Category[Category["Weather"] = 11] = "Weather";
            Category[Category["HVAC"] = 12] = "HVAC";
            Category[Category["Display"] = 13] = "Display";
            Category[Category["Gateway"] = 14] = "Gateway";
            Category[Category["PowerManagement"] = 15] = "PowerManagement";
            Category[Category["Appliance"] = 16] = "Appliance";
            Category[Category["HomeHealth"] = 17] = "HomeHealth";
            Category[Category["Barrier"] = 18] = "Barrier";
            Category[Category["Automotive"] = 19] = "Automotive";
        })(Category = Home.Category || (Home.Category = {}));
        let Alarm;
        (function (Alarm) {
            Alarm[Alarm["SecurityPanel"] = 1] = "SecurityPanel";
            Alarm[Alarm["Zone"] = 2] = "Zone";
            Alarm[Alarm["Partition"] = 3] = "Partition";
            Alarm[Alarm["Siren"] = 4] = "Siren";
        })(Alarm = Home.Alarm || (Home.Alarm = {}));
        let Controller;
        (function (Controller) {
            Controller[Controller["ClassAMotorControl"] = 1] = "ClassAMotorControl";
            Controller[Controller["ClassBMotorControl"] = 2] = "ClassBMotorControl";
            Controller[Controller["ClassCMotorControl"] = 3] = "ClassCMotorControl";
            Controller[Controller["MotorMultiposition"] = 4] = "MotorMultiposition";
            Controller[Controller["EntryControl"] = 5] = "EntryControl";
            Controller[Controller["PCController"] = 6] = "PCController";
            Controller[Controller["SceneController"] = 7] = "SceneController";
            Controller[Controller["SubsystemController"] = 8] = "SubsystemController";
            Controller[Controller["DimmerSwitch"] = 9] = "DimmerSwitch";
            Controller[Controller["MultilevelSwitch"] = 10] = "MultilevelSwitch";
            Controller[Controller["SceneSwitch"] = 11] = "SceneSwitch";
            Controller[Controller["Toggle"] = 12] = "Toggle";
            Controller[Controller["NonDimmingLighting"] = 16] = "NonDimmingLighting";
        })(Controller = Home.Controller || (Home.Controller = {}));
        let Sensor;
        (function (Sensor) {
            Sensor[Sensor["BinarySensor"] = 1] = "BinarySensor";
            Sensor[Sensor["MultilevelSensor"] = 2] = "MultilevelSensor";
            Sensor[Sensor["ClimateSensor"] = 3] = "ClimateSensor";
            Sensor[Sensor["MotionSensor"] = 4] = "MotionSensor";
            Sensor[Sensor["EnergyMeter"] = 5] = "EnergyMeter";
            Sensor[Sensor["PulseMeter"] = 6] = "PulseMeter";
            Sensor[Sensor["WaterMeter"] = 7] = "WaterMeter";
            Sensor[Sensor["GasMeter"] = 8] = "GasMeter";
            Sensor[Sensor["SmokeDetector"] = 9] = "SmokeDetector";
            Sensor[Sensor["TamperSensor"] = 10] = "TamperSensor";
            Sensor[Sensor["TiltSensor"] = 11] = "TiltSensor";
            Sensor[Sensor["WaterSensor"] = 12] = "WaterSensor";
            Sensor[Sensor["DoorWindowSensor"] = 13] = "DoorWindowSensor";
            Sensor[Sensor["LowBatterySensor"] = 14] = "LowBatterySensor";
            Sensor[Sensor["COEndOfLifeSensor"] = 15] = "COEndOfLifeSensor";
            Sensor[Sensor["OverheatSensor"] = 16] = "OverheatSensor";
            Sensor[Sensor["RapidTempRiseSensor"] = 17] = "RapidTempRiseSensor";
            Sensor[Sensor["UnderheatSensor"] = 18] = "UnderheatSensor";
            Sensor[Sensor["LeakDetectedSensor"] = 19] = "LeakDetectedSensor";
            Sensor[Sensor["LevelDropSensor"] = 20] = "LevelDropSensor";
            Sensor[Sensor["FilterCloggedSensor"] = 21] = "FilterCloggedSensor";
            Sensor[Sensor["IntrusionDetectSensor"] = 22] = "IntrusionDetectSensor";
            Sensor[Sensor["CO2Sensor"] = 23] = "CO2Sensor";
            Sensor[Sensor["COSensor"] = 24] = "COSensor";
            Sensor[Sensor["FreezeSensor"] = 25] = "FreezeSensor";
            Sensor[Sensor["GlassBreakSensor"] = 26] = "GlassBreakSensor";
            Sensor[Sensor["HeatSensor"] = 27] = "HeatSensor";
        })(Sensor = Home.Sensor || (Home.Sensor = {}));
        let Relay;
        (function (Relay) {
            Relay[Relay["OnOffPowerStrip"] = 1] = "OnOffPowerStrip";
            Relay[Relay["OnOffPowerSwitch"] = 2] = "OnOffPowerSwitch";
            Relay[Relay["OnOffSceneSwitch"] = 3] = "OnOffSceneSwitch";
            Relay[Relay["BinarySwitch"] = 4] = "BinarySwitch";
            Relay[Relay["OpenCloseValve"] = 5] = "OpenCloseValve";
        })(Relay = Home.Relay || (Home.Relay = {}));
        let Remote;
        (function (Remote) {
            Remote[Remote["AVRemoteControl"] = 1] = "AVRemoteControl";
            Remote[Remote["SimpleRemoteControl"] = 2] = "SimpleRemoteControl";
        })(Remote = Home.Remote || (Home.Remote = {}));
        let AudioVisual;
        (function (AudioVisual) {
            AudioVisual[AudioVisual["AVControlPoint"] = 1] = "AVControlPoint";
            AudioVisual[AudioVisual["SatelliteReceiver"] = 2] = "SatelliteReceiver";
            AudioVisual[AudioVisual["Television"] = 3] = "Television";
            AudioVisual[AudioVisual["SetTopBox"] = 4] = "SetTopBox";
        })(AudioVisual = Home.AudioVisual || (Home.AudioVisual = {}));
        let DoorLock;
        (function (DoorLock) {
            DoorLock[DoorLock["Unknown"] = 1] = "Unknown";
        })(DoorLock = Home.DoorLock || (Home.DoorLock = {}));
        let Doorbell;
        (function (Doorbell) {
            Doorbell[Doorbell["DoorBell"] = 1] = "DoorBell";
            Doorbell[Doorbell["Chime"] = 2] = "Chime";
        })(Doorbell = Home.Doorbell || (Home.Doorbell = {}));
        let Camera;
        (function (Camera) {
            Camera[Camera["Unknown"] = 1] = "Unknown";
        })(Camera = Home.Camera || (Home.Camera = {}));
        let DateTime;
        (function (DateTime) {
            DateTime[DateTime["Timer"] = 1] = "Timer";
        })(DateTime = Home.DateTime || (Home.DateTime = {}));
        let Weather;
        (function (Weather) {
            Weather[Weather["WeatherStation"] = 0] = "WeatherStation";
            Weather[Weather["Temperature"] = 1] = "Temperature";
            Weather[Weather["Humidity"] = 2] = "Humidity";
            Weather[Weather["BarometricPressure"] = 3] = "BarometricPressure";
            Weather[Weather["Wind"] = 4] = "Wind";
            Weather[Weather["Precipitation"] = 5] = "Precipitation";
            Weather[Weather["IlluminationLight"] = 6] = "IlluminationLight";
            Weather[Weather["Lightning"] = 7] = "Lightning";
        })(Weather = Home.Weather || (Home.Weather = {}));
        let HVAC;
        (function (HVAC) {
            HVAC[HVAC["Thermostat"] = 1] = "Thermostat";
            HVAC[HVAC["ResidentialHRV"] = 2] = "ResidentialHRV";
        })(HVAC = Home.HVAC || (Home.HVAC = {}));
        let Display;
        (function (Display) {
            Display[Display["Unknown"] = 1] = "Unknown";
        })(Display = Home.Display || (Home.Display = {}));
        let Gateway;
        (function (Gateway) {
            Gateway[Gateway["Unknown"] = 1] = "Unknown";
        })(Gateway = Home.Gateway || (Home.Gateway = {}));
        let PowerManagement;
        (function (PowerManagement) {
            PowerManagement[PowerManagement["Unknown"] = 1] = "Unknown";
        })(PowerManagement = Home.PowerManagement || (Home.PowerManagement = {}));
        let Appliance;
        (function (Appliance) {
            Appliance[Appliance["Unknown"] = 1] = "Unknown";
        })(Appliance = Home.Appliance || (Home.Appliance = {}));
        let HomeHealth;
        (function (HomeHealth) {
            HomeHealth[HomeHealth["Unknown"] = 1] = "Unknown";
        })(HomeHealth = Home.HomeHealth || (Home.HomeHealth = {}));
        let Barrier;
        (function (Barrier) {
            Barrier[Barrier["Unknown"] = 1] = "Unknown";
        })(Barrier = Home.Barrier || (Home.Barrier = {}));
        let Automotive;
        (function (Automotive) {
            Automotive[Automotive["Tesla"] = 1] = "Tesla";
        })(Automotive = Home.Automotive || (Home.Automotive = {}));
    })(Home = Category_1.Home || (Category_1.Home = {}));
    let Commercial;
    (function (Commercial) {
        let Category;
        (function (Category) {
        })(Category = Commercial.Category || (Commercial.Category = {}));
    })(Commercial = Category_1.Commercial || (Category_1.Commercial = {}));
    let Outdoor;
    (function (Outdoor) {
        let Category;
        (function (Category) {
        })(Category = Outdoor.Category || (Outdoor.Category = {}));
    })(Outdoor = Category_1.Outdoor || (Category_1.Outdoor = {}));
    let Industrial;
    (function (Industrial) {
        let Category;
        (function (Category) {
        })(Category = Industrial.Category || (Industrial.Category = {}));
    })(Industrial = Category_1.Industrial || (Category_1.Industrial = {}));
})(Category || (Category = {}));
//# sourceMappingURL=Categories.js.map