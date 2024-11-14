"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumFactory = void 0;
exports.buildEnums = buildEnums;
exports.createEnum = createEnum;
exports.createNodeClass = createNodeClass;
const typescript_1 = require("typescript");
const ts_morph_1 = require("ts-morph");
const UOM_js_1 = require("../Definitions/Global/UOM.js");
const EnumDefinition_js_1 = require("../Model/EnumDefinition.js");
const winston_1 = require("winston");
const moderndash_1 = require("moderndash");
const index_js_1 = require("../Definitions/index.js");
const logger = winston_1.loggers.get("EnumFactory");
function buildEnums(map) {
    let enums = [];
    for (const indexId in map) {
        enums.push(createEnum(map[indexId]));
    }
    return enums;
}
function createEnum(enumDef) {
    try {
        const enumNode = typescript_1.factory.createEnumDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.ExportKeyword)], typescript_1.factory.createIdentifier(enumDef.name), [
            ...Object.entries(enumDef.values).map(([name, value]) => typescript_1.factory.createEnumMember(createMemberName(name), typescript_1.factory.createNumericLiteral(value))),
        ]);
        return {
            family: enumDef.family,
            name: enumDef.name,
            path: `/${index_js_1.Family[enumDef.family]}/generated/${enumDef.name}.ts`,
            id: enumDef.id,
            statements: [enumNode]
        };
    }
    catch (e) {
        if (logger)
            logger.error(`Error creating ${index_js_1.Family[enumDef.family]} ${enumDef.name} enum: ${e.message}`, e.stack);
        else {
            throw e;
        }
    }
}
class CodeFactory {
}
class EnumFactory extends CodeFactory {
    static generateEnumsForFamily(family) {
        return buildEnums(EnumDefinition_js_1.EnumDefinitionMap.get(family));
    }
    static generateAll() {
        let t = [];
        for (const key of EnumDefinition_js_1.EnumDefinitionMap.keys()) {
            try {
                let e = this.generateEnumsForFamily(key);
                t.push(...e);
                t.push(buildEnumIndex(key, e));
            }
            catch (e) {
                if (logger)
                    logger.error(`Error generating enums for ${index_js_1.Family[key]}: ${e.message}`, e.stack);
                else {
                    throw e;
                }
            }
        }
        return t;
    }
}
exports.EnumFactory = EnumFactory;
function buildEnumIndex(family, enums) {
    return {
        family,
        path: `/${index_js_1.Family[family]}/generated/index.ts`,
        statements: [
            ...enums.map((p) => typescript_1.factory.createExportDeclaration(undefined, false, undefined, typescript_1.factory.createStringLiteral(`./${p.name}.js`), undefined)),
        ],
    };
}
function createDriverInitializationStatement(def) {
    return typescript_1.factory.createExpressionStatement(typescript_1.factory.createBinaryExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createThis(), typescript_1.factory.createIdentifier("drivers")), typescript_1.factory.createIdentifier(def.id)), typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.EqualsToken), typescript_1.factory.createCallExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier("Driver"), typescript_1.factory.createIdentifier("create")), undefined, [
        typescript_1.factory.createStringLiteral("ST"),
        typescript_1.factory.createThis(),
        typescript_1.factory.createAsExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier("nodeInfo"), typescript_1.factory.createIdentifier("property")), typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier("DriverState"), undefined)),
        typescript_1.factory.createObjectLiteralExpression([
            typescript_1.factory.createPropertyAssignment(typescript_1.factory.createIdentifier("uom"), typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier("UnitOfMeasure"), typescript_1.factory.createIdentifier(UOM_js_1.UnitOfMeasure[Object.values(def.dataType)[0]?.uom] ?? "Unknown"))),
            typescript_1.factory.createPropertyAssignment(typescript_1.factory.createIdentifier("label"), typescript_1.factory.createStringLiteral(def.label)),
            typescript_1.factory.createPropertyAssignment(typescript_1.factory.createIdentifier("name"), typescript_1.factory.createStringLiteral(def.name)),
        ], false),
    ])));
}
function createDriverSignatureReturnType(def) {
    if (def.enum) {
        return typescript_1.factory.createUnionTypeNode(Object.keys(def.values).map((p) => typescript_1.factory.createLiteralTypeNode(typescript_1.factory.createNumericLiteral(p))));
    }
    else
        return typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.NumberKeyword);
}
function createDriverPropertyReturnType(def) {
    if (def.enum) {
        {
            if (Object.keys(def.values).length == 2) {
                return typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.BooleanKeyword);
            }
            return typescript_1.factory.createUnionTypeNode(Object.keys(def.values).map((p) => typescript_1.factory.createLiteralTypeNode(typescript_1.factory.createNumericLiteral(p))));
            //   return factory.createUnionTypeNode(
            //     Object.values(def.values).map((p) => factory.createTypeReferenceNode(
            //   factory.createQualifiedName(
            //     factory.createIdentifier("UnitOfMeasure"),
            //     factory.createIdentifier(UnitOfMeasure)
            //   ),
            //   undefined
            // )))
        }
    }
    else
        return typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.NumberKeyword);
}
function createParameterSignature(def) {
    return typescript_1.factory.createParameterDeclaration(undefined, undefined, typescript_1.factory.createIdentifier(def.id ?? "value"), undefined, undefined, undefined);
}
function createCommandSignature(def) {
    return typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier(def.id), undefined, typescript_1.factory.createFunctionTypeNode(undefined, def.parameters ? Object.values(def.parameters).map(createParameterSignature) : [], typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier("Promise"), [
        typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.BooleanKeyword),
    ])));
}
function createDriverSignature(def) {
    return typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier(def.id), typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.QuestionToken), typescript_1.factory.createTypeLiteralNode([
        typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier("uom"), undefined, def.dataType
            ? typescript_1.factory.createUnionTypeNode(Object.values(def.dataType).map((p) => createTypeNodeForUOM(p.uom)))
            : typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.NumberKeyword)),
        typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier("value"), undefined, def.dataType
            ? typescript_1.factory.createUnionTypeNode(Object.values(def.dataType).map(createDriverSignatureReturnType))
            : typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.NumberKeyword)),
    ]));
}
function createTypeNodeForUOM(uom) {
    return typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createQualifiedName(typescript_1.factory.createIdentifier("UnitOfMeasure"), typescript_1.factory.createIdentifier(UOM_js_1.UnitOfMeasure[uom] ?? "Unknown")));
}
function createParameterDeclarationSignature(def) {
    return typescript_1.factory.createParameterDeclaration(undefined, undefined, typescript_1.factory.createIdentifier(def.name ?? "value"), undefined, undefined, undefined);
}
function createCommandMethodDeclaration(def) {
    return typescript_1.factory.createMethodDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.AsyncKeyword)], undefined, typescript_1.factory.createIdentifier(def.name), undefined, undefined, def.parameters ? Object.values(def.parameters).map(createParameterDeclarationSignature) : undefined, undefined, typescript_1.factory.createBlock([
        typescript_1.factory.createExpressionStatement(typescript_1.factory.createCallExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createThis(), typescript_1.factory.createIdentifier("sendCommand")), undefined, [
            typescript_1.factory.createStringLiteral(def.id),
            ...(def.parameters
                ? [
                    typescript_1.factory.createObjectLiteralExpression([
                        ...Object.values(def.parameters).map((p) => typescript_1.factory.createPropertyAssignment(typescript_1.factory.createIdentifier(p.id ?? "value"), typescript_1.factory.createIdentifier(p.name ?? "value"))),
                    ], false),
                ]
                : []),
        ])),
    ], true));
}
function createDriverGetDeclaration(def) {
    return typescript_1.factory.createGetAccessorDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.PublicKeyword)], typescript_1.factory.createIdentifier(def.name), [], typescript_1.factory.createUnionTypeNode(Object.values(def.dataType).map(createDriverPropertyReturnType)), typescript_1.factory.createBlock([
        typescript_1.factory.createReturnStatement(typescript_1.factory.createPropertyAccessChain(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createThis(), typescript_1.factory.createIdentifier("drivers")), typescript_1.factory.createIdentifier(def.id)), typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.QuestionDotToken), typescript_1.factory.createIdentifier("value"))),
    ], true));
}
function createNodeClass(nodeClassDef) {
    return {
        name: nodeClassDef.name,
        id: nodeClassDef.id,
        statements: [
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(false, undefined, typescript_1.factory.createNamedImports([
                typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier("UnitOfMeasure")),
            ])), typescript_1.factory.createStringLiteral("../../../Definitions/Global/UOM.js"), undefined),
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(false, undefined, typescript_1.factory.createNamedImports([
                typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier("Family")),
            ])), typescript_1.factory.createStringLiteral("../../../Definitions/Global/Families.js"), undefined),
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(true, undefined, typescript_1.factory.createNamedImports([
                typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier("NodeInfo")),
            ])), typescript_1.factory.createStringLiteral("../../../Definitions/NodeInfo.js"), undefined),
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(true, undefined, typescript_1.factory.createNamedImports([typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier("ISY"))])), typescript_1.factory.createStringLiteral("../../../ISY.js"), undefined),
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(false, undefined, typescript_1.factory.createNamedImports([
                typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier("ISYDeviceNode")),
            ])), typescript_1.factory.createStringLiteral("../../../ISYNode.js"), undefined),
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(false, undefined, typescript_1.factory.createNamedImports([
                typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier("Driver")),
            ])), typescript_1.factory.createStringLiteral("../../../Definitions/Global/Drivers.js"), undefined),
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(true, undefined, typescript_1.factory.createNamedImports([
                typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier("DriverState")),
            ])), typescript_1.factory.createStringLiteral("../../../Model/DriverState.js"), undefined),
            typescript_1.factory.createVariableStatement([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.ExportKeyword)], typescript_1.factory.createVariableDeclarationList([
                typescript_1.factory.createVariableDeclaration(typescript_1.factory.createIdentifier("nodeDefId"), undefined, undefined, typescript_1.factory.createStringLiteral(nodeClassDef.id)),
            ], ts_morph_1.ts.NodeFlags.Const)),
            typescript_1.factory.createTypeAliasDeclaration(undefined, typescript_1.factory.createIdentifier("Commands"), undefined, typescript_1.factory.createTypeLiteralNode([...Object.values(nodeClassDef.commands).map(createCommandSignature)])),
            typescript_1.factory.createTypeAliasDeclaration(undefined, typescript_1.factory.createIdentifier("Drivers"), undefined, typescript_1.factory.createTypeLiteralNode([...Object.values(nodeClassDef.drivers).map(createDriverSignature)])),
            typescript_1.factory.createClassDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.ExportKeyword)], typescript_1.factory.createIdentifier(nodeClassDef.name), undefined, [
                typescript_1.factory.createHeritageClause(ts_morph_1.ts.SyntaxKind.ExtendsKeyword, [
                    typescript_1.factory.createExpressionWithTypeArguments(typescript_1.factory.createIdentifier("ISYDeviceNode"), [
                        typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createQualifiedName(typescript_1.factory.createIdentifier("Family"), typescript_1.factory.createIdentifier(index_js_1.Family[nodeClassDef.family])), undefined),
                        typescript_1.factory.createTypeOperatorNode(ts_morph_1.ts.SyntaxKind.KeyOfKeyword, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier("Drivers"), undefined)),
                        typescript_1.factory.createTypeOperatorNode(ts_morph_1.ts.SyntaxKind.KeyOfKeyword, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier("Commands"), undefined)),
                    ]),
                ]),
            ], [
                typescript_1.factory.createPropertyDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.PublicKeyword), typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.ReadonlyKeyword)], typescript_1.factory.createIdentifier("commands"), undefined, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier("Commands"), undefined), typescript_1.factory.createObjectLiteralExpression([
                    ...Object.values(nodeClassDef.commands).map((c) => typescript_1.factory.createPropertyAssignment(typescript_1.factory.createIdentifier(c.id), typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createThis(), typescript_1.factory.createIdentifier(c.name)))),
                ], true)),
                typescript_1.factory.createPropertyDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.PublicKeyword)], typescript_1.factory.createIdentifier("drivers"), undefined, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier("Drivers"), undefined), typescript_1.factory.createObjectLiteralExpression([], false)),
                typescript_1.factory.createPropertyDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.StaticKeyword)], typescript_1.factory.createIdentifier("nodeDefId"), undefined, undefined, typescript_1.factory.createStringLiteral(nodeClassDef.id)),
                typescript_1.factory.createConstructorDeclaration(undefined, [
                    typescript_1.factory.createParameterDeclaration(undefined, undefined, typescript_1.factory.createIdentifier("isy"), undefined, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier("ISY"), undefined), undefined),
                    typescript_1.factory.createParameterDeclaration(undefined, undefined, typescript_1.factory.createIdentifier("nodeInfo"), undefined, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier("NodeInfo"), undefined), undefined),
                ], typescript_1.factory.createBlock([
                    typescript_1.factory.createExpressionStatement(typescript_1.factory.createCallExpression(typescript_1.factory.createSuper(), undefined, [
                        typescript_1.factory.createIdentifier("isy"),
                        typescript_1.factory.createIdentifier("nodeInfo"),
                    ])),
                    ...Object.values(nodeClassDef.drivers).map(createDriverInitializationStatement),
                ], true)),
                ...Object.values(nodeClassDef.commands).map(createCommandMethodDeclaration),
                ...Object.values(nodeClassDef.drivers).map(createDriverGetDeclaration),
            ]),
        ],
    };
}
function createMemberName(name, mapNullishTo = 'Unknown') {
    let label = (0, moderndash_1.pascalCase)(name) ?? 'Unknown';
    if (!label.substring(0, 1).match(/[a-zA-Z]/)) {
        if (!isNaN(Number.parseInt(label))) {
            return typescript_1.factory.createIdentifier(`_${label}`);
        }
        return typescript_1.factory.createStringLiteral(label);
    }
    return typescript_1.factory.createIdentifier(label);
}
//# sourceMappingURL=EnumFactory.js.map