import { Commands, States } from '../ISYConstants.js';
import { Endpoint } from '@project-chip/matter.js/endpoint';
import { BridgedDeviceBasicInformationServer } from '@project-chip/matter.js/behaviors/bridged-device-basic-information';
import 'winston';
export const ISYBinaryStateDevice = (Base) => {
    return class extends Base {
        get state() {
            return Promise.resolve(this.local['ST'] > 0);
            //return this.readProperty('ST').then(p => p.value  > 0);
        }
    };
};
export const ISYUpdateableBinaryStateDevice = (Base) => {
    return class extends Base {
        get state() {
            return Promise.resolve(this.local['ST'] > 0);
            //return this.readProperty('ST').then(p => p.value  > 0);
        }
        async updateState(state) {
            if (state !== await this.state || this.pending.ST > 0 !== await this.state) {
                this.pending.ST = state ? States.On : States.Off;
                return this.sendCommand(state ? Commands.On : Commands.Off).then((p) => {
                    //this.local.ST = this.pending.ST;
                    this.pending.ST = null;
                });
            }
            return Promise.resolve();
        }
    };
};
export const MatterEndpoint = (base, endpointType) => {
    return class extends base {
        baseBehavior = endpointType;
        createEndpoint() {
            var p = this.baseBehavior.with(BridgedDeviceBasicInformationServer);
            return new Endpoint(this.baseBehavior.with(BridgedDeviceBasicInformationServer), { id: this.address, bridgedDeviceBasicInformation: {
                    nodeLabel: this.displayName,
                    productName: this.productName,
                    productLabel: this.productName,
                    serialNumber: `${this.address}`,
                    reachable: this.enabled,
                } });
        }
    };
};
export const ISYLevelDevice = (base) => class extends base {
    get level() {
        return this.local.ST;
    }
};
// tslint:disable-next-line: variable-name
export const ISYUpdateableLevelDevice = (base) => class extends base {
    get level() {
        return this.local.ST;
    }
    async updateLevel(level) {
        if (level != this.local.ST && level !== (this.pending.ST ?? this.local.ST)) {
            this.pending.ST = level;
            if (level > 0) {
                return this.sendCommand(Commands.On, this.convertTo(level, this.uom.ST)).then((p) => {
                    //this.local.ST = this.pending.ST; *Wait to receive propertu update from subscription
                    this.pending.ST = null;
                });
            }
            else {
                return this.sendCommand(Commands.Off).then((p) => {
                    //this.local.ST = this.pending.ST; *Wait to receive propertu update from subscription
                    this.pending.ST = null;
                });
            }
        }
        return Promise.resolve();
    }
};
