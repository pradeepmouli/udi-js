import { UnitOfMeasure } from './Global/UOM.js';
export interface PropertyStatus {
    id: string | number;
    value: any;
    formatted: any;
    uom: UnitOfMeasure;
    prec: number;
    name: string;
}
