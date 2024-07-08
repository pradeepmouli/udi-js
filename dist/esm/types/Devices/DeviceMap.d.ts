import { Family, ISYDevice } from '../ISY.js';
export interface DeviceDef<T extends Family> {
    id: number;
    name: string;
    modelNumber: string;
    class: typeof ISYDevice<T>;
}
export interface CategoryDef<T extends Family> {
    id: number;
    name: string;
    devices: Map<string, DeviceDef<T>>;
}
export interface FamilyDef<T extends Family> {
    id: T;
    name: string;
    description: string;
    categories: Map<string, CategoryDef<T>>;
}
export interface DeviceMap extends Array<FamilyDef<Family>> {
}
