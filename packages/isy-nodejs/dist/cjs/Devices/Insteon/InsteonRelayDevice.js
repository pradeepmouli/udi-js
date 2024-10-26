"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonRelayDevice = void 0;
const ISY_js_1 = require("../../ISY.js");
const InsteonBaseDevice_js_1 = require("./InsteonBaseDevice.js");
require("winston");
class InsteonRelayDevice extends InsteonBaseDevice_js_1.InsteonBaseDevice {
    static family = ISY_js_1.Family.Insteon;
    constructor(isy, node) {
        super(isy, node);
    }
    async initialize(endpoint) {
        endpoint.events.onOff.onOff$Changed.on((value) => {
            this.commands.DON(value);
            this.drivers.ST;
        });
        //endpoint.defaults.onOff.onOff = await this.isOn;
        endpoint.set({ onOff: { onOff: await this.drivers.ST.value > 0 } });
        const that = this;
        this.events.on("PropertyChanged", (propertyName, newValue, _oldValue, formattedValue) => {
            if (propertyName === "ST") {
                endpoint.set({ onOff: { onOff: newValue > 0 } });
                //endpoint.setSt onOff: newValue });
            }
        });
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
        return super.sendBeep(level);
    }
}
exports.InsteonRelayDevice = InsteonRelayDevice;
//# sourceMappingURL=InsteonRelayDevice.js.map