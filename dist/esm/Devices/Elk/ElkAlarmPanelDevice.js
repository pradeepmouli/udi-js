import { Family } from '../../Definitions/Global/Families.js';
import { ISYNodeDevice } from '../../ISYNode.js';
import { ElkAlarmSensorDevice } from './ElkAlarmSensorDevice.js';
/////////////////////////////
// ELKAlarmPanelDevice
//
export class ELKAlarmPanelDevice extends ISYNodeDevice {
    setFromAreaUpdate(nodes) {
        throw new Error('Method not implemented.');
    }
    alarmTripState;
    alarmState;
    alarmMode;
    area;
    deviceFriendlyName;
    deviceType;
    connectionType;
    batteryOperated;
    voltage;
    constructor(isy, area) {
        super(isy, {
            family: Family.Global, type: '0.0.0.0', enabled: true, address: `ElkAlarmPanel_${area}`, name: `Elk Alarm Panel ${area}`,
            pnode: undefined,
            startDelay: 0,
            hint: '',
            endDelay: 0,
            wattage: 0,
            dcPeriod: 0
        });
        this.area = area;
        this.alarmTripState = AlarmTripState.DISARMED;
        this.alarmState = AlarmState.NOT_READY_TO_ARM;
        this.alarmMode = AlarmMode.DISARMED;
        this.deviceFriendlyName = 'Elk Alarm Panel ' + area;
        this.connectionType = 'Elk Network Module';
        this.batteryOperated = false;
        this.voltage = 71;
        this
            .lastChanged = new Date();
    }
    async sendCommand(command) {
        return this.isy.sendISYCommand(`elk/area/${this.area}/cmd/${command}`);
    }
    async sendSetAlarmModeCommand(alarmMode) {
        if (alarmMode === 'disarm') {
            return this.sendCommand('disarm');
        }
        else {
            return this.sendCommand(`arm?armType=${alarmMode}`);
        }
    }
    async clearAllBypasses() {
        return this.sendCommand('unbypass');
    }
    getAlarmStatusAsText() {
        return `AM [${this.alarmMode}] AS [${this.alarmState}] ATS [${this.alarmTripState}]`;
    }
    getAlarmTripState() {
        return this.alarmTripState;
    }
    getAlarmState() {
        return this.alarmState;
    }
    getAlarmMode() {
        return this.alarmMode;
    }
    handleEvent(event) {
        const areaUpdate = event.eventInfo.ae;
        const areaId = areaUpdate.attr.area;
        const updateType = areaUpdate.attr.type;
        const valueToSet = Number(areaUpdate.attr.val);
        let valueChanged = false;
        if (areaId === this.area) {
            if (updateType === AlarmPanelProperty.AlarmTripState) {
                if (this.alarmTripState !== valueToSet) {
                    const oldVal = this.alarmTripState;
                    this.alarmTripState = valueToSet;
                    this.emit('PropertyChanged', 'alarmTripState', this.alarmTripState, oldVal, AlarmTripState[this.alarmTripState]);
                    valueChanged = true;
                }
            }
            else if (updateType === AlarmPanelProperty.AlarmState) {
                if (this.alarmState !== valueToSet) {
                    const oldVal = this.alarmState;
                    this.alarmState = valueToSet;
                    this.emit('PropertyChanged', 'alarmState', this.alarmState, oldVal, AlarmState[this.alarmState]);
                    valueChanged = true;
                }
            }
            else if (updateType === AlarmPanelProperty.AlarmMode) {
                if (this.alarmMode !== valueToSet) {
                    const oldVal = this.alarmMode;
                    this.alarmMode = valueToSet;
                    this.emit('PropertyChanged', 'alarmMode', this.alarmState, oldVal, AlarmMode[this.alarmMode]);
                    valueChanged = true;
                }
            }
        }
        if (valueChanged) {
            this.lastChanged = new Date();
        }
        return valueChanged;
    }
}
export var AlarmPanelProperty;
(function (AlarmPanelProperty) {
    AlarmPanelProperty[AlarmPanelProperty["AlarmMode"] = 3] = "AlarmMode";
    AlarmPanelProperty[AlarmPanelProperty["AlarmState"] = 2] = "AlarmState";
    AlarmPanelProperty[AlarmPanelProperty["AlarmTripState"] = 1] = "AlarmTripState";
})(AlarmPanelProperty || (AlarmPanelProperty = {}));
export var AlarmMode;
(function (AlarmMode) {
    AlarmMode[AlarmMode["DISARMED"] = 0] = "DISARMED";
    AlarmMode[AlarmMode["AWAY"] = 1] = "AWAY";
    AlarmMode[AlarmMode["STAY"] = 2] = "STAY";
    AlarmMode[AlarmMode["STAY_INSTANT"] = 3] = "STAY_INSTANT";
    AlarmMode[AlarmMode["NIGHT"] = 4] = "NIGHT";
    AlarmMode[AlarmMode["NIGHT_INSTANT"] = 5] = "NIGHT_INSTANT";
    AlarmMode[AlarmMode["VACATION"] = 6] = "VACATION";
})(AlarmMode || (AlarmMode = {}));
export var AlarmTripState;
(function (AlarmTripState) {
    AlarmTripState[AlarmTripState["DISARMED"] = 0] = "DISARMED";
    AlarmTripState[AlarmTripState["EXIT_DELAY"] = 1] = "EXIT_DELAY";
    AlarmTripState[AlarmTripState["TRIPPED"] = 2] = "TRIPPED";
})(AlarmTripState || (AlarmTripState = {}));
export var AlarmState;
(function (AlarmState) {
    AlarmState[AlarmState["NOT_READY_TO_ARM"] = 0] = "NOT_READY_TO_ARM";
    AlarmState[AlarmState["READY_TO_ARM"] = 1] = "READY_TO_ARM";
    AlarmState[AlarmState["READY_TO_ARM_VIOLATION"] = 2] = "READY_TO_ARM_VIOLATION";
    AlarmState[AlarmState["ARMED_WITH_TIMER"] = 3] = "ARMED_WITH_TIMER";
    AlarmState[AlarmState["ARMED_FULLY"] = 4] = "ARMED_FULLY";
    AlarmState[AlarmState["FORCE_ARMED_VIOLATION"] = 5] = "FORCE_ARMED_VIOLATION";
    AlarmState[AlarmState["ARMED_WITH_BYPASS"] = 6] = "ARMED_WITH_BYPASS";
})(AlarmState || (AlarmState = {}));
// Alarm mode constanrs
ELKAlarmPanelDevice.prototype.ALARM_MODE_DISARMED = 0;
ELKAlarmPanelDevice.prototype.ALARM_MODE_AWAY = 1;
ELKAlarmPanelDevice.prototype.ALARM_MODE_STAY = 2;
ELKAlarmPanelDevice.prototype.ALARM_MODE_STAY_INSTANT = 3;
ELKAlarmPanelDevice.prototype.ALARM_MODE_NIGHT = 4;
ELKAlarmPanelDevice.prototype.ALARM_MODE_NIGHT_INSTANT = 5;
ELKAlarmPanelDevice.prototype.ALARM_MODE_VACATION = 6;
// Alarm trip state
ELKAlarmPanelDevice.prototype.ALARM_TRIP_STATE_DISARMED = 0;
ELKAlarmPanelDevice.prototype.ALARM_TRIP_STATE_EXIT_DELAY = 1;
ELKAlarmPanelDevice.prototype.ALARM_TRIP_STATE_TRIPPED = 2;
// Alarm state
ELKAlarmPanelDevice.prototype.ALARM_STATE_NOT_READY_TO_ARM = 0;
ELKAlarmPanelDevice.prototype.ALARM_STATE_READY_TO_ARM = 1;
ELKAlarmPanelDevice.prototype.ALARM_STATE_READY_TO_ARM_VIOLATION = 2;
ELKAlarmPanelDevice.prototype.ALARM_STATE_ARMED_WITH_TIMER = 3;
ELKAlarmPanelDevice.prototype.ALARM_STATE_ARMED_FULLY = 4;
ELKAlarmPanelDevice.prototype.ALARM_STATE_FORCE_ARMED_VIOLATION = 5;
ELKAlarmPanelDevice.prototype.ALARM_STATE_ARMED_WITH_BYPASS = 6;
// Logical Status for sensors
export var AlarmSensorPhysicalState;
(function (AlarmSensorPhysicalState) {
    AlarmSensorPhysicalState[AlarmSensorPhysicalState["NOT_CONFIGURED"] = 0] = "NOT_CONFIGURED";
    AlarmSensorPhysicalState[AlarmSensorPhysicalState["OPEN"] = 1] = "OPEN";
    AlarmSensorPhysicalState[AlarmSensorPhysicalState["EOL"] = 2] = "EOL";
    AlarmSensorPhysicalState[AlarmSensorPhysicalState["SHORT"] = 3] = "SHORT";
})(AlarmSensorPhysicalState || (AlarmSensorPhysicalState = {}));
ElkAlarmSensorDevice.prototype.SENSOR_STATE_PHYSICAL_NOT_CONFIGURED = 0;
ElkAlarmSensorDevice.prototype.SENSOR_STATE_PHYSICAL_OPEN = 1;
ElkAlarmSensorDevice.prototype.SENSOR_STATE_PHYSICAL_EOL = 2;
ElkAlarmSensorDevice.prototype.SENSOR_STATE_PHYSICAL_SHORT = 3;
export var AlarmSensorLogicalState;
(function (AlarmSensorLogicalState) {
    AlarmSensorLogicalState[AlarmSensorLogicalState["NORMAL"] = 0] = "NORMAL";
    AlarmSensorLogicalState[AlarmSensorLogicalState["TROUBLE"] = 1] = "TROUBLE";
    AlarmSensorLogicalState[AlarmSensorLogicalState["VIOLATED"] = 2] = "VIOLATED";
    AlarmSensorLogicalState[AlarmSensorLogicalState["BYPASSED"] = 3] = "BYPASSED";
})(AlarmSensorLogicalState || (AlarmSensorLogicalState = {}));
// Physical status for sensors
ElkAlarmSensorDevice.prototype.SENSOR_STATE_LOGICAL_NORMAL = 0;
ElkAlarmSensorDevice.prototype.SENSOR_STATE_LOGICAL_TROUBLE = 1;
ElkAlarmSensorDevice.prototype.SENSOR_STATE_LOGICAL_VIOLATED = 2;
ElkAlarmSensorDevice.prototype.SENSOR_STATE_LOGICAL_BYPASSED = 3;
