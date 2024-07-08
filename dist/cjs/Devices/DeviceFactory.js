"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceFactory = void 0;
const ISY_js_1 = require("../ISY.js");
const InsteonDeviceFactory_js_1 = require("./Insteon/InsteonDeviceFactory.js");
class DeviceFactory {
    static getDeviceDetails(node) {
        // tslint:disable-next-line: triple-equals
        if ((node.family ?? ISY_js_1.Family.Insteon) == ISY_js_1.Family.Insteon) {
            return InsteonDeviceFactory_js_1.InsteonDeviceFactory.getInsteonDeviceDetails(node);
        }
        else {
            return { name: 'Unsupported Device', class: ISY_js_1.ISYDevice, unsupported: true };
        }
    }
}
exports.DeviceFactory = DeviceFactory;
