import 'winston';
import { RelayLampSwitch } from './RelayLampSwitch.js';
export class InsteonRelayDevice extends RelayLampSwitch.Node /*InsteonBaseDevice<Driver.Signatures<'ST' | 'OL' | 'RR' | 'ERR'>, Command.Signatures<'DON' | 'DOF'>>*/ {
    // #region Constructors (1)
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
    }
    // #endregion Constructors (1)
    // #region Public Methods (2)
    /*
    public async updateIsOn(isOn: boolean): Promise<any> {
        if (t !== isOn) {
            this.isOn = true;
            return super.updateState(isOn);
        }
        else {
            return Promise.resolve();
        }

    } */
    async sendBeep(level = 100) {
        return super.beep(level);
    }
}
//# sourceMappingURL=InsteonRelayDevice.js.map