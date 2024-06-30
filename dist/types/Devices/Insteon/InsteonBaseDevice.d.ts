import { Family } from '../../Families.js';
import { ISY } from '../../ISY.js';
import { UnitOfMeasure } from '../../UOM.js';
import { NodeInfo } from '../ISYDevice.js';
import { ISYDeviceNode } from '../../ISYNode.js';
import 'winston';
export declare class InsteonBaseDevice<Drivers extends string = string, Commands extends string = string> extends ISYDeviceNode<Family.Insteon, Drivers, Commands> {
    constructor(isy: ISY, deviceNode: NodeInfo);
    convertFrom(value: any, uom: UnitOfMeasure): any;
    convertTo(value: any, uom: UnitOfMeasure): any;
    sendBeep(level?: number): Promise<any>;
}
