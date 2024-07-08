"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgedISYNodeInformationServer = exports.ISYOnOffBehavior = exports.ISYClusterBehavior = exports.MatterEndpoint = void 0;
const endpoint_1 = require("@project-chip/matter.js/endpoint");
const bridged_device_basic_information_1 = require("@project-chip/matter.js/behaviors/bridged-device-basic-information");
const ISY_js_1 = require("../ISY.js");
const OnOffLightDevice_1 = require("@project-chip/matter.js/devices/OnOffLightDevice");
const MatterEndpoint = (base, endpointType) => {
    return class extends base {
        endpointType = endpointType;
        createEndpoint() {
            var p = this.endpointType.with(bridged_device_basic_information_1.BridgedDeviceBasicInformationServer);
            const id = this.address.replaceAll(' ', '_').replaceAll('.', ' ');
            return new endpoint_1.Endpoint(p, { id: id, address: this.address, bridgedDeviceBasicInformation: {
                    nodeLabel: this.displayName.rightWithToken(32, ' '),
                    productName: this.productName.rightWithToken(32, ' '),
                    productLabel: this.model.leftWithToken(64, ' '),
                    serialNumber: id,
                    reachable: this.enabled,
                } });
        }
    };
};
exports.MatterEndpoint = MatterEndpoint;
const ISYClusterBehavior = (base, t) => {
    return class extends base {
        device;
        initialize(_options) {
            super.initialize(_options);
            var address = this.agent.endpoint.stateOf(bridged_device_basic_information_1.BridgedDeviceBasicInformationServer).uniqueId;
            this.device = ISY_js_1.ISY.instance.getDevice(address);
            if (this.device) {
                this.device.on("PropertyChanged", (propertyName, newValue, _oldValue, formattedValue) => this.handlePropertyChange(propertyName, newValue, _oldValue, formattedValue));
            }
        }
        handlePropertyChange(propertyName, value, newValue, formattedValue) {
        }
    };
};
exports.ISYClusterBehavior = ISYClusterBehavior;
//@ts-ignore
const ISYAOnOffBehavior = (0, exports.ISYClusterBehavior)(OnOffLightDevice_1.OnOffLightRequirements.OnOffServer, ISY_js_1.InsteonRelayDevice.prototype);
class ISYOnOffBehavior extends (0, exports.ISYClusterBehavior)(OnOffLightDevice_1.OnOffLightRequirements.OnOffServer, ISY_js_1.InsteonRelayDevice.prototype) {
    async on() {
        await super.on();
        return super.device.updateIsOn(true);
    }
    async off() {
        await super.off();
        return this.device.updateIsOn(false);
    }
    async toggle() {
        return await this.device.updateIsOn(!this.device.isOn);
    }
    handlePropertyChange(propertyName, value, newValue, formattedValue) {
        this.state.onOff = newValue > 0;
        this.events.onOff$Changed.emit(newValue, value, this.context);
    }
}
exports.ISYOnOffBehavior = ISYOnOffBehavior;
class BridgedISYNodeInformationServer extends bridged_device_basic_information_1.BridgedDeviceBasicInformationServer {
    initialize() {
        return super.initialize();
    }
}
exports.BridgedISYNodeInformationServer = BridgedISYNodeInformationServer;
