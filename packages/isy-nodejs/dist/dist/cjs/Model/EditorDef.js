"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditorDefMap = void 0;
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
