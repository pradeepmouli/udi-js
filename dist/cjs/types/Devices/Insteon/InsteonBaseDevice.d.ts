import { Family } from '../../Definitions/Global/Families.js';
import { ISY } from '../../ISY.js';
import { UnitOfMeasure } from '../../Definitions/Global/UOM.js';
import { NodeInfo } from '../../Definitions/NodeInfo.js';
import { ISYDeviceNode } from '../../ISYNode.js';
import 'winston';
import type { Drivers } from '../../Definitions/Global/Drivers.js';
export declare class InsteonBaseDevice<D extends Drivers = Drivers, C extends string = string> extends ISYDeviceNode<Family.Insteon, D, C> {
    constructor(isy: ISY, deviceNode: NodeInfo);
    convertFrom(value: any, uom: UnitOfMeasure, propertyName?: D): any;
    convertTo(value: any, uom: UnitOfMeasure, propertyName?: Drivers): any;
    sendBeep(level?: number): Promise<any>;
}
