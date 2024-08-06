import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';
export const InsteonLampDevice = (IB) => (class extends IB {
    constructor(...args) {
        super(args[0], args[1]);
        this.isDimmable = true;
    }
});
// tslint:disable-next-line: variable-name
export const InsteonSwitchDevice = (IB) => (class extends IB {
    constructor(...args) {
        super(args[0], args[1]);
        this.isDimmable = true;
    }
});
export const KeypadDevice = (IB) => (class extends IB {
    addChild(childDevice) {
        super.addChild(childDevice);
    }
});
export class InsteonOutletDevice extends InsteonRelayDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
//# sourceMappingURL=InsteonDevice.js.map