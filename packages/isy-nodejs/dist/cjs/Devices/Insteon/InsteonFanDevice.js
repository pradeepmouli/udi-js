"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonFanDevice = exports.InsteonFanMotorDevice = void 0;
const ISYConstants_js_1 = require("../../ISYConstants.js");
const ISYDevice_js_1 = require("../ISYDevice.js");
const InsteonBaseDevice_js_1 = require("./InsteonBaseDevice.js");
const InsteonDimmableDevice_js_1 = require("./InsteonDimmableDevice.js");
require("winston");
class InsteonFanMotorDevice extends (0, ISYDevice_js_1.ISYUpdateableLevelDevice)((0, ISYDevice_js_1.ISYUpdateableBinaryStateDevice)(InsteonBaseDevice_js_1.InsteonBaseDevice)) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        this.hidden = true;
    }
    get isOn() {
        return this.state;
    }
    get fanSpeed() {
        return this.level;
    }
    async updateFanSpeed(level) {
        return this.updateLevel(level);
    }
    async updateIsOn(isOn) {
        if (!isOn) {
            return this.updateLevel(ISYConstants_js_1.States.Level.Min);
        }
        else {
            return this.updateLevel(ISYConstants_js_1.States.Level.Max);
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
        this.light.on('PropertyChanged', ((a, b, c, d) => { this.emit('PropertyChanged', `light.${a}`, b, c, d); }).bind(this));
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
            this.motor.on('PropertyChanged', ((a, b, c, d) => { this.emit('PropertyChanged', `motor.${a}`, b, c, d); }).bind(this));
        }
    }
    async updateFanSpeed(level) {
        return this.motor.updateLevel(level);
    }
    async updatFanIsOn(isOn) {
        if (!this.motor.isOn) {
            this.motor.updateLevel(ISYConstants_js_1.States.Level.Min);
        }
        else {
            this.motor.updateLevel(ISYConstants_js_1.States.Fan.High);
        }
    }
}
exports.InsteonFanDevice = InsteonFanDevice;
//# sourceMappingURL=InsteonFanDevice.js.map