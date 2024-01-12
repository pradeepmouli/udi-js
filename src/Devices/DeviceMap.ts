import { Family, ISYDevice } from '../ISY';
import { Insteon } from '../Families';

// tslint:disable-next-line: no-unused-expression
// tslint:disable-next-line: no-angle-bracket-type-assertion

type s<T extends Family> = ISYDevice<T>;

export interface DeviceDef<T extends Family> {


		id: number;
		name: string;

		modelNumber: string;

		// tslint:disable-next-line: no-shadowed-variable
		class: typeof ISYDevice;
}

export interface CategoryDef<T extends Family> {
	id: number;
	name: string;
	devices: Array<DeviceDef<T>>;
}

export interface FamilyDef<T extends Family> {
	id: T;
	name: string;
	description: string;
	categories: Array<CategoryDef<T>>;
}

export interface DeviceMap extends Array<FamilyDef<Family>>{

}
