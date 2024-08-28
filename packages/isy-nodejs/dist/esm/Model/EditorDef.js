export const EditorDefMap = new Map();
export function buildEditorDefMap(editorDefs, family) {
    const map = {};
    for (const editorDef of editorDefs) {
        map[editorDef.id] = editorDef;
    }
    EditorDefMap.set(family, map);
    return map;
}
export var EditorDef;
(function (EditorDef) {
    function get(family, id) {
        if (EditorDefMap.has(family)) {
            return EditorDefMap.get(family)[id];
        }
    }
    EditorDef.get = get;
    EditorDef.Map = EditorDefMap;
})(EditorDef || (EditorDef = {}));
//# sourceMappingURL=EditorDef.js.map