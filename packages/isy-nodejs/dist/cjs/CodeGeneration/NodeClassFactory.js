"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeClassFactory = void 0;
const ts_morph_1 = require("ts-morph");
const typescript_1 = require("typescript");
const UOM_js_1 = require("../Definitions/Global/UOM.js");
const ISY_js_1 = require("../ISY.js");
const ClassDefinition_js_1 = require("../Model/ClassDefinition.js");
const EnumDefinition_js_1 = require("../Model/EnumDefinition.js");
// #endregion Type aliases (1)
// #region Classes (1)
class NodeClassFactory {
    // #region Properties (2)
    static _basePath;
    static project = new ts_morph_1.Project({
        compilerOptions: { target: ts_morph_1.ts.ScriptTarget.ESNext, module: ts_morph_1.ts.ModuleKind.ESNext },
        manipulationSettings: {
            usePrefixAndSuffixTextForRename: true,
            quoteKind: ts_morph_1.QuoteKind.Single,
            useTrailingCommas: false,
            indentationText: ts_morph_1.IndentationText.Tab,
            newLineKind: ts_morph_1.ts.NewLineKind.CarriageReturnLineFeed,
            insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true
        }
    });
    // #endregion Properties (2)
    // #region Public Static Getters And Setters (2)
    static get basePath() {
        return (this._basePath ??= './');
    }
    static set basePath(value) {
        this._basePath = value;
    }
    // #endregion Public Static Getters And Setters (2)
    // #region Public Static Methods (4)
    static buildNodeClasses(map) {
        return Object.values(map).map((p) => this.createNodeClass(p));
    }
    static createNodeClass(nodeClassDef) {
        let path = `${NodeClassFactory.basePath}/${ISY_js_1.Family[nodeClassDef.family]}/Generated/${nodeClassDef.name}.ts`;
        let sf = ts_morph_1.ts.createSourceFile(path, '', ts_morph_1.ts.ScriptTarget.ES2023, true, ts_morph_1.ts.ScriptKind.TS);
        //@ts-expect-error
        sf.statements = [
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(false, undefined, typescript_1.factory.createNamedImports([typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier('UnitOfMeasure'))])), typescript_1.factory.createStringLiteral('../../../Definitions/Global/UOM.js'), undefined),
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(false, undefined, typescript_1.factory.createNamedImports([typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier('Family'))])), typescript_1.factory.createStringLiteral('../../../Definitions/Global/Families.js'), undefined),
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(true, undefined, typescript_1.factory.createNamedImports([typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier('NodeInfo'))])), typescript_1.factory.createStringLiteral('../../../Model/NodeInfo.js'), undefined),
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(true, undefined, typescript_1.factory.createNamedImports([typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier('ISY'))])), typescript_1.factory.createStringLiteral('../../../ISY.js'), undefined),
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(true, undefined, typescript_1.factory.createNamedImports([typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier('ISYNode'))])), typescript_1.factory.createStringLiteral('../../../ISYNode.js'), undefined),
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(false, undefined, typescript_1.factory.createNamedImports([typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier('Base'))])), typescript_1.factory.createStringLiteral('../index.js'), undefined),
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(false, undefined, typescript_1.factory.createNamedImports([typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier('ISYDeviceNode'))])), typescript_1.factory.createStringLiteral('../../ISYDeviceNode.js'), undefined),
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(false, undefined, typescript_1.factory.createNamedImports([typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier('Driver'))])), typescript_1.factory.createStringLiteral('../../../Definitions/Global/Drivers.js'), undefined),
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(false, undefined, typescript_1.factory.createNamedImports([typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier(ISY_js_1.Family[nodeClassDef.family]))])), typescript_1.factory.createStringLiteral('../../../Definitions/index.js'), undefined),
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(true, undefined, typescript_1.factory.createNamedImports([typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier('DriverState'))])), typescript_1.factory.createStringLiteral('../../../Model/DriverState.js'), undefined),
            typescript_1.factory.createImportDeclaration(undefined, typescript_1.factory.createImportClause(false, undefined, typescript_1.factory.createNamedImports([typescript_1.factory.createImportSpecifier(false, undefined, typescript_1.factory.createIdentifier('NodeFactory'))])), typescript_1.factory.createStringLiteral('../../NodeFactory.js'), undefined),
            typescript_1.factory.createVariableStatement([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.ExportKeyword)], typescript_1.factory.createVariableDeclarationList([typescript_1.factory.createVariableDeclaration(typescript_1.factory.createIdentifier('nodeDefId'), undefined, undefined, typescript_1.factory.createStringLiteral(nodeClassDef.id))], ts_morph_1.ts.NodeFlags.Const)),
            typescript_1.factory.createTypeAliasDeclaration(undefined, typescript_1.factory.createIdentifier('Commands'), undefined, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createQualifiedName(typescript_1.factory.createIdentifier(nodeClassDef.name), typescript_1.factory.createIdentifier('Commands')), undefined)),
            typescript_1.factory.createTypeAliasDeclaration(undefined, typescript_1.factory.createIdentifier('Drivers'), undefined, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createQualifiedName(typescript_1.factory.createIdentifier(nodeClassDef.name), typescript_1.factory.createIdentifier('Drivers')), undefined)),
            typescript_1.factory.createClassDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.ExportKeyword)], typescript_1.factory.createIdentifier(`${nodeClassDef.name}Node`), undefined, [
                nodeClassDef.extends ?
                    typescript_1.factory.createHeritageClause(ts_morph_1.ts.SyntaxKind.ExtendsKeyword, [
                        typescript_1.factory.createExpressionWithTypeArguments(typescript_1.factory.createIdentifier(ClassDefinition_js_1.NodeClassDefinition.Map.get(nodeClassDef.family)[nodeClassDef.extends].name), undefined)
                    ])
                    : typescript_1.factory.createHeritageClause(ts_morph_1.ts.SyntaxKind.ExtendsKeyword, [
                        typescript_1.factory.createExpressionWithTypeArguments(typescript_1.factory.createIdentifier('Base'), [
                            typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier('Drivers'), undefined),
                            typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier('Commands'), undefined)
                        ])
                    ]),
                typescript_1.factory.createHeritageClause(ts_morph_1.ts.SyntaxKind.ImplementsKeyword, [
                    typescript_1.factory.createExpressionWithTypeArguments(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier(nodeClassDef.name), typescript_1.factory.createIdentifier('Interface')), undefined)
                ])
            ], [
                typescript_1.factory.createPropertyDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.PublicKeyword), typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.ReadonlyKeyword)], typescript_1.factory.createIdentifier('commands'), undefined, undefined, typescript_1.factory.createObjectLiteralExpression([
                    ...Object.values(nodeClassDef.commands).map((c) => typescript_1.factory.createPropertyAssignment(typescript_1.factory.createIdentifier(c.id), typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createThis(), typescript_1.factory.createIdentifier(c.name))))
                ], true)),
                // factory.createPropertyDeclaration(
                //   [factory.createToken(ts.SyntaxKind.PublicKeyword)],
                //   factory.createIdentifier("drivers"),
                //   undefined,
                //   factory.createTypeReferenceNode(factory.createIdentifier("Drivers"), undefined),
                //   factory.createObjectLiteralExpression([], false)
                // ),
                typescript_1.factory.createPropertyDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.StaticKeyword)], typescript_1.factory.createIdentifier('nodeDefId'), undefined, undefined, typescript_1.factory.createStringLiteral(nodeClassDef.id)),
                typescript_1.factory.createPropertyDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.DeclareKeyword), typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.ReadonlyKeyword)], typescript_1.factory.createIdentifier('nodeDefId'), undefined, typescript_1.factory.createLiteralTypeNode(typescript_1.factory.createStringLiteral(nodeClassDef.id)), undefined),
                typescript_1.factory.createConstructorDeclaration(undefined, [
                    typescript_1.factory.createParameterDeclaration(undefined, undefined, typescript_1.factory.createIdentifier('isy'), undefined, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier('ISY'), undefined), undefined),
                    typescript_1.factory.createParameterDeclaration(undefined, undefined, typescript_1.factory.createIdentifier('nodeInfo'), undefined, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier('NodeInfo'), undefined), undefined)
                ], typescript_1.factory.createBlock([
                    typescript_1.factory.createExpressionStatement(typescript_1.factory.createCallExpression(typescript_1.factory.createSuper(), undefined, [typescript_1.factory.createIdentifier('isy'), typescript_1.factory.createIdentifier('nodeInfo')])),
                    ...Object.values(nodeClassDef.drivers).map(createDriverInitializationStatement)
                ], true)),
                ...Object.values(nodeClassDef.commands).map(createCommandMethodDeclaration),
                ...Object.values(nodeClassDef.drivers).map(createDriverGetDeclaration)
            ]),
            typescript_1.factory.createExpressionStatement(typescript_1.factory.createCallExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier('NodeFactory'), typescript_1.factory.createIdentifier('register')), undefined, [
                typescript_1.factory.createIdentifier(`${nodeClassDef.name}Node`)
            ])),
            typescript_1.factory.createModuleDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.ExportKeyword)], typescript_1.factory.createIdentifier(nodeClassDef.name), typescript_1.factory.createModuleBlock([
                typescript_1.factory.createInterfaceDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.ExportKeyword)], typescript_1.factory.createIdentifier('Interface'), undefined, [
                    typescript_1.factory.createHeritageClause(ts_morph_1.ts.SyntaxKind.ExtendsKeyword, [
                        typescript_1.factory.createExpressionWithTypeArguments(typescript_1.factory.createIdentifier('Omit'), [
                            typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier('InstanceType'), [typescript_1.factory.createTypeQueryNode(typescript_1.factory.createIdentifier(`${nodeClassDef.name}Node`), undefined)]),
                            typescript_1.factory.createTypeOperatorNode(ts_morph_1.ts.SyntaxKind.KeyOfKeyword, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier('ISYDeviceNode'), [
                                typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.AnyKeyword),
                                typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.AnyKeyword),
                                typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.AnyKeyword),
                                typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.AnyKeyword)
                            ]))
                        ])
                    ])
                ], [typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier('nodeDefId'), undefined, typescript_1.factory.createLiteralTypeNode(typescript_1.factory.createStringLiteral(nodeClassDef.id)))]),
                typescript_1.factory.createFunctionDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.ExportKeyword)], undefined, typescript_1.factory.createIdentifier('is'), undefined, [
                    typescript_1.factory.createParameterDeclaration(undefined, undefined, typescript_1.factory.createIdentifier('node'), undefined, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier('ISYNode'), [
                        typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.AnyKeyword),
                        typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.AnyKeyword),
                        typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.AnyKeyword),
                        typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.AnyKeyword)
                    ]), undefined)
                ], typescript_1.factory.createTypePredicateNode(undefined, typescript_1.factory.createIdentifier('node'), typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier(`${nodeClassDef.name}Node`), undefined)), typescript_1.factory.createBlock([
                    typescript_1.factory.createReturnStatement(typescript_1.factory.createBinaryExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier('node'), typescript_1.factory.createIdentifier('nodeDefId')), typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.EqualsEqualsEqualsToken), typescript_1.factory.createIdentifier('nodeDefId')))
                ], true)),
                typescript_1.factory.createFunctionDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.ExportKeyword)], undefined, typescript_1.factory.createIdentifier('create'), undefined, [
                    typescript_1.factory.createParameterDeclaration(undefined, undefined, typescript_1.factory.createIdentifier('isy'), undefined, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier('ISY'), undefined), undefined),
                    typescript_1.factory.createParameterDeclaration(undefined, undefined, typescript_1.factory.createIdentifier('nodeInfo'), undefined, typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier('NodeInfo'), undefined), undefined)
                ], undefined, typescript_1.factory.createBlock([
                    typescript_1.factory.createReturnStatement(typescript_1.factory.createNewExpression(typescript_1.factory.createIdentifier(`${nodeClassDef.name}Node`), undefined, [typescript_1.factory.createIdentifier('isy'), typescript_1.factory.createIdentifier('nodeInfo')]))
                ], true)),
                typescript_1.factory.createVariableStatement([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.ExportKeyword)], typescript_1.factory.createVariableDeclarationList([typescript_1.factory.createVariableDeclaration(typescript_1.factory.createIdentifier('Node'), undefined, undefined, typescript_1.factory.createIdentifier(`${nodeClassDef.name}Node`))], ts_morph_1.ts.NodeFlags.Const)),
                typescript_1.factory.createTypeAliasDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.ExportKeyword)], typescript_1.factory.createIdentifier('Commands'), undefined, typescript_1.factory.createTypeLiteralNode([...Object.values(nodeClassDef.commands).map(createCommandSignature)])),
                typescript_1.factory.createTypeAliasDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.ExportKeyword)], typescript_1.factory.createIdentifier('Drivers'), undefined, typescript_1.factory.createTypeLiteralNode([...Object.values(nodeClassDef.drivers).map(createDriverSignature)]))
            ]), ts_morph_1.ts.NodeFlags.Namespace)
        ];
        //let f = createWrappedNode(sf);
        let p = ts_morph_1.ts.createPrinter({ newLine: ts_morph_1.ts.NewLineKind.LineFeed });
        // p.printFile()
        let f = NodeClassFactory.project.createSourceFile(path, p.printFile(sf), { overwrite: true });
        f.formatText({
            indentSize: 1,
            insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true,
            insertSpaceAfterCommaDelimiter: true,
            insertSpaceAfterSemicolonInForStatements: true,
            insertSpaceBeforeAndAfterBinaryOperators: true,
            insertSpaceAfterConstructor: true,
            newLineCharacter: '\n',
            trimTrailingWhitespace: true,
            ensureNewLineAtEndOfFile: true,
            indentStyle: ts_morph_1.ts.IndentStyle.Smart
        });
        let currentKind = ts_morph_1.ts.SyntaxKind.Unknown;
        for (const s of f.getStatements()) {
            if (currentKind != s.getKind()) {
                if (currentKind != ts_morph_1.ts.SyntaxKind.Unknown) {
                    s.prependWhitespace('\n');
                }
                currentKind = s.getKind();
            }
        }
        f.insertText(0, '/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */\n\n');
        return {
            family: nodeClassDef.family,
            name: nodeClassDef.name,
            id: nodeClassDef.id,
            path,
            statements: sf.statements,
            sourceFile: f
        };
    }
    static generateAll() {
        let modules = [];
        for (const family of ClassDefinition_js_1.NodeClassDefinition.Map.keys()) {
            var t = this.generateClassesForFamily(family);
            modules.push(buildClassIndex(family, t));
        }
        return modules;
    }
    static generateClassesForFamily(family) {
        return this.buildNodeClasses(ClassDefinition_js_1.NodeClassDefinition.Map.get(family));
    }
}
exports.NodeClassFactory = NodeClassFactory;
// #endregion Classes (1)
// #region Functions (12)
function buildClassIndex(family, classes) {
    return {
        family,
        path: `/${ISY_js_1.Family[family]}/Generated/index.ts`,
        statements: [...classes.map((p) => typescript_1.factory.createExportDeclaration(undefined, false, undefined, typescript_1.factory.createStringLiteral(`./${p.name}.js`), undefined))]
    };
}
function createCommandMethodDeclaration(def) {
    return typescript_1.factory.createMethodDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.AsyncKeyword)], undefined, typescript_1.factory.createIdentifier(def.name), undefined, undefined, def.parameters ? Object.values(def.parameters).map(createParameterDeclarationSignature) : undefined, undefined, typescript_1.factory.createBlock([
        typescript_1.factory.createReturnStatement(typescript_1.factory.createCallExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createThis(), typescript_1.factory.createIdentifier('sendCommand')), undefined, [
            typescript_1.factory.createStringLiteral(def.id),
            ...(def.parameters ?
                [
                    typescript_1.factory.createObjectLiteralExpression([...Object.values(def.parameters).map((p) => typescript_1.factory.createPropertyAssignment(typescript_1.factory.createIdentifier(p.id ?? 'value'), typescript_1.factory.createIdentifier(p.name ?? 'value')))], false)
                ]
                : [])
        ]))
    ], true));
}
function createCommandParameterType(def, parent) {
    if (def.enum) {
        {
            if (EnumDefinition_js_1.EnumDefinitionMap.has(parent.classDef.family)) {
                var enumDef = EnumDefinition_js_1.EnumDefinitionMap.get(parent.classDef.family)[def.indexId];
                // ?? EnumDefinitionMap[Family.Global]?[def.indexId]
                if (enumDef) {
                    return typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createQualifiedName(typescript_1.factory.createIdentifier(ISY_js_1.Family[parent.classDef.family]), typescript_1.factory.createIdentifier(enumDef.name)), undefined);
                }
            }
            if (def.values) {
                return typescript_1.factory.createUnionTypeNode(Object.keys(def.values).map((p) => typescript_1.factory.createLiteralTypeNode(typescript_1.factory.createNumericLiteral(p))));
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
    return typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.NumberKeyword);
}
function createCommandSignature(def) {
    return typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier(def.id), undefined, typescript_1.factory.createIntersectionTypeNode([
        typescript_1.factory.createParenthesizedType(typescript_1.factory.createFunctionTypeNode(undefined, def.parameters ? Object.values(def.parameters).map(createParameterSignature) : [], typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier('Promise'), [typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.BooleanKeyword)]))),
        typescript_1.factory.createTypeLiteralNode([
            typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier('label'), undefined, typescript_1.factory.createLiteralTypeNode(typescript_1.factory.createStringLiteral(def.label))),
            typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier('name'), undefined, typescript_1.factory.createLiteralTypeNode(typescript_1.factory.createStringLiteral(def.name)))
        ])
    ]));
}
function createDriverGetDeclaration(def) {
    return typescript_1.factory.createGetAccessorDeclaration([typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.PublicKeyword)], typescript_1.factory.createIdentifier(def.name), [], typescript_1.factory.createUnionTypeNode(Object.values(def.dataType).map((p) => createDriverPropertyReturnType(p, def))), typescript_1.factory.createBlock([
        typescript_1.factory.createReturnStatement(typescript_1.factory.createPropertyAccessChain(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createThis(), typescript_1.factory.createIdentifier('drivers')), typescript_1.factory.createIdentifier(def.id)), typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.QuestionDotToken), typescript_1.factory.createIdentifier('value')))
    ], true));
}
function createDriverInitializationStatement(def) {
    return typescript_1.factory.createExpressionStatement(typescript_1.factory.createBinaryExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createThis(), typescript_1.factory.createIdentifier('drivers')), typescript_1.factory.createIdentifier(def.id)), typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.EqualsToken), typescript_1.factory.createCallExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier('Driver'), typescript_1.factory.createIdentifier('create')), undefined, [
        typescript_1.factory.createStringLiteral(def.id),
        typescript_1.factory.createThis(),
        typescript_1.factory.createAsExpression(typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier('nodeInfo'), typescript_1.factory.createIdentifier('property')), typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createIdentifier('DriverState'), undefined)),
        typescript_1.factory.createObjectLiteralExpression([
            typescript_1.factory.createPropertyAssignment(typescript_1.factory.createIdentifier('uom'), typescript_1.factory.createPropertyAccessExpression(typescript_1.factory.createIdentifier('UnitOfMeasure'), typescript_1.factory.createIdentifier(UOM_js_1.UnitOfMeasure[parseInt(Object.keys(def.dataType)[0])] ?? 'Unknown'))),
            typescript_1.factory.createPropertyAssignment(typescript_1.factory.createIdentifier('label'), typescript_1.factory.createStringLiteral(def.label)),
            typescript_1.factory.createPropertyAssignment(typescript_1.factory.createIdentifier('name'), typescript_1.factory.createStringLiteral(def.name))
        ], false)
    ])));
}
function createDriverPropertyReturnType(def, parent) {
    if (def.enum) {
        {
            if (EnumDefinition_js_1.EnumDefinitionMap.has(parent.classDef.family)) {
                var enumDef = EnumDefinition_js_1.EnumDefinitionMap.get(parent.classDef.family)[def.indexId];
                // ?? EnumDefinitionMap[Family.Global]?[def.indexId]
                if (enumDef) {
                    return typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createQualifiedName(typescript_1.factory.createIdentifier(ISY_js_1.Family[parent.classDef.family]), typescript_1.factory.createIdentifier(enumDef.name)), undefined);
                }
            }
            if (def.values) {
                return typescript_1.factory.createUnionTypeNode(Object.keys(def.values).map((p) => typescript_1.factory.createLiteralTypeNode(typescript_1.factory.createNumericLiteral(p))));
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
    return typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.NumberKeyword);
}
function createDriverSignature(def) {
    return typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier(def.id), undefined, typescript_1.factory.createTypeLiteralNode([
        typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier('uom'), undefined, def.dataType ? typescript_1.factory.createUnionTypeNode(Object.values(def.dataType).map((p) => createTypeNodeForUOM(p.uom))) : typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.NumberKeyword)),
        typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier('value'), undefined, def.dataType ? typescript_1.factory.createUnionTypeNode(Object.values(def.dataType).map((p) => createDriverSignatureReturnType(p, def))) : typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.NumberKeyword)),
        typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier('label'), undefined, typescript_1.factory.createLiteralTypeNode(typescript_1.factory.createStringLiteral(def.label))),
        typescript_1.factory.createPropertySignature(undefined, typescript_1.factory.createIdentifier('name'), undefined, typescript_1.factory.createLiteralTypeNode(typescript_1.factory.createStringLiteral(def.name)))
    ]));
}
function createDriverSignatureReturnType(def, parent) {
    if (def.enum) {
        if (EnumDefinition_js_1.EnumDefinitionMap.has(parent.classDef.family)) {
            var enumDef = EnumDefinition_js_1.EnumDefinitionMap.get(parent.classDef.family)[def.indexId];
            // ?? EnumDefinitionMap[Family.Global]?[def.indexId]
            if (enumDef) {
                return typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createQualifiedName(typescript_1.factory.createIdentifier(ISY_js_1.Family[parent.classDef.family]), typescript_1.factory.createIdentifier(enumDef.name)), undefined);
            }
        }
        if (def.values) {
            return typescript_1.factory.createUnionTypeNode(Object.keys(def.values).map((p) => typescript_1.factory.createLiteralTypeNode(typescript_1.factory.createNumericLiteral(p))));
        }
    }
    return typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.NumberKeyword);
}
function createParameterDeclarationSignature(def) {
    return typescript_1.factory.createParameterDeclaration(undefined, undefined, typescript_1.factory.createIdentifier(def.name ?? 'value'), def.optional ? typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.QuestionToken) : undefined, def.dataType ? typescript_1.factory.createUnionTypeNode(Object.values(def.dataType).map((p) => createCommandParameterType(p, def))) : typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.NumberKeyword), undefined);
}
function createParameterSignature(def) {
    return typescript_1.factory.createParameterDeclaration(undefined, undefined, typescript_1.factory.createIdentifier(def.id ?? 'value'), def.optional ? typescript_1.factory.createToken(ts_morph_1.ts.SyntaxKind.QuestionToken) : undefined, def.dataType ? typescript_1.factory.createUnionTypeNode(Object.values(def.dataType).map((p) => createCommandParameterType(p, def))) : typescript_1.factory.createKeywordTypeNode(ts_morph_1.ts.SyntaxKind.NumberKeyword), undefined);
}
function createTypeNodeForUOM(uom) {
    return typescript_1.factory.createTypeReferenceNode(typescript_1.factory.createQualifiedName(typescript_1.factory.createIdentifier('UnitOfMeasure'), typescript_1.factory.createIdentifier(UOM_js_1.UnitOfMeasure[uom] ?? 'Unknown')));
}
// #endregion Functions (12)
//# sourceMappingURL=NodeClassFactory.js.map