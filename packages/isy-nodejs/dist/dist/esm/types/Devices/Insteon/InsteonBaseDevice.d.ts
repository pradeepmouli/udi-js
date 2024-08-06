import { Family } from '../../Definitions/Global/Families.js';
import { ISY } from '../../ISY.js';
import { UnitOfMeasure } from '../../Definitions/Global/UOM.js';
import { NodeInfo } from '../../Definitions/NodeInfo.js';
import { ISYNodeDevice } from '../../ISYNode.js';
import 'winston';
import type { Driver, DriverType } from '../../Definitions/Global/Drivers.js';
export declare class InsteonBaseDevice<D extends Driver.Literal = 'ST', C extends string = 'QUERY'> extends ISYNodeDevice<Family.Insteon, D, C> {
    constructor(isy: ISY, deviceNode: NodeInfo);
    convertFrom(value: any, uom: UnitOfMeasure, propertyName?: D): any;
    convertTo(value: any, uom: UnitOfMeasure, propertyName?: DriverType): any;
    sendBeep(level?: number): Promise<any>;
}
