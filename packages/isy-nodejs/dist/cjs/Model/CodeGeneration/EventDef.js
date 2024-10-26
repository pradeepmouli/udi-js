"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UOMMap = void 0;
exports.buildUOMMap = buildUOMMap;
exports.UOMMap = new Map();
function buildUOMMap(eventMaps, family) {
    let map = {};
    for (const uom of eventMaps.uom) {
        map[uom.to] = uom.from;
    }
    exports.UOMMap.set(family, map);
    return map;
}
//# sourceMappingURL=EventDef.js.map