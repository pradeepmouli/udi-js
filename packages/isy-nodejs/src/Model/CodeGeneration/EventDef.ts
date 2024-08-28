import type { Family, UnitOfMeasure } from '../../Definitions/Global/index.js'
import { type EditorDef, EditorDefMap } from '../EditorDef.js';

interface EventMaps {
  '$comment': string;
  eventMap: EventMap;
}

interface EventMap {
  uomMap: UomMap;
  id: string;
}

interface UomMap {
    uom: {
    from: UnitOfMeasure;
    to: UnitOfMeasure;
    prec?: number;
 }[]
  '$comment': string[];
}

export const UOMMap : Map<Family, {[x in UnitOfMeasure]?: UnitOfMeasure} > = new Map();

export function buildUOMMap<T extends Family>(eventMaps: UomMap, family: T) {
    let map: {[x in UnitOfMeasure]?: UnitOfMeasure} = {};

    for (const uom of eventMaps.uom) {
        map[uom.to] = uom.from as UnitOfMeasure;
    }


    UOMMap.set(family, map);
    return map;
}

