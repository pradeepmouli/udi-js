"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BridgedISYNodeInformationServer = exports.MatterEndpoint = void 0;
const endpoint_1 = require("@project-chip/matter.js/endpoint");
const bridged_device_basic_information_1 = require("@project-chip/matter.js/behaviors/bridged-device-basic-information");
const MatterEndpoint = (base, endpointType) => {
    return class extends base {
        endpointType = endpointType;
        createEndpoint() {
            var p = this.endpointType.with(bridged_device_basic_information_1.BridgedDeviceBasicInformationServer);
            const id = this.address.replaceAll(' ', '_').replaceAll('.', ' ');
            return new endpoint_1.Endpoint(p, { id: id, address: this.address, bridgedDeviceBasicInformation: {
                    nodeLabel: this.label.rightWithToken(32, ' '),
                    productName: this.productName.rightWithToken(32, ' '),
                    productLabel: this.model.leftWithToken(64, ' '),
                    serialNumber: id,
                    reachable: this.enabled,
                } });
        }
    };
};
exports.MatterEndpoint = MatterEndpoint;
// @ts-ignore
const BISY = bridged_device_basic_information_1.BridgedDeviceBasicInformationBehavior.alter({ attributes: { address: { optional: false }, ...bridged_device_basic_information_1.BridgedDeviceBasicInformationServer.cluster.attributes } });
class BridgedISYNodeInformationServer extends bridged_device_basic_information_1.BridgedDeviceBasicInformationServer {
    async initialize() {
        return super.initialize();
    }
}
exports.BridgedISYNodeInformationServer = BridgedISYNodeInformationServer;
(function (BridgedISYNodeInformationServer) {
    class State extends bridged_device_basic_information_1.BridgedDeviceBasicInformationServer.State {
    }
    BridgedISYNodeInformationServer.State = State;
})(BridgedISYNodeInformationServer || (exports.BridgedISYNodeInformationServer = BridgedISYNodeInformationServer = {}));
//# sourceMappingURL=EndpointFor.js.map