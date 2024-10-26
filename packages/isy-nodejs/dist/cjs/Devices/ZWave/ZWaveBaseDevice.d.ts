import { Family } from '../../Definitions/Global/Families.js';
import { ISYDeviceNode } from '../ISYDeviceNode.js';
import { ISYNode } from '../../ISYNode.js';
import 'winston';
import type { Driver } from '../../Definitions/Global/Drivers.js';
import type { Merge } from '@project-chip/matter.js/util';
export declare class ZWaveBaseDevice<D extends ISYNode.DriverSignatures = {}, C extends ISYNode.CommandSignatures = {}> extends ISYDeviceNode<Family.ZWave, Merge<D, Driver.Signatures<'ST'>>, C> {
    getNodeDef(): Promise<any>;
    convertFrom(value: any, uom: number): any;
    convertTo(value: any, uom: number): any;
    sendBeep(level?: number): Promise<any>;
}
//# sourceMappingURL=ZWaveBaseDevice.d.ts.map