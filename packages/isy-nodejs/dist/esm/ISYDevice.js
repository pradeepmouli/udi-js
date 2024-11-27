import { ISYDeviceNode } from './Devices/ISYDeviceNode.js';
export function isDevice(device) {
    return device instanceof ISYDeviceNode;
}
export function isDeviceClass(device) {
    return device.prototype instanceof ISYDeviceNode;
}
//# sourceMappingURL=ISYDevice.js.map