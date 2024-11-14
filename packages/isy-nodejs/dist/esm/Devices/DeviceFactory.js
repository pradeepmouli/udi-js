import { Family } from '../Definitions/Global/Families.js';
import { InsteonDeviceFactory } from './Insteon/InsteonDeviceFactory.js';
export class DeviceFactory {
    static getDeviceDetails(node) {
        if ((node.family ?? Family.Insteon) == Family.Insteon) {
            return InsteonDeviceFactory.getInsteonDeviceDetails(node);
        }
        else {
            return { name: 'Unsupported Device', class: null, unsupported: true };
        }
    }
}
//# sourceMappingURL=DeviceFactory.js.map