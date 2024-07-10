import { Family } from '../../Definitions/Families.js';
import { ISY } from '../../ISY.js';
import { UnitOfMeasure } from '../../Definitions/UOM.js';
import { NodeInfo } from '../../Definitions/NodeInfo.js';
import { ISYDeviceNode } from '../../ISYNode.js';
import 'winston';
export declare class InsteonBaseDevice<Drivers extends string = string, Commands extends string = string> extends ISYDeviceNode<Family.Insteon, Drivers, Commands> {
    constructor(isy: ISY, deviceNode: NodeInfo);
    convertFrom(value: any, uom: UnitOfMeasure, propertyName?: Drivers): any;
    convertTo(value: any, uom: UnitOfMeasure, propertyName?: Drivers): any;
    sendBeep(level?: number): Promise<any>;
}
