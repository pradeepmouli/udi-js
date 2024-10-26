"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumDefinitionMap = exports.EnumDefinition = void 0;
exports.buildEnumDefinitions = buildEnumDefinitions;
const Families_js_1 = require("../Definitions/Global/Families.js");
const NLS_js_1 = require("./NLS.js");
const moderndash_1 = require("moderndash");
const UOM_js_1 = require("../Definitions/Global/UOM.js");
const fs_1 = __importDefault(require("fs"));
const typescript_1 = require("typescript");
class EnumDefinition {
    family;
    id;
    name;
    values = {};
    usages = new Set();
    repType;
    constructor(family, indexDef) {
        this.family = family;
        this.id = indexDef.id;
        this.name = (0, moderndash_1.pascalCase)((0, NLS_js_1.applyTranslations)(family, indexDef.id.replace('IX_I_', '').replace('IX_', '').replace('IXA_', 'Alert')).replace('IXAV_', 'AlertValue'));
        for (const [index, value] of Object.entries(indexDef.values)) {
            const label = sanitize(value);
            this.values[label] = parseInt(index);
        }
    }
}
exports.EnumDefinition = EnumDefinition;
(function (EnumDefinition) {
    function get(family, id, uom, nodeDefId) {
        if (exports.EnumDefinitionMap.has(family)) {
            var enumDef = exports.EnumDefinitionMap.get(family)[id];
            if (enumDef) {
                enumDef.usages.add(`${nodeDefId}:${UOM_js_1.UnitOfMeasure[uom]}`);
                return enumDef;
            }
        }
    }
    EnumDefinition.get = get;
    function generate(family) {
        if (!family) {
            //return generateAll();
        }
        let enumDefs = exports.EnumDefinitionMap;
        let indexDefs = NLS_js_1.NLSIndexMap.get(family);
        let familyEnumDefs;
        for (const id in indexDefs) {
            familyEnumDefs[id] = new EnumDefinition(family, { id, values: indexDefs[id] });
        }
        enumDefs.set(family, familyEnumDefs);
        return enumDefs.get(family);
    }
    EnumDefinition.generate = generate;
    function* generateAll() {
        for (const family of NLS_js_1.NLSIndexMap.keys()) {
            yield generate(family);
        }
    }
    EnumDefinition.generateAll = generateAll;
    function load(path) {
        if (!fs_1.default.existsSync(path + '/generated')) {
            fs_1.default.mkdirSync(path + '/generated', { recursive: true });
        }
        if (!fs_1.default.existsSync(path + '/overrides')) {
            fs_1.default.mkdirSync(path + '/overrides');
        }
        for (const file of new Set(fs_1.default.readdirSync(path + '/generated').concat(fs_1.default.readdirSync(path + '/overrides')))) {
            const fam = file.replace('.json', '');
            const family = Families_js_1.Family[fam];
            let enumDefs = {};
            if (fs_1.default.existsSync(`${path}/generated/${fam}.json`)) {
                enumDefs = JSON.parse(fs_1.default.readFileSync(`${path}/generated/${fam}.json`, 'utf8'));
            }
            if (fs_1.default.existsSync(`${path}/overrides/${fam}.json`)) {
                enumDefs = (0, moderndash_1.merge)(enumDefs, JSON.parse(fs_1.default.readFileSync(`${path}/overrides/${fam}.json`, 'utf8')));
            }
            for (const id in enumDefs) {
                enumDefs[id].usages = new Set();
            }
            exports.EnumDefinitionMap.set(family, enumDefs);
        }
        return exports.EnumDefinitionMap;
    }
    EnumDefinition.load = load;
})(EnumDefinition || (exports.EnumDefinition = EnumDefinition = {}));
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
function createMemberName(name, mapNullishTo = 'Unknown') {
    let label = (0, moderndash_1.pascalCase)(name) ?? 'Unknown';
    if (!label.substring(0, 1).match(/[a-zA-Z]/)) {
        return typescript_1.factory.createStringLiteral(label);
    }
    return typescript_1.factory.createIdentifier(label);
}
function sanitize(value) {
    return (0, moderndash_1.pascalCase)(value).replace(/[^a-zA-Z0-9]/g, '');
}
//# sourceMappingURL=EnumDefinition.js.map