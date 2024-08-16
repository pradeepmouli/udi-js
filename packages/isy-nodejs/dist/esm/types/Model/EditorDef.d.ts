import { Family } from '../Definitions/Global/Families.js';
import type { UnitOfMeasure } from '../Definitions/Global/UOM.js';
import type { MaybeArray } from '../Utils.js';
export type RangeDef = {
    uom: UnitOfMeasure;
    subset: string;
    nls: string;
    prec?: number;
} | {
    nls?: string;
    uom: UnitOfMeasure;
    min: number;
    max: number;
    step: number;
    prec: number;
};
export interface EditorDef {
    id: string;
    range: MaybeArray<RangeDef>;
}
export declare const EditorDefMap: Map<Family, {
    [x: string]: EditorDef;
}>;
export declare function buildEditorDefMap<T extends Family>(editorDefs: EditorDef[], family: T): {
    [x: string]: EditorDef;
};
export declare namespace EditorDef {
    function get<T extends Family>(family: T, id: string): EditorDef | undefined;
    const Map: Map<Family, {
        [x: string]: EditorDef;
    }>;
}
//# sourceMappingURL=EditorDef.d.ts.map