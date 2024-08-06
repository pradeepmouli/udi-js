import { applyTranslations } from './NLS.js';
import { pascalCase } from 'moderndash';
export class EnumDefinition {
    family;
    id;
    name;
    values = {};
    constructor(family, indexDef) {
        this.family = family;
        this.id = indexDef.id;
        this.name = pascalCase(applyTranslations(family, indexDef.id.replace('IX_I_', '').replace('IX_', '').replace('IXA_', 'Alarm')));
        for (const [index, value] of Object.entries(indexDef.values)) {
            this.values[pascalCase(value)] = parseInt(index);
        }
    }
}
export const EnumDefinitionMap = new Map();
export function buildEnumDefinitions(NLSIndexMap) {
    let enumDefs = EnumDefinitionMap;
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