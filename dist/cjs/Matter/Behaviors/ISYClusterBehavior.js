"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISYClusterBehavior = ISYClusterBehavior;
const bridged_device_basic_information_1 = require("@project-chip/matter.js/behaviors/bridged-device-basic-information");
const ISY_js_1 = require("../../ISY.js");
function ISYClusterBehavior(base, p) {
    return class extends base {
        _device;
        async initialize(_options) {
            await super.initialize(_options);
            var address = this.agent.get(bridged_device_basic_information_1.BridgedDeviceBasicInformationServer).state.uniqueId;
            this.
                _device = ISY_js_1.ISY.instance.getDevice(address);
            ISY_js_1.ISY.instance.logger.debug(`Initializing ${this.constructor.name} for ISY Device ${this._device} with address ${address}`);
            if (this._device) {
                this._device.on("PropertyChanged", this.handlePropertyChange.bind(this));
            }
        }
        async [Symbol.asyncDispose]() {
            this._device.removeListener('PropertyChanged', this.handlePropertyChange.bind(this));
        }
        get device() {
            return this._device = this._device ?? ISY_js_1.ISY.instance.getDevice(this.agent.get(bridged_device_basic_information_1.BridgedDeviceBasicInformationServer).state.uniqueId);
        }
        handlePropertyChange(propertyName, value, newValue, formattedValue) {
        }
    };
} //@ts-ignore
