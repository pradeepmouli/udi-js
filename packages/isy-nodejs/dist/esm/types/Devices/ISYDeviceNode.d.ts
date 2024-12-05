import type { Category } from '../Definitions/Global/Categories.js';
import type { Command } from '../Definitions/Global/Commands.js';
import type { Driver } from '../Definitions/Global/Drivers.js';
import type { Event } from '../Definitions/Global/Events.js';
import type { Family } from '../Definitions/index.js';
import { type ISY } from '../ISY.js';
import type { ISYDevice, ISYDeviceInfo } from '../ISYDevice.js';
import { ISYNode } from '../ISYNode.js';
import type { NodeInfo } from '../Model/NodeInfo.js';
export declare class ISYDeviceNode<T extends Family, D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures = {
    [x in keyof D]: Event.DriverToEvent<D[x]> & {
        driver: x;
    };
} & {
    [x in keyof C]: Event.CommandToEvent<C[x]> & {
        command: x;
    };
}> extends ISYNode<T, D, C, E> implements ISYDeviceInfo, ISYDevice<T, Driver.ForAll<D>, Command.ForAll<C>, any> {
    family: T;
    readonly typeCode: string;
    readonly deviceClass: any;
    readonly category: Category;
    readonly subCategory: number;
    _enabled: any;
    productName: string;
    model: string;
    modelNumber: string;
    version: string;
    constructor(isy: ISY, node: NodeInfo);
    vendorName: string;
    manufacturer: string;
    productId: string | number;
    modelName: string;
    _parentDevice: ISYDevice<T, any, any, any>;
    children: ISYNode<any, any, any, any>[];
    addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
}
//# sourceMappingURL=ISYDeviceNode.d.ts.map