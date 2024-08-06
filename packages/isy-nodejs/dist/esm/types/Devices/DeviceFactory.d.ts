import { Family } from '../Definitions/Global/Families.js';
import { NodeInfo } from '../Model/NodeInfo.js';
import type { ISYDevice } from '../ISYNode.js';
import type { Constructor } from './Constructor.js';
export declare class DeviceFactory {
    static getDeviceDetails(node: NodeInfo): {
        name: string;
        modelNumber?: string;
        version?: string;
        class?: Constructor<ISYDevice<Family>>;
        unsupported?: true;
    };
}
//# sourceMappingURL=DeviceFactory.d.ts.map