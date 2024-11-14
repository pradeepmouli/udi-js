"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElkAlarmSensorDevice = void 0;
const Families_js_1 = require("../../Definitions/Global/Families.js");
const ISYDeviceNode_js_1 = require("../ISYDeviceNode.js");
const ElkAlarmPanelDevice_js_1 = require("./ElkAlarmPanelDevice.js");
/////////////////////////////
// ELKAlarmSensor
//
class ElkAlarmSensorDevice extends ISYDeviceNode_js_1.ISYDeviceNode {
    area;
    zone;
    deviceFriendlyName;
    deviceType;
    connectionType;
    batteryOperated;
    physicalState;
    logicalState;
    voltage;
    constructor(isy, name, area, zone) {
        super(isy, {
            family: Families_js_1.Family.Global,
            name,
            address: `ElkZone_${zone}`,
            enabled: true,
            pnode: undefined,
            startDelay: 0,
            hint: '',
            endDelay: 0,
            wattage: 0,
            dcPeriod: 0
        });
        this.area = area;
        this.zone = zone;
        // this.name = name;
        // this.address = "ElkZone" + zone;
        this.label = `Elk Connected Sensor ${zone}`;
        this.deviceFriendlyName = `Elk Connected Sensor ${zone}`;
        this.connectionType = 'Elk Network';
        this.batteryOperated = false;
        this.physicalState = ElkAlarmPanelDevice_js_1.AlarmSensorPhysicalState.NOT_CONFIGURED;
        this.logicalState = ElkAlarmPanelDevice_js_1.AlarmSensorLogicalState.NORMAL;
        this.lastChanged = new Date();
    }
    async sendCommand(command) {
        return this.isy.sendISYCommand(`elk/zone/${this.zone}/cmd/${command}`);
    }
    async sendBypassToggleCommand() {
        return this.sendCommand(`toggle/bypass`);
    }
    getPhysicalState() {
        return this.physicalState;
    }
    isBypassed() {
        return this.logicalState === 3;
    }
    getLogicalState() {
        return this.logicalState;
    }
    getCurrentDoorWindowState() {
        return this.physicalState === this.SENSOR_STATE_PHYSICAL_OPEN || this.logicalState === this.SENSOR_STATE_LOGICAL_VIOLATED;
    }
    getSensorStatus() {
        return 'PS [' + this.physicalState + '] LS [' + this.logicatState + ']';
    }
    isPresent() {
        if (this.voltage < 65 || this.voltage > 80) {
            return true;
        }
        else {
            return false;
        }
    }
    handleEvent(event) {
        const zoneUpdate = event.eventInfo.ze;
        const zone = zoneUpdate.attr.zone;
        const updateType = zoneUpdate.attr.type;
        const valueToSet = zoneUpdate.attr.val;
        let valueChanged = false;
        if (zone === this.zone) {
            if (updateType === 51) {
                if (this.logicalState !== valueToSet) {
                    const temp = this.logicalState;
                    this.logicalState = valueToSet;
                    this.emit('propertyChanged', 'logicalState', this.logicalState, temp, this.voltage.toString());
                    // Not triggering change update on logical state because physical always follows and don't want double notify.
                    // valueChanged = true;
                }
            }
            else if (updateType === 52) {
                if (this.physicalState !== valueToSet) {
                    const temp = this.physicalState;
                    this.physicalState = valueToSet;
                    this.emit('propertyChanged', 'physicalState', this.physicalState, temp, this.voltage.toString());
                    valueChanged = true;
                }
            }
            else if (updateType === 53) {
                if (this.voltage !== valueToSet) {
                    const temp = this.voltage;
                    this.voltage = valueToSet;
                    this.emit('propertyChanged', 'voltage', this.voltage, temp, this.voltage.toString());
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
exports.ElkAlarmSensorDevice = ElkAlarmSensorDevice;
//# sourceMappingURL=ElkAlarmSensorDevice.js.map