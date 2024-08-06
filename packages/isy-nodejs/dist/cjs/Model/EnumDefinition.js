"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumDefinitionMap = exports.EnumDefinition = void 0;
exports.buildEnumDefinitions = buildEnumDefinitions;
const NLS_js_1 = require("./NLS.js");
const moderndash_1 = require("moderndash");
class EnumDefinition {
    family;
    id;
    name;
    values = {};
    constructor(family, indexDef) {
        this.family = family;
        this.id = indexDef.id;
        this.name = (0, moderndash_1.pascalCase)((0, NLS_js_1.applyTranslations)(family, indexDef.id.replace('IX_I_', '').replace('IX_', '').replace('IXA_', 'Alarm')));
        for (const [index, value] of Object.entries(indexDef.values)) {
            this.values[(0, moderndash_1.pascalCase)(value)] = parseInt(index);
        }
    }
}
exports.EnumDefinition = EnumDefinition;
exports.EnumDefinitionMap = new Map();
function buildEnumDefinitions(NLSIndexMap) {
    let enumDefs = exports.EnumDefinitionMap;
    for (const [family, indexDefs] of NLSIndexMap) {
        let familyEnumDefs = {};
        for (const id in indexDefs) {
            familyEnumDefs[id] = new EnumDefinition(family, { id, values: indexDefs[id] });
        }
        enumDefs.set(family, familyEnumDefs);
    }
    return enumDefs;
}
//# sourceMappingURL=EnumDefinition.js.map