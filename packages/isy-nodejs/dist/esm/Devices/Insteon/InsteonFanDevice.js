import 'winston';
import { CompositeDevice } from '../CompositeDevice.js';
import { DimmerLamp } from './Generated/DimmerLamp.js';
import { FanLincMotor } from './Generated/FanLincMotor.js';
export class FanDevice extends CompositeDevice.of({ light: DimmerLamp, motor: FanLincMotor }, { light: 1, motor: 2 }) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
        /*this.light.events.on('PropertyChanged', ((a: any, b: any, c: any, d: string) => { this.emit('PropertyChanged', `light.${a}`, b, c, d); }).bind(this));*/
    }
}
export var Fan;
(function (Fan) {
    Fan.Device = FanDevice;
    Fan.Class = FanDevice;
    Fan.Motor = FanLincMotor;
    Fan.Light = DimmerLamp;
})(Fan || (Fan = {}));
//# sourceMappingURL=InsteonFanDevice.js.map