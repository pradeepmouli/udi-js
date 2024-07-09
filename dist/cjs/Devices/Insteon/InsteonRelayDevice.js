"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonRelayDevice = void 0;
const ISYDevice_js_1 = require("../ISYDevice.js");
const InsteonBaseDevice_js_1 = require("./InsteonBaseDevice.js");
require("winston");
class InsteonRelayDevice extends (0, ISYDevice_js_1.ISYUpdateableBinaryStateDevice)(InsteonBaseDevice_js_1.InsteonBaseDevice) {
    constructor(isy, node) {
        super(isy, node);
    }
    async initialize(endpoint) {
        endpoint.events.onOff.onOff$Changed.on((value) => {
            this.updateIsOn(value);
        });
        //endpoint.defaults.onOff.onOff = await this.isOn;
        endpoint.set({ onOff: { onOff: await this.isOn } });
        const that = this;
        this.on("PropertyChanged", (propertyName, newValue, _oldValue, formattedValue) => {
            if (propertyName === "ST") {
                endpoint.set({ onOff: { onOff: newValue > 0 } });
                //endpoint.setSt onOff: newValue });
            }
        });
    }
    get isOn() {
        return super.state;
    }
    set isOn(value) {
        this.updateIsOn(value);
    }
    handlePropertyChange(propertyName, value, formattedValue) {
        return super.handlePropertyChange(propertyName, value, formattedValue);
    }
    async updateIsOn(isOn) {
        if ((await this.isOn).valueOf() !== isOn) {
            this.isOn = true;
            return super.updateState(isOn);
        }
        else {
            return Promise.resolve();
        }
    }
    async sendBeep(level = 100) {
        return super.sendBeep(level);
    }
}
exports.InsteonRelayDevice = InsteonRelayDevice;
