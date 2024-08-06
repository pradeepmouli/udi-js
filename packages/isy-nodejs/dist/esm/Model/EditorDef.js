export const EditorDefMap = new Map();
export function buildEditorDefMap(editorDefs, family) {
    const map = {};
    for (const editorDef of editorDefs) {
        map[editorDef.id] = editorDef;
    }
    EditorDefMap.set(family, map);
    return map;
}
//# sourceMappingURL=EditorDef.js.map