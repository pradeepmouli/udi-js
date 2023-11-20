"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonRelayDevice = void 0;
const ISYDevice_1 = require("../ISYDevice");
const InsteonBaseDevice_1 = require("./InsteonBaseDevice");
class InsteonRelayDevice extends (0, ISYDevice_1.ISYUpdateableBinaryStateDevice)(InsteonBaseDevice_1.InsteonBaseDevice) {
    constructor(isy, node) {
        super(isy, node);
    }
    get isOn() {
        return super.state;
    }
    set isOn(value) {
        this.updateIsOn(value);
    }
    async updateIsOn(isOn) {
        if (await this.isOn !== isOn) {
            this.isOn = true;
            return super.updateState(isOn);
        }
        else {
            return Promise.resolve();
        }
    }
}
exports.InsteonRelayDevice = InsteonRelayDevice;
