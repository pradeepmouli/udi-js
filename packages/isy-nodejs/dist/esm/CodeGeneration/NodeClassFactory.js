import ts, { factory } from 'typescript';
import { UnitOfMeasure } from '../Definitions/Global/UOM.js';
import { Family } from '../ISY.js';
import { EnumDefinitionMap } from '../Model/EnumDefinition.js';
export function buildNodeClasses(map) {
    return Object.values(map).map(createNodeClass);
}
function createDriverInitializationStatement(def) {
    return factory.createExpressionStatement(factory.createBinaryExpression(factory.createPropertyAccessExpression(factory.createPropertyAccessExpression(factory.createThis(), factory.createIdentifier("drivers")), factory.createIdentifier(def.id)), factory.createToken(ts.SyntaxKind.EqualsToken), factory.createCallExpression(factory.createPropertyAccessExpression(factory.createIdentifier("Driver"), factory.createIdentifier("create")), undefined, [
        factory.createStringLiteral("ST"),
        factory.createThis(),
        factory.createAsExpression(factory.createPropertyAccessExpression(factory.createIdentifier("nodeInfo"), factory.createIdentifier("property")), factory.createTypeReferenceNode(factory.createIdentifier("DriverState"), undefined)),
        factory.createObjectLiteralExpression([
            factory.createPropertyAssignment(factory.createIdentifier("uom"), factory.createPropertyAccessExpression(factory.createIdentifier("UnitOfMeasure"), factory.createIdentifier(UnitOfMeasure[def.primaryDataType().uom] ?? "Unknown"))),
            factory.createPropertyAssignment(factory.createIdentifier("label"), factory.createStringLiteral(def.label)),
            factory.createPropertyAssignment(factory.createIdentifier("name"), factory.createStringLiteral(def.name)),
        ], false),
    ])));
}
function createDriverSignatureReturnType(def, parent) {
    if (def.enum) {
        if (EnumDefinitionMap.has(parent.classDef.family)) {
            var enumDef = EnumDefinitionMap.get(parent.classDef.family)[def.indexId];
            // ?? EnumDefinitionMap[Family.Global]?[def.indexId]
            if (enumDef) {
                return factory.createTypeReferenceNode(factory.createIdentifier(enumDef.name), undefined);
            }
        }
        if (def.values) {
            return factory.createUnionTypeNode(Object.keys(def.values).map((p) => factory.createLiteralTypeNode(factory.createNumericLiteral(p))));
        }
    }
    return factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
}
function createDriverPropertyReturnType(def, parent) {
    if (def.enum) {
        {
            if (EnumDefinitionMap.has(parent.classDef.family)) {
                var enumDef = EnumDefinitionMap.get(parent.classDef.family)[def.indexId];
                // ?? EnumDefinitionMap[Family.Global]?[def.indexId]
                if (enumDef) {
                    return factory.createTypeReferenceNode(factory.createIdentifier(enumDef.name), undefined);
                }
            }
            if (def.values) {
                return factory.createUnionTypeNode(Object.keys(def.values).map((p) => factory.createLiteralTypeNode(factory.createNumericLiteral(p))));
            }
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
    return factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
}
function createCommandParameterType(def, parent) {
    if (def.enum) {
        {
            if (EnumDefinitionMap.has(parent.classDef.family)) {
                var enumDef = EnumDefinitionMap.get(parent.classDef.family)[def.indexId];
                // ?? EnumDefinitionMap[Family.Global]?[def.indexId]
                if (enumDef) {
                    return factory.createTypeReferenceNode(factory.createIdentifier(enumDef.name), undefined);
                }
            }
            if (def.values) {
                return factory.createUnionTypeNode(Object.keys(def.values).map((p) => factory.createLiteralTypeNode(factory.createNumericLiteral(p))));
            }
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
    return factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
}
function createParameterSignature(def) {
    return factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier(def.id ?? "value"), undefined, def.dataType
        ? factory.createUnionTypeNode(Object.values(def.dataType).map(p => createCommandParameterType(p, def)))
        : factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword), undefined);
}
function createCommandSignature(def) {
    return factory.createPropertySignature(undefined, factory.createIdentifier(def.id), undefined, factory.createFunctionTypeNode(undefined, def.parameters ? Object.values(def.parameters).map(createParameterSignature) : [], factory.createTypeReferenceNode(factory.createIdentifier("Promise"), [
        factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
    ])));
}
function createDriverSignature(def) {
    return factory.createPropertySignature(undefined, factory.createIdentifier(def.id), factory.createToken(ts.SyntaxKind.QuestionToken), factory.createTypeLiteralNode([
        factory.createPropertySignature(undefined, factory.createIdentifier("uom"), undefined, def.dataType
            ? factory.createUnionTypeNode(Object.values(def.dataType).map((p) => createTypeNodeForUOM(p.uom)))
            : factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)),
        factory.createPropertySignature(undefined, factory.createIdentifier("value"), undefined, def.dataType
            ? factory.createUnionTypeNode(Object.values(def.dataType).map(p => createDriverSignatureReturnType(p, def)))
            : factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)),
    ]));
}
function createTypeNodeForUOM(uom) {
    return factory.createTypeReferenceNode(factory.createQualifiedName(factory.createIdentifier("UnitOfMeasure"), factory.createIdentifier(UnitOfMeasure[uom] ?? "Unknown")));
}
function createParameterDeclarationSignature(def) {
    return factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier(def.name ?? "value"), undefined, def.dataType
        ? factory.createUnionTypeNode(Object.values(def.dataType).map(p => createCommandParameterType(p, def)))
        : factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword), undefined);
}
function createCommandMethodDeclaration(def) {
    return factory.createMethodDeclaration([factory.createToken(ts.SyntaxKind.AsyncKeyword)], undefined, factory.createIdentifier(def.name), undefined, undefined, def.parameters ? Object.values(def.parameters).map(createParameterDeclarationSignature) : undefined, undefined, factory.createBlock([
        factory.createReturnStatement(factory.createCallExpression(factory.createPropertyAccessExpression(factory.createThis(), factory.createIdentifier("sendCommand")), undefined, [
            factory.createStringLiteral(def.id),
            ...(def.parameters
                ? [
                    factory.createObjectLiteralExpression([
                        ...Object.values(def.parameters).map((p) => factory.createPropertyAssignment(factory.createIdentifier(p.id ?? "value"), factory.createIdentifier(p.name ?? "value"))),
                    ], false),
                ]
                : []),
        ])),
    ], true));
}
function createDriverGetDeclaration(def) {
    return factory.createGetAccessorDeclaration([factory.createToken(ts.SyntaxKind.PublicKeyword)], factory.createIdentifier(def.name), [], factory.createUnionTypeNode(Object.values(def.dataType).map(p => createDriverPropertyReturnType(p, def))), factory.createBlock([
        factory.createReturnStatement(factory.createPropertyAccessChain(factory.createPropertyAccessExpression(factory.createPropertyAccessExpression(factory.createThis(), factory.createIdentifier("drivers")), factory.createIdentifier(def.id)), factory.createToken(ts.SyntaxKind.QuestionDotToken), factory.createIdentifier("value"))),
    ], true));
}
export function createNodeClass(nodeClassDef) {
    return {
        name: nodeClassDef.name,
        id: nodeClassDef.id,
        statements: [
            factory.createImportDeclaration(undefined, factory.createImportClause(false, undefined, factory.createNamedImports([
                factory.createImportSpecifier(false, undefined, factory.createIdentifier("UnitOfMeasure")),
            ])), factory.createStringLiteral("../../../Definitions/Global/UOM.js"), undefined),
            factory.createImportDeclaration(undefined, factory.createImportClause(false, undefined, factory.createNamedImports([
                factory.createImportSpecifier(false, undefined, factory.createIdentifier("Family")),
            ])), factory.createStringLiteral("../../../Definitions/Global/Families.js"), undefined),
            factory.createImportDeclaration(undefined, factory.createImportClause(true, undefined, factory.createNamedImports([
                factory.createImportSpecifier(false, undefined, factory.createIdentifier("NodeInfo")),
            ])), factory.createStringLiteral("../../../Definitions/NodeInfo.js"), undefined),
            factory.createImportDeclaration(undefined, factory.createImportClause(true, undefined, factory.createNamedImports([factory.createImportSpecifier(false, undefined, factory.createIdentifier("ISY"))])), factory.createStringLiteral("../../../ISY.js"), undefined),
            factory.createImportDeclaration(undefined, factory.createImportClause(false, undefined, factory.createNamedImports([
                factory.createImportSpecifier(false, undefined, factory.createIdentifier("ISYDeviceNode")),
            ])), factory.createStringLiteral("../../../ISYNode.js"), undefined),
            factory.createImportDeclaration(undefined, factory.createImportClause(false, undefined, factory.createNamedImports([
                factory.createImportSpecifier(false, undefined, factory.createIdentifier("Driver")),
            ])), factory.createStringLiteral("../../../Definitions/Global/Drivers.js"), undefined),
            factory.createImportDeclaration(undefined, factory.createImportClause(true, undefined, factory.createNamedImports([
                factory.createImportSpecifier(false, undefined, factory.createIdentifier("DriverState")),
            ])), factory.createStringLiteral("../../../Model/DriverState.js"), undefined),
            factory.createVariableStatement([factory.createToken(ts.SyntaxKind.ExportKeyword)], factory.createVariableDeclarationList([
                factory.createVariableDeclaration(factory.createIdentifier("nodeDefId"), undefined, undefined, factory.createStringLiteral(nodeClassDef.id)),
            ], ts.NodeFlags.Const)),
            factory.createTypeAliasDeclaration(undefined, factory.createIdentifier("Commands"), undefined, factory.createTypeLiteralNode([...Object.values(nodeClassDef.commands).map(createCommandSignature)])),
            factory.createTypeAliasDeclaration(undefined, factory.createIdentifier("Drivers"), undefined, factory.createTypeLiteralNode([...Object.values(nodeClassDef.drivers).map(createDriverSignature)])),
            factory.createClassDeclaration([factory.createToken(ts.SyntaxKind.ExportKeyword)], factory.createIdentifier(nodeClassDef.name), undefined, [
                factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
                    factory.createExpressionWithTypeArguments(factory.createIdentifier("ISYDeviceNode"), [
                        factory.createTypeReferenceNode(factory.createQualifiedName(factory.createIdentifier("Family"), factory.createIdentifier(Family[nodeClassDef.family])), undefined),
                        factory.createTypeOperatorNode(ts.SyntaxKind.KeyOfKeyword, factory.createTypeReferenceNode(factory.createIdentifier("Drivers"), undefined)),
                        factory.createTypeOperatorNode(ts.SyntaxKind.KeyOfKeyword, factory.createTypeReferenceNode(factory.createIdentifier("Commands"), undefined)),
                    ]),
                ]),
            ], [
                factory.createPropertyDeclaration([factory.createToken(ts.SyntaxKind.PublicKeyword), factory.createToken(ts.SyntaxKind.ReadonlyKeyword)], factory.createIdentifier("commands"), undefined, factory.createTypeReferenceNode(factory.createIdentifier("Commands"), undefined), factory.createObjectLiteralExpression([
                    ...Object.values(nodeClassDef.commands).map((c) => factory.createPropertyAssignment(factory.createIdentifier(c.id), factory.createPropertyAccessExpression(factory.createThis(), factory.createIdentifier(c.name)))),
                ], true)),
                factory.createPropertyDeclaration([factory.createToken(ts.SyntaxKind.PublicKeyword)], factory.createIdentifier("drivers"), undefined, factory.createTypeReferenceNode(factory.createIdentifier("Drivers"), undefined), factory.createObjectLiteralExpression([], false)),
                factory.createPropertyDeclaration([factory.createToken(ts.SyntaxKind.StaticKeyword)], factory.createIdentifier("nodeDefId"), undefined, undefined, factory.createStringLiteral(nodeClassDef.id)),
                factory.createConstructorDeclaration(undefined, [
                    factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier("isy"), undefined, factory.createTypeReferenceNode(factory.createIdentifier("ISY"), undefined), undefined),
                    factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier("nodeInfo"), undefined, factory.createTypeReferenceNode(factory.createIdentifier("NodeInfo"), undefined), undefined),
                ], factory.createBlock([
                    factory.createExpressionStatement(factory.createCallExpression(factory.createSuper(), undefined, [
                        factory.createIdentifier("isy"),
                        factory.createIdentifier("nodeInfo"),
                    ])),
                    ...Object.values(nodeClassDef.drivers).map(createDriverInitializationStatement),
                ], true)),
                ...Object.values(nodeClassDef.commands).map(createCommandMethodDeclaration),
                ...Object.values(nodeClassDef.drivers).map(createDriverGetDeclaration),
            ]),
        ],
    };
}
//# sourceMappingURL=NodeClassFactory.js.map