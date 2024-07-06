import { Family, ISYDevice } from '../ISY.js';
import { InsteonDeviceFactory } from './Insteon/InsteonDeviceFactory.js';
export class DeviceFactory {
    static getDeviceDetails(node) {
        // tslint:disable-next-line: triple-equals
        if ((node.family ?? Family.Insteon) == Family.Insteon) {
            return InsteonDeviceFactory.getInsteonDeviceDetails(node);
        }
        else {
            return { name: 'Unsupported Device', class: ISYDevice, unsupported: true };
        }
    }
}
