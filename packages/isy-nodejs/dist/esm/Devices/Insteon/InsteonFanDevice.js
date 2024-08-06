import { States } from '../../ISYConstants.js';
import { ISYUpdateableBinaryStateDevice, ISYUpdateableLevelDevice } from '../ISYDevice.js';
import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import { InsteonDimmableDevice } from './InsteonDimmableDevice.js';
import 'winston';
export class InsteonFanMotorDevice extends ISYUpdateableLevelDevice(ISYUpdateableBinaryStateDevice(InsteonBaseDevice)) {
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
            return this.updateLevel(States.Level.Min);
        }
        else {
            return this.updateLevel(States.Level.Max);
        }
    }
}
export class InsteonFanDevice extends InsteonBaseDevice {
    light;
    motor;
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        this.light = new InsteonDimmableDevice(isy, deviceNode);
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
            this.motor.updateLevel(States.Level.Min);
        }
        else {
            this.motor.updateLevel(States.Fan.High);
        }
    }
}
//# sourceMappingURL=InsteonFanDevice.js.map