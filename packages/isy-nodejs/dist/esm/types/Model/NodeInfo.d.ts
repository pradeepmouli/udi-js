import type { DriverState } from './DriverState.js';
import type { Family } from '../ISY.js';
export interface NodeInfo {
    family?: Family;
    type?: string;
    enabled?: boolean;
    deviceClass?: any;
    pnode: any;
    property?: DriverState[] | DriverState;
    flag?: any;
    nodeDefId?: string;
    address: any;
    name: string;
    parent?: any;
    startDelay: number;
    hint: string;
    endDelay: number;
    wattage: number;
    dcPeriod: number;
}
//# sourceMappingURL=NodeInfo.d.ts.map