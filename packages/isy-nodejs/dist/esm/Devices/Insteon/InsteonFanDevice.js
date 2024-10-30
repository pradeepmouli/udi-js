import { InsteonBaseDevice } from './InsteonBaseDevice.js';
import { InsteonDimmableDevice } from './InsteonDimmableDevice.js';
import 'winston';
import { Driver, UnitOfMeasure } from '../../Definitions/index.js';
export class InsteonFanMotorDevice extends InsteonBaseDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        this.drivers.ST = Driver.create('ST', this, deviceNode.property, { uom: UnitOfMeasure.Percent, label: 'Fan Speed (%)', name: 'fanSpeed' });
        this.hidden = true;
    }
    get isOn() {
        return this.drivers.ST.value !== 0;
    }
    get fanSpeed() {
        return this.drivers.ST.value;
    }
    async updateFanSpeed(level) {
        return (level);
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
export class InsteonFanDevice extends InsteonBaseDevice {
    light;
    motor;
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        this.light = new InsteonDimmableDevice(isy, deviceNode);
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
            this.motor.events.on('statusChanged', ((a, b, c, d) => { this.emit('PropertyChanged', `motor.${a}`, b, c, d); }).bind(this));
        }
    }
    async updateFanSpeed(level) {
        return this.motor.updateFanSpeed(level);
    }
}
//# sourceMappingURL=InsteonFanDevice.js.map