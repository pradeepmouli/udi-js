import 'winston';
import { RelayLampSwitch } from './Generated/RelayLampSwitch.js';
export class InsteonRelayDevice extends RelayLampSwitch.Node /*InsteonBaseDevice<Driver.Signatures<'ST' | 'OL' | 'RR' | 'ERR'>, Command.Signatures<'DON' | 'DOF'>>*/ {
    // #region Constructors (1)
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
    }
}
//# sourceMappingURL=InsteonRelayDevice.js.map