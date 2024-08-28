import type { UnitOfMeasure } from '../Definitions/Global/UOM.js';



export interface DriverState {
	id: string | number;
	value: any;
	formatted: string;
	uom: UnitOfMeasure;

	prec: number;
	name: string;
}
