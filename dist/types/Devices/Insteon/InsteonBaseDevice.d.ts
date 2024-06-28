import { Family } from '../../Families.js';
import { ISY } from '../../ISY.js';
import { UnitOfMeasure } from '../../UOM.js';
import { NodeInfo } from '../ISYDevice.js';
import { ISYDevice } from '../../ISYNode.js';
import 'winston';
export declare class InsteonBaseDevice extends ISYDevice<Family.Insteon> {
    constructor(isy: ISY, deviceNode: NodeInfo);
    convertFrom(value: any, uom: UnitOfMeasure): any;
    convertTo(value: any, uom: UnitOfMeasure): any;
    sendBeep(level?: number): Promise<any>;
}
