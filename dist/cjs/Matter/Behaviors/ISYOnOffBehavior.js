"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISYOnOffBehavior = void 0;
const InsteonRelayDevice_js_1 = require("../../Devices/Insteon/InsteonRelayDevice.js");
const OnOffLightDevice_1 = require("@project-chip/matter.js/devices/OnOffLightDevice");
const ISYClusterBehavior_js_1 = require("./ISYClusterBehavior.js");
class ISYOnOffBehavior extends (0, ISYClusterBehavior_js_1.ISYClusterBehavior)(OnOffLightDevice_1.OnOffLightRequirements.OnOffServer, InsteonRelayDevice_js_1.InsteonRelayDevice) {
    async initialize(_options) {
        await super.initialize(_options);
        this.state.onOff = await this.device.state;
    }
    async on() {
        // await super.on();
        this.device.state = true;
    }
    async off() {
        //await super.off();
        this.device.state = false;
    }
    async toggle() {
        this.device.state = !(await this.device.state);
    }
    handlePropertyChange({ driver, newValue, oldValue, formattedValue }) {
        if (driver === 'ST') {
            //this.asAdmin(() => this.state.onOff = newValue > 0);
            //this.endpoint.set({values: {onOff: newValue > 0}});
            // super.on()
            this.state.onOff = newValue > 0;
            //this.events.onOff$Changed.emit(newValue, value, this.context);
        }
    }
}
exports.ISYOnOffBehavior = ISYOnOffBehavior;
