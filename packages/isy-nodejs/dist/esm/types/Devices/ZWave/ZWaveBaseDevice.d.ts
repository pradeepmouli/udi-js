import { Family } from '../../Definitions/Global/Families.js';
import { ISYNode } from '../../ISYNode.js';
import 'winston';
import type { Driver } from '../../Definitions/Global/Drivers.js';
import type { Merge } from '@matter/general';
import { DynamicNode } from '../DynamicNode.js';
export declare class ZWaveBaseDevice<D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures = {}> extends DynamicNode<Family.ZWave, Merge<D, Driver.Signatures<'ST'>>, C, E> {
    getNodeDef(): Promise<any>;
    convertFrom(value: any, uom: number): any;
    convertTo(value: any, uom: number): any;
    sendBeep(level?: number): Promise<any>;
}
//# sourceMappingURL=ZWaveBaseDevice.d.ts.map