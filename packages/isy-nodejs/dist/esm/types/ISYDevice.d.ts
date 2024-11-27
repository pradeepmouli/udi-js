import type { Command } from './Definitions/Global/Commands.js';
import type { Driver } from './Definitions/Global/Drivers.js';
import type { Category, Family } from './Definitions/index.js';
import type { ISYNode } from './ISYNode.js';
import type { ISYScene } from './ISYScene.js';
export interface ISYDevice<T extends Family, D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures> extends ISYDeviceInfo {
    address: string;
    category: Category;
    commands: Command.ForAll<C>;
    deviceClass: any;
    drivers: Driver.ForAll<D>;
    events: E;
    enabled: boolean;
    family: T;
    hidden: boolean;
    isDimmable: boolean;
    label: string;
    model: string;
    modelNumber: string;
    name: any;
    parentAddress: any;
    productName: string;
    scenes: ISYScene[];
    subCategory: number;
    type: any;
    typeCode: string;
    version: string;
    vendorName: string;
}
export declare function isDevice<T extends Family, D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures>(device: ISYNode<T, D, C, E>): device is ISYDevice<T, D, C, E> & ISYNode<T, D, C, E>;
export declare function isDeviceClass<T extends Family, D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures>(device: typeof ISYNode<T, D, C, E>): device is (new (...args: any[]) => ISYDevice<T, D, C, E>) & typeof ISYNode<T, D, C, E>;
export interface ISYDeviceInfo {
    type: string;
    deviceClass: any;
    productName: string;
    productId: string | number;
    modelName: string;
    modelNumber: string;
    version: string;
    category: Category;
    subCategory: number;
    manufacturer: string;
}
//# sourceMappingURL=ISYDevice.d.ts.map