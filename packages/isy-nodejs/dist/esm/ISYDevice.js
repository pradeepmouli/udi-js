import { ISYDeviceNode } from './Devices/ISYDeviceNode.js';
export var ISYDevice;
(function (ISYDevice) {
    function isDevice(device) {
        return device instanceof ISYDeviceNode;
    }
    ISYDevice.isDevice = isDevice;
    function isNode(device) {
        return device instanceof ISYDeviceNode;
    }
    ISYDevice.isNode = isNode;
    function isComposite(device) {
        return 'root' in device;
    }
    ISYDevice.isComposite = isComposite;
})(ISYDevice || (ISYDevice = {}));
export function isDevice(device) {
    return device instanceof ISYDeviceNode;
}
export function isDeviceClass(device) {
    return device.prototype instanceof ISYDeviceNode;
}
//# sourceMappingURL=ISYDevice.js.map