import { type ISY } from '../ISY.js';
import type { ISYDevice } from '../ISYDevice.js';
import { ISYNode } from '../ISYNode.js';
import type { NodeInfo } from '../Model/NodeInfo.js';
import type { Category } from '../Definitions/Global/Categories.js';
import type { Event } from '../Definitions/Global/Events.js';
import type { Family } from '../Definitions/index.js';
export declare class ISYDeviceNode<T extends Family, D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures = {
    [x in keyof D]: Event.DriverToEvent<D[x]> & {
        driver: x;
    };
} & {
    [x in keyof C]: Event.CommandToEvent<C[x]> & {
        command: x;
    };
}> extends ISYNode<T, D, C, E> {
    family: T;
    readonly typeCode: string;
    readonly deviceClass: any;
    readonly category: Category;
    readonly subCategory: number;
    declare: any;
    _enabled: any;
    productName: string;
    model: string;
    modelNumber: string;
    version: string;
    constructor(isy: ISY, node: NodeInfo);
    _parentDevice: ISYDevice<T, any, any, any>;
    children: ISYNode<any, any, any, any>[];
    addChild<K extends ISYNode<any, any, any, any>>(childDevice: K): void;
}
//# sourceMappingURL=ISYDeviceNode.d.ts.map