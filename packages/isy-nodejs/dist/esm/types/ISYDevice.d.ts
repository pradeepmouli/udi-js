import type { Category, Family } from './Definitions/index.js';
import type { CompositeDevice } from './Devices/CompositeDevice.js';
import { ISYDeviceNode } from './Devices/ISYDeviceNode.js';
import type { ISYNode } from './ISYNode.js';
import type { ISYScene } from './ISYScene.js';
import type { Factory } from './Utils.js';
import type { Constructor } from 'type-fest';
export interface ISYDevice<T extends Family, D, C, E> extends ISYDeviceInfo {
    address: string;
    category: T extends Family.Insteon ? Category.Insteon : Category.Home.Category;
    commands: C;
    deviceClass: any;
    drivers: D;
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
    scenes: ISYScene[];
    subCategory: number;
    type: any;
    typeCode: string;
    version: string;
}
export declare namespace ISYDevice {
    function isDevice<T extends Family, D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures>(device: ISYNode<T, D, C, E>): device is ISYDevice<T, D, C, E> & ISYNode<T, D, C, E>;
    function isNode<T extends Family, D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures>(device: ISYDevice<T, D, C, E>): device is ISYDevice<T, D, C, E> & ISYNode<T, D, C, E>;
    function isComposite<T extends Family, D extends Record<string, typeof ISYDeviceNode>, C, E>(device: ISYDevice<T, D, C, E>): device is ISYDevice<T, D, C, E> & CompositeDevice<T, any, any>;
    type DriverNamesOf<T> = T extends CompositeDevice<any, any, any> ? CompositeDevice.DriverNamesOf<T> : ISYNode.DriverNamesOf<T>;
    type CommandNamesOf<T> = T extends CompositeDevice<any, any, any> ? CompositeDevice.CommandNamesOf<T> : ISYNode.CommandNamesOf<T>;
    type Any = ISYDevice<any, any, any, any>;
    type EventNamesOf<T extends ISYDevice.Any | Factory<ISYDevice.Any>> = InstanceTypeOf<T> extends CompositeDevice<any, any, any> ? CompositeDevice.EventNamesOf<InstanceTypeOf<T>> : T extends ISYNode ? ISYNode.EventNamesOf<T> : never;
    type InstanceTypeOf<T> = T extends ISYDevice.Any ? T : T extends Factory<ISYDevice.Any> & {
        Node: Constructor<ISYDevice.Any>;
    } ? InstanceType<T['Node']> : T extends {
        Device: Constructor<ISYDevice.Any>;
    } ? InstanceType<T['Device']> : never;
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
    category: Category.Insteon | Category.Home.Category;
    subCategory: number;
    manufacturer: string;
}
//# sourceMappingURL=ISYDevice.d.ts.map