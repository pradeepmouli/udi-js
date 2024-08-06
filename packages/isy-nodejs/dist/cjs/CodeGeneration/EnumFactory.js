"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEnums = buildEnums;
exports.createEnum = createEnum;
exports.createNodeClass = createNodeClass;
const typescript_1 = __importStar(require("typescript"));
const UOM_js_1 = require("../Definitions/Global/UOM.js");
const ISY_js_1 = require("../ISY.js");
function buildEnums(map) {
    let enums = [];
    for (const indexId in map) {
        enums.push(createEnum(map[indexId]));
    }
    return enums;
}
function createEnum(enumDef) {
    return {
        name: enumDef.name,
        id: enumDef.id,
        statements: [
            typescript_1.factory.createEnumDeclaration([typescript_1.factory.createToken(typescript_1.default.SyntaxKind.ExportKeyword)], typescript_1.factory.createIdentifier(enumDef.name), [
                ...Object.entries(enumDef.values).map(([name, value]) => typescript_1.factory.createEnumMember(typescript_1.factory.createIdentifier(name), typescript_1.factory.createNumericLiteral(value)))
            ])
        ]
    };
}
function createDriverInitializationStatement(def) {
    return typescript_1.factory.createExpressionStatement(typescript_1.factory.createBinaryExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createThis(), typescript_1.factory.createIdentifier("drivers")), typescript_1.factory.createIdentifier(def.id)), typescript_1.factory.createToken(typescript_1.default.SyntaxKind.EqualsToken), typescript_1.factory.createCallExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier("Driver"), typescript_1.factory.createIdentifier("create")), undefined, [
        typescript_1.factory.createStringLiteral("ST"),
        typescript_1.factory.createThis(),
        typescript_1.factory.createAsExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier("nodeInfo"), typescript_1.factory.createIdentifier("property")), typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier("DriverState"), undefined)),
        typescript_1.factory.createObjectLiteralExpression([
            typescript_1.factory.createPropertyAssignment(typescript_1.factory.createIdentifier("uom"), typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier("UnitOfMeasure"), typescript_1.factory.createIdentifier(UOM_js_1.UnitOfMeasure[def.primaryDataType().uom] ?? "Unknown"))),
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
        return typescript_1.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.NumberKeyword);
}
function createDriverPropertyReturnType(def) {
    if (def.enum) {
        {
            if (Object.keys(def.values).length == 2) {
                return typescript_1.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.BooleanKeyword);
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
        return typescript_1.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.NumberKeyword);
}
function createParameterSignature(def) {
    return typescript_1.factory.createParameterDeclaration(undefined, undefined, typescript_1.factory.createIdentifier(def.id ?? "value"), undefined, undefined, undefined);
}
function createCommandSignature(def) {
    return typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier(def.id), undefined, typescript_1.factory.createFunctionTypeNode(undefined, def.parameters ? Object.values(def.parameters).map(createParameterSignature) : [], typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier("Promise"), [
        typescript_1.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.BooleanKeyword),
    ])));
}
function createDriverSignature(def) {
    return typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier(def.id), typescript_1.factory.createToken(typescript_1.default.SyntaxKind.QuestionToken), typescript_1.factory.createTypeLiteralNode([
        typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier("uom"), undefined, def.dataType
            ? typescript_1.factory.createUnionTypeNode(Object.values(def.dataType).map((p) => createTypeNodeForUOM(p.uom)))
            : typescript_1.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.NumberKeyword)),
        typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier("value"), undefined, def.dataType
            ? typescript_1.factory.createUnionTypeNode(Object.values(def.dataType).map(createDriverSignatureReturnType))
            : typescript_1.factory.createKeywordTypeNode(typescript_1.default.SyntaxKind.NumberKeyword)),
    ]));
}
function createTypeNodeForUOM(uom) {
    return typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createQualifiedName(typescript_1.factory.createIdentifier("UnitOfMeasure"), typescript_1.factory.createIdentifier(UOM_js_1.UnitOfMeasure[uom] ?? "Unknown")));
}
function createParameterDeclarationSignature(def) {
    return typescript_1.factory.createParameterDeclaration(undefined, undefined, typescript_1.factory.createIdentifier(def.name ?? "value"), undefined, undefined, undefined);
}
function createCommandMethodDeclaration(def) {
    return typescript_1.factory.createMethodDeclaration([typescript_1.factory.createToken(typescript_1.default.SyntaxKind.AsyncKeyword)], undefined, typescript_1.factory.createIdentifier(def.name), undefined, undefined, def.parameters ? Object.values(def.parameters).map(createParameterDeclarationSignature) : undefined, undefined, typescript_1.factory.createBlock([
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
    return typescript_1.factory.createGetAccessorDeclaration([typescript_1.factory.createToken(typescript_1.default.SyntaxKind.PublicKeyword)], typescript_1.factory.createIdentifier(def.name), [], typescript_1.factory.createUnionTypeNode(Object.values(def.dataType).map(createDriverPropertyReturnType)), typescript_1.factory.createBlock([
        typescript_1.factory.createReturnStatement(typescript_1.factory.createPropertyAccessChain(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createThis(), typescript_1.factory.createIdentifier("drivers")), typescript_1.factory.createIdentifier(def.id)), typescript_1.factory.createToken(typescript_1.default.SyntaxKind.QuestionDotToken), typescript_1.factory.createIdentifier("value"))),
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
            typescript_1.factory.createVariableStatement([typescript_1.factory.createToken(typescript_1.default.SyntaxKind.ExportKeyword)], typescript_1.factory.createVariableDeclarationList([
                typescript_1.factory.createVariableDeclaration(typescript_1.factory.createIdentifier("nodeDefId"), undefined, undefined, typescript_1.factory.createStringLiteral(nodeClassDef.id)),
            ], typescript_1.default.NodeFlags.Const)),
            typescript_1.factory.createTypeAliasDeclaration(undefined, typescript_1.factory.createIdentifier("Commands"), undefined, typescript_1.factory.createTypeLiteralNode([...Object.values(nodeClassDef.commands).map(createCommandSignature)])),
            typescript_1.factory.createTypeAliasDeclaration(undefined, typescript_1.factory.createIdentifier("Drivers"), undefined, typescript_1.factory.createTypeLiteralNode([...Object.values(nodeClassDef.drivers).map(createDriverSignature)])),
            typescript_1.factory.createClassDeclaration([typescript_1.factory.createToken(typescript_1.default.SyntaxKind.ExportKeyword)], typescript_1.factory.createIdentifier(nodeClassDef.name), undefined, [
                typescript_1.factory.createHeritageClause(typescript_1.default.SyntaxKind.ExtendsKeyword, [
                    typescript_1.factory.createExpressionWithTypeArguments(typescript_1.factory.createIdentifier("ISYDeviceNode"), [
                        typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createQualifiedName(typescript_1.factory.createIdentifier("Family"), typescript_1.factory.createIdentifier(ISY_js_1.Family[nodeClassDef.family])), undefined),
                        typescript_1.factory.createTypeOperatorNode(typescript_1.default.SyntaxKind.KeyOfKeyword, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier("Drivers"), undefined)),
                        typescript_1.factory.createTypeOperatorNode(typescript_1.default.SyntaxKind.KeyOfKeyword, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier("Commands"), undefined)),
                    ]),
                ]),
            ], [
                typescript_1.factory.createPropertyDeclaration([typescript_1.factory.createToken(typescript_1.default.SyntaxKind.PublicKeyword), typescript_1.factory.createToken(typescript_1.default.SyntaxKind.ReadonlyKeyword)], typescript_1.factory.createIdentifier("commands"), undefined, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier("Commands"), undefined), typescript_1.factory.createObjectLiteralExpression([
                    ...Object.values(nodeClassDef.commands).map((c) => typescript_1.factory.createPropertyAssignment(typescript_1.factory.createIdentifier(c.id), typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createThis(), typescript_1.factory.createIdentifier(c.name)))),
                ], true)),
                typescript_1.factory.createPropertyDeclaration([typescript_1.factory.createToken(typescript_1.default.SyntaxKind.PublicKeyword)], typescript_1.factory.createIdentifier("drivers"), undefined, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier("Drivers"), undefined), typescript_1.factory.createObjectLiteralExpression([], false)),
                typescript_1.factory.createPropertyDeclaration([typescript_1.factory.createToken(typescript_1.default.SyntaxKind.StaticKeyword)], typescript_1.factory.createIdentifier("nodeDefId"), undefined, undefined, typescript_1.factory.createStringLiteral(nodeClassDef.id)),
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
//# sourceMappingURL=EnumFactory.js.map