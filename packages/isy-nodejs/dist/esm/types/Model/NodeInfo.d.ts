import { Family } from '../Definitions/index.js';
import type { DriverState } from './DriverState.js';
export type NodeInfo<T extends Family = Family> = (T extends Family.ZWave | Family.ZigBee ? DynamicNodeInfo : StaticNodeInfo) & {
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
export interface DynamicNodeInfo {
    address: any;
    custom: Custom;
    dcPeriod: number;
    deviceClass?: any;
    devtype: Devtype;
    enabled?: boolean;
    endDelay: number;
    family?: Family.ZWave;
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
export interface StaticNodeInfo {
    address: any;
    dcPeriod: number;
    deviceClass?: any;
    enabled?: boolean;
    endDelay: number;
    family?: Family;
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
export declare function family<F extends Family>(nodeInfo: NodeInfo<any>): nodeInfo is NodeInfo<F>;
export declare function isDynamic(nodeInfo: NodeInfo<any>): nodeInfo is DynamicNodeInfo;
export declare function isStatic(nodeInfo: NodeInfo<any>): nodeInfo is StaticNodeInfo;
export {};
//# sourceMappingURL=NodeInfo.d.ts.map