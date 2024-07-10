"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISYOnOffBehavior = void 0;
const InsteonRelayDevice_js_1 = require("../../Devices/Insteon/InsteonRelayDevice.js");
const OnOffLightDevice_1 = require("@project-chip/matter.js/devices/OnOffLightDevice");
const ISYClusterBehavior_js_1 = require("./ISYClusterBehavior.js");
class ISYOnOffBehavior extends (0, ISYClusterBehavior_js_1.ISYClusterBehavior)(OnOffLightDevice_1.OnOffLightRequirements.OnOffServer, InsteonRelayDevice_js_1.InsteonRelayDevice) {
    async initialize(_options) {
        await super.initialize(_options);
        this.state.onOff = await this.device.isOn;
    }
    async on() {
        // await super.on();
        return this.device.updateIsOn(true);
    }
    async off() {
        //await super.off();
        return this.device.updateIsOn(false);
    }
    async toggle() {
        return await this.device.updateIsOn(!this.device.isOn);
    }
    handlePropertyChange(propertyName, value, newValue, formattedValue) {
        if (propertyName === 'ST') {
            this.state.onOff = newValue > 0;
            //this.events.onOff$Changed.emit(newValue, value, this.context);
        }
    }
}
exports.ISYOnOffBehavior = ISYOnOffBehavior;
