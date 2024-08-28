import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';
export const InsteonLampDevice = (IB) => (class extends IB {
    constructor(...args) {
        super(args[0], args[1]);
        this.isDimmable = true;
    }
});
// tslint:disable-next-line: variable-name
export const KeypadDevice = (IB) => (class extends IB {
});
export class InsteonOutletDevice extends InsteonRelayDevice {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
//# sourceMappingURL=InsteonDevice.js.map