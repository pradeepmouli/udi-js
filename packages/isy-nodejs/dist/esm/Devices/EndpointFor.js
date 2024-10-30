import { Endpoint } from '@project-chip/matter.js/endpoint';
import { BridgedDeviceBasicInformationBehavior, BridgedDeviceBasicInformationServer } from '@project-chip/matter.js/behaviors/bridged-device-basic-information';
export const MatterEndpoint = (base, endpointType) => {
    return class extends base {
        endpointType = endpointType;
        createEndpoint() {
            var p = this.endpointType.with(BridgedDeviceBasicInformationServer);
            const id = this.address.replaceAll(' ', '_').replaceAll('.', ' ');
            return new Endpoint(p, { id: id, address: this.address, bridgedDeviceBasicInformation: {
                    nodeLabel: this.label.rightWithToken(32, ' '),
                    productName: this.productName.rightWithToken(32, ' '),
                    productLabel: this.model.leftWithToken(64, ' '),
                    serialNumber: id,
                    reachable: this.enabled,
                } });
        }
    };
};
// @ts-ignore
const BISY = BridgedDeviceBasicInformationBehavior.alter({ attributes: { address: { optional: false }, ...BridgedDeviceBasicInformationServer.cluster.attributes } });
export class BridgedISYNodeInformationServer extends BridgedDeviceBasicInformationServer {
    async initialize() {
        return super.initialize();
    }
}
(function (BridgedISYNodeInformationServer) {
    class State extends BridgedDeviceBasicInformationServer.State {
    }
    BridgedISYNodeInformationServer.State = State;
})(BridgedISYNodeInformationServer || (BridgedISYNodeInformationServer = {}));
//# sourceMappingURL=EndpointFor.js.map