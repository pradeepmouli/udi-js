import { InsteonSwitchDevice } from './InsteonDevice.js';
import { InsteonRelayDevice } from './InsteonRelayDevice.js';
import 'winston';
export class InsteonRelaySwitchDevice extends InsteonSwitchDevice(InsteonRelayDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
//# sourceMappingURL=InsteonRelaySwitchDevice.js.map