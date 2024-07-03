"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISYUpdateableLevelDevice = exports.ISYLevelDevice = exports.MatterEndpoint = exports.ISYUpdateableBinaryStateDevice = exports.ISYBinaryStateDevice = void 0;
const ISYConstants_js_1 = require("../ISYConstants.js");
const endpoint_1 = require("@project-chip/matter.js/endpoint");
const bridged_device_basic_information_1 = require("@project-chip/matter.js/behaviors/bridged-device-basic-information");
require("winston");
const ISYBinaryStateDevice = (Base) => {
    return class extends Base {
        get state() {
            return Promise.resolve(this.local['ST'] > 0);
            //return this.readProperty('ST').then(p => p.value  > 0);
        }
    };
};
exports.ISYBinaryStateDevice = ISYBinaryStateDevice;
const ISYUpdateableBinaryStateDevice = (Base) => {
    return class extends Base {
        get state() {
            return Promise.resolve(this.local['ST'] > 0);
            //return this.readProperty('ST').then(p => p.value  > 0);
        }
        async updateState(state) {
            if (state !== await this.state || this.pending.ST > 0 !== await this.state) {
                this.pending.ST = state ? ISYConstants_js_1.States.On : ISYConstants_js_1.States.Off;
                return this.sendCommand(state ? ISYConstants_js_1.Commands.On : ISYConstants_js_1.Commands.Off).then((p) => {
                    //this.local.ST = this.pending.ST;
                    this.pending.ST = null;
                });
            }
            return Promise.resolve();
        }
    };
};
exports.ISYUpdateableBinaryStateDevice = ISYUpdateableBinaryStateDevice;
const MatterEndpoint = (base, endpointType) => {
    return class extends base {
        baseBehavior = endpointType;
        createEndpoint() {
            var p = this.baseBehavior.with(bridged_device_basic_information_1.BridgedDeviceBasicInformationServer);
            return new endpoint_1.Endpoint(this.baseBehavior.with(bridged_device_basic_information_1.BridgedDeviceBasicInformationServer), { id: this.address, bridgedDeviceBasicInformation: {
                    nodeLabel: this.displayName,
                    productName: this.productName,
                    productLabel: this.productName,
                    serialNumber: `${this.address}`,
                    reachable: this.enabled,
                } });
        }
    };
};
exports.MatterEndpoint = MatterEndpoint;
const ISYLevelDevice = (base) => class extends base {
    get level() {
        return this.local.ST;
    }
};
exports.ISYLevelDevice = ISYLevelDevice;
// tslint:disable-next-line: variable-name
const ISYUpdateableLevelDevice = (base) => class extends base {
    get level() {
        return this.local.ST;
    }
    async updateLevel(level) {
        if (level != this.local.ST && level !== (this.pending.ST ?? this.local.ST)) {
            this.pending.ST = level;
            if (level > 0) {
                return this.sendCommand(ISYConstants_js_1.Commands.On, this.convertTo(level, this.uom.ST)).then((p) => {
                    //this.local.ST = this.pending.ST; *Wait to receive propertu update from subscription
                    this.pending.ST = null;
                });
            }
            else {
                return this.sendCommand(ISYConstants_js_1.Commands.Off).then((p) => {
                    //this.local.ST = this.pending.ST; *Wait to receive propertu update from subscription
                    this.pending.ST = null;
                });
            }
        }
        return Promise.resolve();
    }
};
exports.ISYUpdateableLevelDevice = ISYUpdateableLevelDevice;
