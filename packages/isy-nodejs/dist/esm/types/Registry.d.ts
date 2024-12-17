import { Family } from './Definitions/index.js';
import type { ISYDeviceInfo } from './ISYDevice.js';
import { ISYNode } from './ISYNode.js';
import type { StringKeys } from './Utils.js';
export declare class Registry<K extends keyof any, T> {
    Global: {
        [x in K]?: T;
    };
    FamilyLevel: {
        [x in StringKeys<typeof Family>]?: {
            [y in K]?: T;
        };
    };
    DeviceLevel: {
        [x: string]: {
            [y in K]?: T;
        };
    };
    NodeLevel: {
        [x: string]: {
            [y in K]?: T;
        };
    };
    registerGlobal(key: K, value: T): void;
    registerFamilyLevel<F extends Family>(family: F & number, key: K, value: T): void;
    registerDeviceLevel(device: string, key: K, value: T): void;
    registerNodeLevel(nodeDefId: string, key: K, value: T): void;
    register(key: K, value: T): void;
    register(key: K, value: T, deviceType: string): void;
    register(key: K, value: T, nodeClass: typeof ISYNode): void;
    getGlobal(key: K): T | undefined;
    getFamilyLevel<F extends Family>(family: F & number, key: K): T | undefined;
    getDeviceLevel(device: string, key: K): T | undefined;
    getNodeLevel(nodeDefId: string, key: K): T | undefined;
    get(device: ISYDeviceInfo & ISYNode, key: K): T | undefined;
}
//# sourceMappingURL=Registry.d.ts.map