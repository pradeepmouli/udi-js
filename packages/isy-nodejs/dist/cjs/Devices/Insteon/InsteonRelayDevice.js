"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonRelayDevice = void 0;
require("winston");
const RelayLampSwitch_js_1 = require("./RelayLampSwitch.js");
class InsteonRelayDevice extends RelayLampSwitch_js_1.RelayLampSwitch.Node /*InsteonBaseDevice<Driver.Signatures<'ST' | 'OL' | 'RR' | 'ERR'>, Command.Signatures<'DON' | 'DOF'>>*/ {
    // #region Constructors (1)
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
    }
    // #endregion Constructors (1)
    // #region Public Methods (2)
    async initialize(endpoint) {
        /*endpoint.events.onOff.onOff$Changed.on((value) => {
            this.commands.DON(value);
            this.drivers.ST;
        });
        //endpoint.defaults.onOff.onOff = await this.isOn;
        endpoint.set({ onOff: { onOff: (await this.drivers.ST.value) > 0 } });
        const that = this;

        this.events.on('StatusChanged', (propertyName, newValue, _oldValue, formattedValue) => {
            if (propertyName === 'ST') {
                endpoint.set({ onOff: { onOff: newValue > 0 } });
                //endpoint.setSt onOff: newValue });
            }
        });*/
    }
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
exports.InsteonRelayDevice = InsteonRelayDevice;
//# sourceMappingURL=InsteonRelayDevice.js.map