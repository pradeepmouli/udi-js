import 'winston';
import { CompositeDevice } from '../CompositeDevice.js';
import { DimmerLamp } from './Generated/DimmerLamp.js';
import { FanLincMotor } from './Generated/FanLincMotor.js';
export class InsteonFanMotorDevice extends FanLincMotor.Node {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        //*this.drivers. == Driver.create('ST', this, deviceNode.property as DriverState, { uom: UnitOfMeasure.Percent, label: 'Fan Speed (%)', name: 'fanSpeed' });
        this.hidden = true;
    }
    get isOn() {
        return this.status !== 0;
    }
    get fanSpeed() {
        return this.status;
    }
    async updateFanSpeed(level) {
        return this.on(level);
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
export class FanDevice extends CompositeDevice.of({ light: DimmerLamp.Node, motor: FanLincMotor.Node }, { light: 1, motor: 2 }) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        /*this.light.events.on('PropertyChanged', ((a: any, b: any, c: any, d: string) => { this.emit('PropertyChanged', `light.${a}`, b, c, d); }).bind(this));*/
    }
}
export var Fan;
(function (Fan) {
    Fan.Device = FanDevice;
    Fan.Motor = FanLincMotor;
    Fan.Light = DimmerLamp;
})(Fan || (Fan = {}));
//# sourceMappingURL=InsteonFanDevice.js.map