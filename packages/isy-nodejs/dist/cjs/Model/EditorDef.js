"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorDef = exports.EditorDefMap = void 0;
exports.buildEditorDefMap = buildEditorDefMap;
exports.EditorDefMap = new Map();
function buildEditorDefMap(editorDefs, family) {
    const map = {};
    for (const editorDef of editorDefs) {
        map[editorDef.id] = editorDef;
    }
    exports.EditorDefMap.set(family, map);
    return map;
}
var EditorDef;
(function (EditorDef) {
    function get(family, id) {
        if (exports.EditorDefMap.has(family)) {
            return exports.EditorDefMap.get(family)[id];
        }
    }
    EditorDef.get = get;
    EditorDef.Map = exports.EditorDefMap;
})(EditorDef || (exports.EditorDef = EditorDef = {}));
//# sourceMappingURL=EditorDef.js.map