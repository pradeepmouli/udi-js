import { BridgedDeviceBasicInformationServer } from "@project-chip/matter.js/behaviors/bridged-device-basic-information";
import { ISY } from '../../ISY.js';
export function ISYClusterBehavior(base, p) {
    return class extends base {
        _device;
        async initialize(_options) {
            await super.initialize(_options);
            var address = this.agent.get(BridgedDeviceBasicInformationServer).state.uniqueId;
            this.
                _device = ISY.instance.getDevice(address);
            ISY.instance.logger.debug(`Initializing ${this.constructor.name} for ${this._device.constructor.name} ${this._device} with address ${address}`);
            if (this._device) {
                this._device.on("PropertyChanged", this.handlePropertyChange.bind(this));
            }
        }
        async [Symbol.asyncDispose]() {
            this._device.removeListener('PropertyChanged', this.handlePropertyChange.bind(this));
        }
        get device() {
            return this._device = this._device ?? ISY.instance.getDevice(this.agent.get(BridgedDeviceBasicInformationServer).state.uniqueId);
        }
        handlePropertyChange(propertyName, value, newValue, formattedValue) {
        }
    };
} //@ts-ignore
