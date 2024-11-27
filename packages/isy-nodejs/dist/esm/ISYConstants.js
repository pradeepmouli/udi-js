const ISYConstants = {
    States: {
        Off: 0,
        On: 100,
        Lock: {
            Locked: 100,
            Unlocked: 0
        },
        SecureLock: {
            Secured: 1,
            NotSecured: 0
        },
        DoorWindow: {
            Closed: 0,
            Open: 100 // 255
        },
        Siren: {},
        Sensor: {
            Triggered: 100,
            NotTriggered: 0
        },
        Level: {
            Min: 0,
            Max: 100
        },
        LeakSensor: {
            Dry: 0,
            Wet: 100,
            Heartbeat: 'hb'
        },
        Fan: {
            Low: 25, // 63,
            Medium: 75, // 191,
            High: 100 // 255
        },
        Climate: {
            FanMode: {
                On: 7,
                Auto: 8
            },
            Mode: {
                Off: 0,
                Heat: 1,
                Cool: 2,
                Auto: 3,
                Fan: 4,
                ProgramAuto: 5,
                ProgramHeat: 6,
                ProgramCool: 7
            },
            ScheduleMode: {
                Hold: 0,
                Run: 1,
                Away: 2
            },
            OperatingMode: {
                Idle: 0,
                Heating: 1,
                Cooling: 2
            },
            UnitOfMeasure: {
                Celcius: 1,
                Fahrenheit: 2
            }
        }
    },
    Cmds: {
        On: 'DON',
        Off: 'DOF',
        Dimmable: {
            FastOn: 'DFON',
            FastOff: 'DFOF',
            Brighten: 'BRT',
            Dim: 'DIM',
            FadeUp: 'FDUP',
            FadeDown: 'FDDOWN',
            FadeStop: 'FDSTOP'
        },
        Lock: {
            Lock: 'DON',
            Unlock: 'DOF'
        },
        Thermostat: {
            SetpointUp: 'BRT',
            SetpointDown: 'DIM'
        },
        Query: 'ST'
    },
    Props: {
        Status: 'ST',
        RampRate: 'RR',
        OnLevel: 'OL',
        BatteryLevel: 'BATLVL',
        SecureLock: {
            Mode: 'SECMD'
        },
        ZWave: {
            LockAlarm: 'ALARM',
            LockAccess: 'USRNUM',
            LockStatus: 'ST',
            EnergyPowerFactor: 'PF',
            EnergyPowerPolarizedPower: 'PPW',
            EnergyPowerCurrent: 'CC',
            EnergyPowerTotalPower: 'TPW',
            EnergyPowerVoltage: 'CV'
        },
        Climate: {
            Temperature: 'CLITEMP',
            Humidity: 'CLIHUM',
            OperatingMode: 'CLIHCS',
            Mode: 'CLIMD',
            FanMode: 'CLIFS',
            FanState: 'CLIFRS',
            CoolSetPoint: 'CLISPC',
            HeatSetPoint: 'CLISPH',
            ScheduleMode: 'CLISMD',
            EnergyMode: 'CLIEMD',
        },
        Error: 'ERR',
        UnitOfMeasure: 'UOM'
    },
    deviceTypes: {
        lock: 'Lock',
        secureLock: 'SecureLock',
        light: 'Light',
        dimmableLight: 'DimmableLight',
        outlet: 'Outlet',
        fan: 'Fan',
        unknown: 'Unknown',
        doorWindowSensor: 'DoorWindowSensor',
        alarmDoorWindowSensor: 'AlarmDoorWindowSensor',
        coSensor: 'CoSensor',
        alarmPanel: 'AlarmPanel',
        motionSensor: 'MotionSensor',
        leakSensor: 'LeakSensor',
        remote: 'Remote',
        scene: 'Scene',
        thermostat: 'Thermostat',
        polyNode: 'PolyNode'
    },
};
export var VariableType;
(function (VariableType) {
    VariableType[VariableType["Integer"] = 1] = "Integer";
    VariableType[VariableType["State"] = 2] = "State";
})(VariableType || (VariableType = {}));
export var NodeType;
(function (NodeType) {
    NodeType[NodeType["Device"] = 1] = "Device";
    NodeType[NodeType["Scene"] = 2] = "Scene";
    NodeType[NodeType["Folder"] = 3] = "Folder";
    NodeType[NodeType["X10A10"] = 4] = "X10A10";
})(NodeType || (NodeType = {}));
export var LinkType;
(function (LinkType) {
    LinkType[LinkType["Controller"] = 16] = "Controller";
    LinkType[LinkType["Responder"] = 0] = "Responder";
})(LinkType || (LinkType = {}));
//# sourceMappingURL=ISYConstants.js.map