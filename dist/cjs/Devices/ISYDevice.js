"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ISYUpdateableLevelDevice = exports.ISYLevelDevice = exports.ISYUpdateableBinaryStateDevice = exports.ISYBinaryStateDevice = void 0;
const ISYConstants_js_1 = require("../ISYConstants.js");
require("winston");
const UOM_js_1 = require("../Definitions/UOM.js");
const ISYBinaryStateDevice = (Base) => {
    return class extends Base {
        get state() {
            return Promise.resolve(this.local['ST'] > 0);
            //return this.readProperty('ST').then(p => p.value  > 0);
        }
        convertTo(value, uom, propertyName = null) {
            if (uom === UOM_js_1.UnitOfMeasure.Boolean) {
                return value > 0 ? true : false;
            }
            else
                super.convertTo(value, uom, propertyName);
        }
        convertFrom(value, uom, propertyName = null) {
            if (uom === UOM_js_1.UnitOfMeasure.Boolean) {
                if (value) {
                    return ISYConstants_js_1.States.On;
                }
                else {
                    return ISYConstants_js_1.States.Off;
                }
            }
            else
                super.convertFrom(value, uom, propertyName);
        }
    };
};
exports.ISYBinaryStateDevice = ISYBinaryStateDevice;
const ISYUpdateableBinaryStateDevice = (Base) => {
    return class extends Base {
        get state() {
            return Promise.resolve(this.local.ST > 0);
            //return this.readProperty('ST').then(p => p.value  > 0);
        }
        set state(value) {
            this.updateState(value);
        }
        async updateState(state) {
            if (this.local.ST > 0 !== state || this.pending.ST > 0 !== state) {
                this.pending.ST = state ? ISYConstants_js_1.States.On : ISYConstants_js_1.States.Off;
                return this.sendCommand(state ? 'DON' : 'DOF').then((p) => {
                    //this.local.ST = this.pending.ST;
                    this.pending.ST = null;
                });
            }
            return Promise.resolve();
        }
    };
};
exports.ISYUpdateableBinaryStateDevice = ISYUpdateableBinaryStateDevice;
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
