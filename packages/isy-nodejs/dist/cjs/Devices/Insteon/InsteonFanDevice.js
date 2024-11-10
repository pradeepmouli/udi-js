"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonFanDevice = exports.InsteonFanMotorDevice = void 0;
const InsteonBaseDevice_js_1 = require("./InsteonBaseDevice.js");
const InsteonDimmableDevice_js_1 = require("./InsteonDimmableDevice.js");
require("winston");
const index_js_1 = require("../../Definitions/index.js");
class InsteonFanMotorDevice extends InsteonBaseDevice_js_1.InsteonBaseDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        this.drivers.ST = index_js_1.Driver.create('ST', this, deviceNode.property, { uom: index_js_1.UnitOfMeasure.Percent, label: 'Fan Speed (%)', name: 'fanSpeed' });
        this.hidden = true;
    }
    get isOn() {
        return this.drivers.ST.value !== 0;
    }
    get fanSpeed() {
        return this.drivers.ST.value;
    }
    async updateFanSpeed(level) {
        return level;
    }
    async updateIsOn(isOn) {
        if (!isOn) {
            //return this.commands.BEEP(States.Level.Min);
        }
        else {
            //return this.commands.BEEP(States.Level.Max);
        }
    }
}
exports.InsteonFanMotorDevice = InsteonFanMotorDevice;
class InsteonFanDevice extends InsteonBaseDevice_js_1.InsteonBaseDevice {
    light;
    motor;
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        this.light = new InsteonDimmableDevice_js_1.InsteonDimmableDevice(isy, deviceNode);
        /*this.light.events.on('PropertyChanged', ((a: any, b: any, c: any, d: string) => { this.emit('PropertyChanged', `light.${a}`, b, c, d); }).bind(this));*/
        this.addChild(this.light);
    }
    handleEvent(event) {
        this.logger(JSON.stringify(event));
        const child = this.children.find((p) => p.address === event.node);
        if (child !== undefined) {
            return child.handleEvent(event);
        }
        return false;
    }
    addChild(childDevice) {
        super.addChild(childDevice);
        if (childDevice instanceof InsteonFanMotorDevice) {
            this.logger('Fan Motor Found');
            this.motor = childDevice;
            this.motor.events.on('statusChanged', ((a, b, c, d) => {
                this.emit('propertyChanged', `motor.${a}`, b, c, d);
            }).bind(this));
        }
    }
    async updateFanSpeed(level) {
        return this.motor.updateFanSpeed(level);
    }
}
exports.InsteonFanDevice = InsteonFanDevice;
//# sourceMappingURL=InsteonFanDevice.js.map