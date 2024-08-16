export const UOMMap = new Map();
export function buildUOMMap(eventMaps, family) {
    let map = {};
    for (const uom of eventMaps.uom) {
        map[uom.to] = uom.from;
    }
    UOMMap.set(family, map);
    return map;
}
//# sourceMappingURL=EventDef.js.map