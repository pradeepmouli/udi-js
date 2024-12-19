import { Family } from '../Definitions/Global/Families.js';
import { Category } from '../Definitions/Global/Categories.js';
import type { Devices } from './index.js';
type DeviceNames<T extends Family> = `${T extends Family.Insteon | Family.ZWave | Family.ZigBee ? Devices<T>[keyof Devices<T>]["constructor"]["name"] : ""}`;
export interface DeviceDef<T extends Family> {
    id: number;
    type?: string;
    name: string;
    modelNumber?: string;
    class?: DeviceNames<T>;
}
export interface CategoryDef<T extends Family, C extends Category.Insteon> {
    id: C;
    name: `${typeof Category.Insteon[C]}`;
    devices: {
        [x: number]: DeviceDef<T>;
    };
}
export interface FamilyDef<T extends Family> {
    id: T;
    name: keyof typeof Family;
    description: string;
    categories: {
        [key in keyof typeof Category.Insteon]?: CategoryDef<T, typeof Category.Insteon[key]> & {
            name: key;
        };
    };
}
export type DeviceMap = {
    [key in keyof typeof Family]?: FamilyDef<(typeof Family)[key]> & {
        name: key;
    };
};
export {};
//# sourceMappingURL=DeviceMap.d.ts.map