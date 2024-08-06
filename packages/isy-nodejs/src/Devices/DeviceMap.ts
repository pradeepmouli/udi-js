
import { DeviceEnergyManagementServer } from '@project-chip/matter.js/behaviors/device-energy-management';
import { Insteon, Family } from '../Definitions/Global/Families.js';
import { Category } from '../Definitions/Global/Categories.js';
import type { ISYDevice } from '../ISYNode.js';
import type { Devices } from './index.js';
import type { Device } from '@project-chip/matter.js/device';
import type { getCategory } from '../Utils.js';

// tslint:disable-next-line: no-unused-expression
// tslint:disable-next-line: no-angle-bracket-type-assertion

type s<T extends Family> = ISYDevice<T>;

type DeviceNames<T extends Family> = `${T extends Family.Insteon | Family.ZWave | Family.ZigBee ? Devices<T>[keyof Devices<T>]["name"] : ""}`;
type x = DeviceNames<Family.Insteon>
export interface DeviceDef<T extends Family>
{
		id: number;
		type?: string;
		name: string;
		modelNumber?: string;
		class?: DeviceNames<T>;
}

export interface CategoryDef<T extends Family, C extends Category> {
	id: C;
	name: `${typeof Category[C]}`;
	devices: {[x:number]: DeviceDef<T>}
}

export interface FamilyDef<T extends Family> {
	id: T;
	name: keyof typeof Family;
	description: string;
	categories: {[key in keyof typeof Category]?: CategoryDef<T,typeof Category[key]> & {name: key}};
}

var s : FamilyDef<Family.Insteon> = { id: Family.Insteon, description: "Insteon", name: "Insteon", categories: {DimmableControl: {id: Category.DimmableControl, name: "DimmableControl", devices: {1:{id: 0, name: "DimmableControl"}}}}};

export type DeviceMap = {
  [key in keyof typeof Family]?: FamilyDef<(typeof Family)[key]> & { name: key };
};
