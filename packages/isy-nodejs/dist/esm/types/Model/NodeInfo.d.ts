import { Family, type Category } from '../Definitions/index.js';
import { DeviceInfo } from '../Definitions/Global/Categories.js';
import type { DriverState } from './DriverState.js';
export type NodeInfo<T extends Family = Family> = (T extends Family.ZWave | Family.ZigBee ? DynamicNodeInfo<T> : StaticNodeInfo<T>) & {
    state?: {
        [x: string]: DriverState;
    };
};
interface Custom {
    flags: string;
    val1: string;
}
interface Devtype {
    cat: string;
    gen: string;
    mfg: string;
}
export interface DynamicNodeInfo<F extends Family.ZWave | Family.ZigBee> {
    address: any;
    custom: Custom;
    dcPeriod: number;
    deviceClass?: any;
    devtype: Devtype;
    enabled?: boolean;
    endDelay: number;
    family?: F;
    flag?: any;
    hint: string;
    name: string;
    nodeDefId?: string;
    parent?: Parent;
    pnode: any;
    property?: DriverState[] | DriverState;
    rpnode: string;
    sgid: string;
    startDelay: number;
    type?: string;
    wattage: number;
}
interface Parent {
    _: string;
    type: string;
}
export interface StaticNodeInfo<F extends Family> {
    address: any;
    dcPeriod: number;
    deviceClass?: any;
    enabled?: boolean;
    endDelay: number;
    family?: F;
    flag?: any;
    hint: string;
    name: string;
    nodeDefId?: string;
    parent?: Parent;
    pnode: any;
    property?: DriverState[] | DriverState;
    startDelay: number;
    type?: string;
    wattage: number;
}
export declare function isFamily<T extends Family>(nodeInfo: NodeInfo<any>, family: T): nodeInfo is NodeInfo<T>;
export declare function parseDeviceInfo<F extends Family>(nodeInfo: NodeInfo<F>): NodeInfo<F> extends StaticNodeInfo<Family.Insteon> ? {
    category: Category.Insteon;
    model: number;
    firmwareVersion: string;
    firmwareRevision: string;
} : DeviceInfo<any, any, any>;
export declare function isDynamic(nodeInfo: NodeInfo<any>): nodeInfo is DynamicNodeInfo<any>;
export declare function isStatic(nodeInfo: NodeInfo<any>): nodeInfo is StaticNodeInfo<any>;
export {};
//# sourceMappingURL=NodeInfo.d.ts.map