import { Family } from '../../Definitions/Global/Families.js';
import { ISYNode } from '../../ISYNode.js';
import 'winston';
import type { Driver } from '../../Definitions/Global/Drivers.js';
import type { Merge } from '@matter/general';
import { DynamicNode } from '../DynamicNode.js';
export declare class ZigBeeBaseDevice<D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures = {}> extends DynamicNode<Family.ZWave, Merge<D, Driver.Signatures<'ST'>>, C, E> {
    getNodeDef(): Promise<any>;
}
//# sourceMappingURL=ZigBeeBase.d.ts.map