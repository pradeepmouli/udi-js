import { Family } from '../Definitions/Global/Families.js';
import { NodeInfo } from '../Model/NodeInfo.js';
import type { ISYDevice } from '../ISYDevice.js';
import type { Constructor } from './Constructor.js';
export declare class DeviceFactory {
    static getDeviceDetails(node: NodeInfo): {
        name: string;
        modelNumber?: string;
        version?: string;
        class?: Constructor<ISYDevice<Family, any, any, any>>;
        unsupported?: true;
    };
}
export declare namespace NodeFactory {
}
//# sourceMappingURL=DeviceFactory.d.ts.map