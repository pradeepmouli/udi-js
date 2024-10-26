"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceFactory = void 0;
const Families_js_1 = require("../Definitions/Global/Families.js");
const InsteonDeviceFactory_js_1 = require("./Insteon/InsteonDeviceFactory.js");
class DeviceFactory {
    static getDeviceDetails(node) {
        if ((node.family ?? Families_js_1.Family.Insteon) == Families_js_1.Family.Insteon) {
            return InsteonDeviceFactory_js_1.InsteonDeviceFactory.getInsteonDeviceDetails(node);
        }
        else {
            return { name: 'Unsupported Device', class: null, unsupported: true };
        }
    }
}
exports.DeviceFactory = DeviceFactory;
//# sourceMappingURL=DeviceFactory.js.map