import 'winston';
import { Driver } from '../../Definitions/Global/Drivers.js';
import { Family } from '../../Definitions/Global/Families.js';
import { UnitOfMeasure } from '../../Definitions/Global/UOM.js';
import { ISY } from '../../ISY.js';
import { ISYNode } from '../../ISYNode.js';
import { NodeInfo } from '../../Model/NodeInfo.js';
import { ISYDeviceNode } from '../ISYDeviceNode.js';
export declare class InsteonBaseDevice<D extends ISYNode.DriverSignatures = Driver.Signatures<"ST">, C extends ISYNode.CommandSignatures = {}> extends ISYDeviceNode<Family.Insteon, D, C> {
    readonly manufacturer: string;
    static family: Family.Insteon;
    constructor(isy: ISY, deviceNode: NodeInfo);
    convertFrom(value: any, uom: UnitOfMeasure, driver?: keyof D): any;
    convertTo(value: any, uom: UnitOfMeasure, propertyName?: keyof D): any;
    sendBeep(level?: number): Promise<any>;
}
//# sourceMappingURL=InsteonBaseDevice.d.ts.map