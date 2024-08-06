import { KeypadDevice } from './InsteonDevice.js';
import { InsteonDimmableDevice } from './InsteonDimmableDevice.js';
import 'winston';
export class InsteonKeypadDimmerDevice extends KeypadDevice(InsteonDimmableDevice) {
    constructor(isy, deviceNode) {
        super(isy, deviceNode);
    }
}
//# sourceMappingURL=InsteonKeypadDimmerDevice.js.map