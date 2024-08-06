import type { Family } from '../Definitions/Global/Families.js';
import type { UnitOfMeasure } from '../Definitions/Global/UOM.js';
import type { MaybeArray } from '../Utils.js';

export type RangeDef = {
	uom: UnitOfMeasure;
	subset: string;
	nls: string;
} | {
	uom: UnitOfMeasure;
	min: number;
	max: number;
	step: number;
	prec: number;
}


export interface EditorDef {
	id: string;
	range: MaybeArray<RangeDef>
}


export const EditorDefMap : Map<Family, {[x: string]: EditorDef}> = new Map();

export function buildEditorDefMap<T extends Family>(editorDefs: EditorDef[], family: T) {
    const map: {[x: string]: EditorDef} = {};
    for(const editorDef of editorDefs) {
        map[editorDef.id] = editorDef;
    }

    EditorDefMap.set(family, map);
    return map;
}