import { Family } from '../Definitions/Global/Families.js';
import { applyTranslations, NLSIndexMap } from './NLS.js';
import { merge, pascalCase } from 'moderndash';
import { UnitOfMeasure } from '../Definitions/Global/UOM.js';
import fs from 'fs';
export class EnumDefinition {
    family;
    id;
    name;
    values = {};
    usages = new Set();
    booleanValues;
    constructor(family, indexDef) {
        this.family = family;
        this.id = indexDef.id;
        this.name = pascalCase(applyTranslations(family, indexDef.id.replace('IX_I_', '').replace('IX_', '').replace('IXA_', 'Alert')));
        for (const [index, value] of Object.entries(indexDef.values)) {
            this.values[pascalCase(value)] = parseInt(index);
        }
    }
}
(function (EnumDefinition) {
    function get(family, id, uom, nodeDefId) {
        if (EnumDefinitionMap.has(family)) {
            var enumDef = EnumDefinitionMap.get(family)[id];
            if (enumDef) {
                enumDef.usages.add(`${nodeDefId}:${UnitOfMeasure[uom]}`);
                return enumDef;
            }
        }
    }
    EnumDefinition.get = get;
    function generate(family) {
        if (!family) {
            //return generateAll();
        }
        let enumDefs = EnumDefinitionMap;
        let indexDefs = NLSIndexMap.get(family);
        let familyEnumDefs;
        for (const id in indexDefs) {
            familyEnumDefs[id] = new EnumDefinition(family, { id, values: indexDefs[id] });
        }
        enumDefs.set(family, familyEnumDefs);
        return enumDefs.get(family);
    }
    EnumDefinition.generate = generate;
    function* generateAll() {
        for (const family of NLSIndexMap.keys()) {
            yield generate(family);
        }
    }
    EnumDefinition.generateAll = generateAll;
    function load(path) {
        if (!fs.existsSync(path + "/generated")) {
            fs.mkdirSync(path + "/generated", { recursive: true });
        }
        if (!fs.existsSync(path + "/custom")) {
            fs.mkdirSync(path + "/custom");
        }
        for (const file of new Set(fs.readdirSync(path + "/generated").concat(fs.readdirSync(path + "/custom")))) {
            const fam = file.replace(".json", "");
            const family = Family[fam];
            let enumDefs = {};
            if (fs.existsSync(`${path}/generated/${fam}.json`)) {
                enumDefs = JSON.parse(fs.readFileSync(`${path}/generated/${fam}.json`, "utf8"));
            }
            if (fs.existsSync(`${path}/custom/${fam}.json`)) {
                merge(enumDefs, JSON.parse(fs.readFileSync(`${path}/custom/${fam}.json`, "utf8")));
            }
            EnumDefinitionMap.set(family, enumDefs);
        }
        return EnumDefinitionMap;
    }
    EnumDefinition.load = load;
})(EnumDefinition || (EnumDefinition = {}));
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