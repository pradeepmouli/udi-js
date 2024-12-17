import { IndentationText, Project, QuoteKind, ScriptTarget } from 'ts-morph';
import ts, { factory } from 'typescript';
import { UnitOfMeasure } from '../Definitions/Global/UOM.js';
import { Family } from '../Definitions/index.js';
import { NodeClassDefinition } from '../Model/ClassDefinition.js';
import { EnumDefinitionMap } from '../Model/EnumDefinition.js';
import { CodeFactory } from './CodeFactory.js';
// #endregion Type aliases (1)
// #region Classes (1)
export class NodeClassFactory extends CodeFactory {
    // #region Properties (2)
    static _basePath;
    static project = new Project({
        compilerOptions: { target: ScriptTarget.ESNext, module: ts.ModuleKind.ESNext },
        manipulationSettings: {
            usePrefixAndSuffixTextForRename: true,
            quoteKind: QuoteKind.Single,
            useTrailingCommas: false,
            indentationText: IndentationText.Tab,
            newLineKind: ts.NewLineKind.CarriageReturnLineFeed,
            insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: true
        }
    });
    static instance = new NodeClassFactory(ts.factory);
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
        return Object.values(map)
            .filter((p) => !p.equivalentTo)
            .map((p) => {
            try {
                return NodeClassFactory.instance.createNodeClass(p);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    createNodeClass(nodeClassDef) {
        let path = `${NodeClassFactory.basePath}/${Family[nodeClassDef.family]}/Generated/${nodeClassDef.name}.ts`;
        let sf = ts.createSourceFile(path, '', ts.ScriptTarget.ES2024, true, ts.ScriptKind.TS);
        //@ts-expect-error
        sf.statements = [
            this.createImportDeclaration('../../../Definitions/Global/index.js', ['Family', ' UnitOfMeasure']),
            this.createImportDeclaration('../../../Model/NodeInfo.js', ['NodeInfo'], true),
            this.createImportDeclaration('../../../ISY.js', ['ISY']),
            this.createImportDeclaration('../../../ISYNode.js', ['ISYNode']),
            this.createImportDeclaration('../index.js', ['Base']),
            this.createImportDeclaration('../../ISYDeviceNode.js', ['ISYDeviceNode']),
            this.createImportDeclaration('../../../Definitions/Global/Drivers.js', ['Driver']),
            this.createImportDeclaration('type-fest', ['IntRange'], true),
            this.createImportDeclaration('../../../Model/DriverState,js', ['DriverState'], true),
            factory.createImportDeclaration(undefined, factory.createImportClause(false, undefined, factory.createNamedImports([factory.createImportSpecifier(false, undefined, factory.createIdentifier(Family[nodeClassDef.family]))])), factory.createStringLiteral('../../../Definitions/index.js'), undefined),
            this.createImportDeclaration('../../NodeFactory.js', ['NodeFactory']),
            factory.createVariableStatement(undefined, factory.createVariableDeclarationList([factory.createVariableDeclaration(factory.createIdentifier('nodeDefId'), undefined, undefined, factory.createStringLiteral(nodeClassDef.id))], ts.NodeFlags.Const)),
            factory.createTypeAliasDeclaration(undefined, factory.createIdentifier('Commands'), undefined, factory.createTypeReferenceNode(this.createQualifiedName(nodeClassDef.name, 'Commands', 'Type'))),
            factory.createTypeAliasDeclaration(undefined, factory.createIdentifier('Drivers'), undefined, factory.createTypeReferenceNode(this.createQualifiedName(nodeClassDef.name, 'Drivers', 'Type'), undefined)),
            factory.createClassDeclaration([], factory.createIdentifier(`${nodeClassDef.name}Node`), undefined, [
                factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
                    factory.createExpressionWithTypeArguments(factory.createIdentifier('Base'), [
                        factory.createTypeReferenceNode(factory.createIdentifier('Drivers'), undefined),
                        factory.createTypeReferenceNode(factory.createIdentifier('Commands'), undefined)
                    ])
                ]),
                factory.createHeritageClause(ts.SyntaxKind.ImplementsKeyword, [
                    factory.createExpressionWithTypeArguments(factory.createPropertyAccessExpression(factory.createIdentifier(nodeClassDef.name), factory.createIdentifier('Interface')), undefined)
                ])
            ], [
                factory.createPropertyDeclaration([factory.createToken(ts.SyntaxKind.PublicKeyword), factory.createToken(ts.SyntaxKind.OverrideKeyword), factory.createToken(ts.SyntaxKind.ReadonlyKeyword)], factory.createIdentifier('commands'), undefined, undefined, factory.createObjectLiteralExpression([
                    ...Object.values(nodeClassDef.commands).map((c) => factory.createPropertyAssignment(factory.createIdentifier(c.id), factory.createPropertyAccessExpression(factory.createThis(), factory.createIdentifier(c.name))))
                ], true)),
                // factory.createPropertyDeclaration(
                //   [factory.createToken(ts.SyntaxKind.PublicKeyword)],
                //   factory.createIdentifier("drivers"),
                //   undefined,
                //   factory.createTypeReferenceNode(factory.createIdentifier("Drivers"), undefined),
                //   factory.createObjectLiteralExpression([], false)
                // ),
                factory.createPropertyDeclaration([factory.createToken(ts.SyntaxKind.StaticKeyword), factory.createToken(ts.SyntaxKind.OverrideKeyword)], factory.createIdentifier('nodeDefId'), undefined, undefined, factory.createStringLiteral(nodeClassDef.id)),
                NodeClassFactory.instance.createPropertyDeclaration('implements', factory.createArrayLiteralExpression(nodeClassDef.implementedBy ?
                    [NodeClassFactory.instance.createStringLiteral(nodeClassDef.id)].concat(!nodeClassDef.implements || nodeClassDef.implements.length == 0 ? [] : nodeClassDef.implements?.map((p) => factory.createStringLiteral(p)))
                    : [NodeClassFactory.instance.createStringLiteral(nodeClassDef.id)]), NodeClassFactory.instance.createModifiers(ts.ModifierFlags.Static | ts.ModifierFlags.Override)),
                factory.createPropertyDeclaration([factory.createToken(ts.SyntaxKind.DeclareKeyword), factory.createToken(ts.SyntaxKind.ReadonlyKeyword)], factory.createIdentifier('nodeDefId'), undefined, nodeClassDef.equivalents ?
                    NodeClassFactory.instance.createUnionTypeNode(...[NodeClassFactory.instance.createLiteralTypeNode(nodeClassDef.id)].concat(!nodeClassDef.equivalents || nodeClassDef.equivalents.length == 0 ? [] : nodeClassDef.equivalents?.map((p) => factory.createLiteralTypeNode(factory.createStringLiteral(p)))))
                    : NodeClassFactory.instance.createLiteralTypeNode(nodeClassDef.id), undefined),
                factory.createConstructorDeclaration(undefined, [
                    factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier('isy'), undefined, factory.createTypeReferenceNode(factory.createIdentifier('ISY'), undefined), undefined),
                    factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier('nodeInfo'), undefined, factory.createTypeReferenceNode(factory.createIdentifier('NodeInfo'), undefined), undefined)
                ], factory.createBlock([
                    factory.createExpressionStatement(factory.createCallExpression(factory.createSuper(), undefined, [factory.createIdentifier('isy'), factory.createIdentifier('nodeInfo')])),
                    ...Object.values(nodeClassDef.drivers).map((p) => NodeClassFactory.instance.createDriverInitializationStatement(p))
                ], true)),
                ...Object.values(nodeClassDef.commands).map((p) => NodeClassFactory.instance.createCommandMethodDeclaration(p)),
                ...Object.values(nodeClassDef.drivers).map((p) => NodeClassFactory.instance.createDriverGetDeclaration(p))
            ]),
            factory.createExpressionStatement(factory.createCallExpression(factory.createPropertyAccessExpression(factory.createIdentifier('NodeFactory'), factory.createIdentifier('register')), undefined, [
                factory.createIdentifier(`${nodeClassDef.name}Node`)
            ])),
            ...(nodeClassDef.equivalents ?
                nodeClassDef.equivalents?.map((p) => factory.createExpressionStatement(factory.createCallExpression(factory.createPropertyAccessExpression(factory.createIdentifier('NodeFactory'), factory.createIdentifier('register')), undefined, [
                    factory.createIdentifier(`${nodeClassDef.name}Node`),
                    factory.createStringLiteral(p)
                ])))
                : []),
            factory.createModuleDeclaration([factory.createToken(ts.SyntaxKind.ExportKeyword)], factory.createIdentifier(nodeClassDef.name), factory.createModuleBlock([
                factory.createInterfaceDeclaration([factory.createToken(ts.SyntaxKind.ExportKeyword)], factory.createIdentifier('Interface'), undefined, [
                    factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
                        factory.createExpressionWithTypeArguments(factory.createIdentifier('Omit'), [
                            NodeClassFactory.instance.createTypeReferenceNode('InstanceType', NodeClassFactory.instance.factory.createTypeQueryNode(factory.createIdentifier(`${nodeClassDef.name}Node`))),
                            factory.createTypeOperatorNode(ts.SyntaxKind.KeyOfKeyword, factory.createTypeReferenceNode(factory.createIdentifier('ISYDeviceNode'), [
                                factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                                factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                                factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                                factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
                            ]))
                        ])
                    ])
                ], [
                /*factory.createPropertySignature(
                    undefined,
                    factory.createIdentifier('nodeDefId'),
                    undefined,
                    nodeClassDef.equivalents ?
                        NodeClassFactory.instance.createUnionTypeNode(
                            ...[NodeClassFactory.instance.createLiteralTypeNode(nodeClassDef.id)].concat(
                                !nodeClassDef.equivalents || nodeClassDef.equivalents.length == 0 ? [] : nodeClassDef.equivalents?.map((p) => factory.createLiteralTypeNode(factory.createStringLiteral(p)))
                            )
                        )
                    :	NodeClassFactory.instance.createLiteralTypeNode(nodeClassDef.id)
                )*/
                ]),
                factory.createFunctionDeclaration([factory.createToken(ts.SyntaxKind.ExportKeyword)], undefined, factory.createIdentifier('is'), undefined, [
                    factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier('node'), undefined, factory.createTypeReferenceNode(factory.createIdentifier('ISYNode'), [
                        factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                        factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                        factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
                        factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
                    ]), undefined)
                ], factory.createTypePredicateNode(undefined, factory.createIdentifier('node'), factory.createTypeReferenceNode(factory.createIdentifier(`${nodeClassDef.name}Node`), undefined)), NodeClassFactory.instance.createBlock(true, NodeClassFactory.instance.createReturnStatement(factory.createCallExpression(factory.createPropertyAccessExpression(factory.createArrayLiteralExpression(nodeClassDef.equivalents ?
                    [NodeClassFactory.instance.createStringLiteral(nodeClassDef.id)].concat(!nodeClassDef.equivalents || nodeClassDef.equivalents.length == 0 ? [] : nodeClassDef.equivalents?.map((p) => factory.createStringLiteral(p)))
                    : [NodeClassFactory.instance.createStringLiteral(nodeClassDef.id)]), 'includes'), undefined, [factory.createPropertyAccessExpression(factory.createIdentifier('node'), factory.createIdentifier('nodeDefId'))])))),
                factory.createFunctionDeclaration([factory.createToken(ts.SyntaxKind.ExportKeyword)], undefined, factory.createIdentifier('isImplementedBy'), undefined, [
                    factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier('node'), undefined, NodeClassFactory.instance.createTypeReferenceNode('ISYNode', NodeClassFactory.instance.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword), NodeClassFactory.instance.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword), NodeClassFactory.instance.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword), NodeClassFactory.instance.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)), undefined)
                ], factory.createTypePredicateNode(undefined, factory.createIdentifier('node'), factory.createTypeReferenceNode(factory.createIdentifier(`${nodeClassDef.name}Node`), undefined)), NodeClassFactory.instance.createBlock(true, factory.createReturnStatement(factory.createCallExpression(factory.createPropertyAccessExpression(factory.createArrayLiteralExpression(nodeClassDef.implementedBy ?
                    [NodeClassFactory.instance.createStringLiteral(nodeClassDef.id)].concat(!nodeClassDef.implementedBy || nodeClassDef.implementedBy.length == 0 ? [] : nodeClassDef.implementedBy?.map((p) => factory.createStringLiteral(p)))
                    : [NodeClassFactory.instance.createStringLiteral(nodeClassDef.id)]), 'includes'), undefined, [factory.createPropertyAccessExpression(factory.createIdentifier('node'), factory.createIdentifier('nodeDefId'))])))),
                factory.createFunctionDeclaration([factory.createToken(ts.SyntaxKind.ExportKeyword)], undefined, factory.createIdentifier('create'), undefined, [
                    factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier('isy'), undefined, factory.createTypeReferenceNode(factory.createIdentifier('ISY'), undefined), undefined),
                    factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier('nodeInfo'), undefined, factory.createTypeReferenceNode(factory.createIdentifier('NodeInfo'), undefined), undefined)
                ], undefined, factory.createBlock([
                    factory.createReturnStatement(factory.createNewExpression(factory.createIdentifier(`${nodeClassDef.name}Node`), undefined, [factory.createIdentifier('isy'), factory.createIdentifier('nodeInfo')]))
                ], true)),
                factory.createVariableStatement([factory.createToken(ts.SyntaxKind.ExportKeyword)], factory.createVariableDeclarationList([factory.createVariableDeclaration(factory.createIdentifier('Node'), undefined, undefined, factory.createIdentifier(`${nodeClassDef.name}Node`))], ts.NodeFlags.Const)),
                this.createVariableStatement('Class', factory.createIdentifier(`${nodeClassDef.name}Node`), true),
                this.createModuleDeclaration('Commands', this.createModuleBlock(factory.createTypeAliasDeclaration([factory.createToken(ts.SyntaxKind.ExportKeyword)], factory.createIdentifier('Type'), undefined, factory.createTypeLiteralNode([...Object.values(nodeClassDef.commands).map(NodeClassFactory.instance.createCommandSignature)]))), ts.ModifierFlags.Export),
                this.factory.createEnumDeclaration([factory.createToken(ts.SyntaxKind.ExportKeyword)], factory.createIdentifier('Commands'), [
                    ...Object.values(nodeClassDef.commands).map((p) => factory.createEnumMember(p.name, this.createLiteral(p.id)))
                ]),
                this.createModuleDeclaration('Drivers', this.createModuleBlock(factory.createTypeAliasDeclaration([factory.createToken(ts.SyntaxKind.ExportKeyword)], factory.createIdentifier('Type'), undefined, factory.createTypeLiteralNode([...Object.values(nodeClassDef.drivers).map(NodeClassFactory.instance.createDriverSignature)]))), ts.ModifierFlags.Export),
                this.factory.createEnumDeclaration([factory.createToken(ts.SyntaxKind.ExportKeyword)], factory.createIdentifier('Drivers'), [
                    ...Object.values(nodeClassDef.drivers).map((p) => factory.createEnumMember(p.name, this.createLiteral(p.id)))
                ])
            ]), ts.NodeFlags.Namespace)
        ];
        //let f = createWrappedNode(sf);
        let p = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
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
            indentStyle: ts.IndentStyle.Smart
        });
        f.fixUnusedIdentifiers();
        let currentKind = ts.SyntaxKind.Unknown;
        for (const s of f.getStatements()) {
            if (currentKind.valueOf() != s.getKind().valueOf()) {
                if (currentKind != ts.SyntaxKind.Unknown) {
                    s.prependWhitespace('\n');
                }
                currentKind = s.getKind().valueOf();
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
        for (const family of NodeClassDefinition.Map.keys()) {
            var t = this.generateClassesForFamily(family);
            modules.push(NodeClassFactory.buildClassIndex(family, t));
        }
        return modules;
    }
    static generateClassesForFamily(family) {
        return NodeClassFactory.buildNodeClasses(NodeClassDefinition.Map.get(family));
    }
    // #region Functions (12)
    static buildClassIndex(family, classes) {
        return {
            family,
            path: `/${Family[family]}/Generated/index.ts`,
            statements: [...classes.map((p) => factory.createExportDeclaration(undefined, false, undefined, factory.createStringLiteral(`./${p.name}.js`), undefined))]
        };
    }
    createCommandArguments(def) {
        let c = [factory.createStringLiteral(def.id)];
        let n = [];
        let r = [];
        if (def.parameters) {
            for (let p of def.parameters) {
                let p2 = p;
                if (!p2?.id || p2.id == 'value') {
                    n.push(factory.createIdentifier(p2.name ?? 'value'));
                }
                else {
                    r.push(p2);
                }
            }
        }
        let fnl = [
            ...c,
            ...n,
            ...(r.length > 0 ?
                [
                    factory.createObjectLiteralExpression(r.map((q) => factory.createPropertyAssignment(factory.createIdentifier(q.id ?? 'value'), factory.createIdentifier(q.name ?? 'value'))), false)
                ]
                : [])
        ];
        return fnl.length > 0 ? fnl : undefined;
    }
    createCommandMethodDeclaration(def) {
        return factory.createMethodDeclaration([factory.createToken(ts.SyntaxKind.AsyncKeyword)], undefined, factory.createIdentifier(def.name), undefined, undefined, def.parameters ? Object.values(def.parameters).map(NodeClassFactory.instance.createParameterDeclarationSignature.bind(this)) : undefined, undefined, factory.createBlock([
            factory.createReturnStatement(factory.createCallExpression(factory.createPropertyAccessExpression(factory.createThis(), factory.createIdentifier('sendCommand')), undefined, NodeClassFactory.instance.createCommandArguments(def)))
        ]));
    }
    createCommandParameterType(def, parent) {
        if (def.enum) {
            {
                if (EnumDefinitionMap.has(parent.classDef.family)) {
                    var enumDef = EnumDefinitionMap.get(parent.classDef.family)[def.indexId];
                    // ?? EnumDefinitionMap[Family.Global]?[def.indexId]
                    if (enumDef) {
                        return factory.createTypeReferenceNode(factory.createQualifiedName(factory.createIdentifier(Family[parent.classDef.family]), factory.createIdentifier(enumDef.name)), undefined);
                    }
                }
                if (def.values) {
                    return NodeClassFactory.instance.createUnionTypeNode(...Object.keys(def.values).map((p) => factory.createLiteralTypeNode(factory.createNumericLiteral(p))));
                }
                //   return NodeClassFactory.instance.createUnionTypeNode(...
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
    createCommandSignature(def) {
        const that = this;
        return factory.createPropertySignature(undefined, factory.createIdentifier(def.id), undefined, factory.createIntersectionTypeNode([
            factory.createParenthesizedType(factory.createFunctionTypeNode(undefined, def.parameters ? Object.values(def.parameters).map((p) => NodeClassFactory.instance.createParameterSignature(p)) : [], factory.createTypeReferenceNode(factory.createIdentifier('Promise'), [factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword)]))),
            factory.createTypeLiteralNode([
                factory.createPropertySignature(undefined, factory.createIdentifier('label'), undefined, factory.createLiteralTypeNode(factory.createStringLiteral(def.label))),
                factory.createPropertySignature(undefined, factory.createIdentifier('name'), undefined, factory.createLiteralTypeNode(factory.createStringLiteral(def.name)))
            ])
        ]));
    }
    createDriverGetDeclaration(def) {
        return factory.createGetAccessorDeclaration([factory.createToken(ts.SyntaxKind.PublicKeyword)], factory.createIdentifier(def.name), [], NodeClassFactory.instance.createUnionTypeNode(...def.dataType?.map((p) => NodeClassFactory.instance.createDriverReturnType(p, def))), factory.createBlock([
            factory.createReturnStatement(factory.createPropertyAccessChain(factory.createPropertyAccessExpression(factory.createPropertyAccessExpression(factory.createThis(), factory.createIdentifier('drivers')), factory.createIdentifier(def.id)), factory.createToken(ts.SyntaxKind.QuestionDotToken), factory.createIdentifier('value')))
        ], true));
    }
    createDriverInitializationStatement(def) {
        return factory.createExpressionStatement(factory.createBinaryExpression(factory.createPropertyAccessExpression(factory.createPropertyAccessExpression(factory.createThis(), factory.createIdentifier('drivers')), factory.createIdentifier(def.id)), factory.createToken(ts.SyntaxKind.EqualsToken), factory.createCallExpression(factory.createPropertyAccessExpression(factory.createIdentifier('Driver'), factory.createIdentifier('create')), undefined, [
            factory.createStringLiteral(def.id),
            factory.createThis(),
            factory.createElementAccessExpression(factory.createPropertyAccessExpression(factory.createIdentifier('nodeInfo'), factory.createIdentifier('state')), this.createStringLiteral(def.id)),
            factory.createObjectLiteralExpression([
                factory.createPropertyAssignment(factory.createIdentifier('uom'), factory.createPropertyAccessExpression(factory.createIdentifier('UnitOfMeasure'), factory.createIdentifier(UnitOfMeasure[def.dataType[0]?.uom] ?? 'Unknown'))),
                factory.createPropertyAssignment(factory.createIdentifier('label'), factory.createStringLiteral(def.label)),
                factory.createPropertyAssignment(factory.createIdentifier('name'), factory.createStringLiteral(def.name))
            ], false)
        ])));
    }
    createDriverPropertyReturnType(def, parent) {
        if (def.enum) {
            {
                if (EnumDefinitionMap.has(parent.classDef.family)) {
                    var enumDef = EnumDefinitionMap.get(parent.classDef.family)[def.indexId];
                    // ?? EnumDefinitionMap[Family.Global]?[def.indexId]
                    if (enumDef) {
                        return factory.createTypeReferenceNode(factory.createQualifiedName(factory.createIdentifier(Family[parent.classDef.family]), factory.createIdentifier(enumDef.name)), undefined);
                    }
                }
                if (def.values) {
                    return NodeClassFactory.instance.createUnionTypeNode(...Object.keys(def.values).map((p) => factory.createLiteralTypeNode(factory.createNumericLiteral(p))));
                }
                //   return NodeClassFactory.instance.createUnionTypeNode(...
                //     Object.values(def.values).map((p) => factory.createTypeReferenceNode(
                //   factory.createQualifiedName(
                //     factory.createIdentifier("UnitOfMeasure"),
                //     factory.createIdentifier(UnitOfMeasure)
                //   ),
                //   undefined
                // )))
            }
        }
        if ('min' in def && 'max' in def) {
            return factory.createTypeReferenceNode(factory.createIdentifier('IntRange'), [
                factory.createLiteralTypeNode(this.createLiteral(def.min)),
                factory.createLiteralTypeNode(this.createLiteral(def.max))
            ]);
        }
        return factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
    }
    createDriverSignature(def) {
        return factory.createPropertySignature(undefined, factory.createIdentifier(def.id), undefined, factory.createTypeLiteralNode([
            factory.createPropertySignature(undefined, factory.createIdentifier('uom'), undefined, def.dataType ?
                NodeClassFactory.instance.createUnionTypeNode(...def.dataType?.map((p) => NodeClassFactory.instance.createTypeNodeForUOM(p.uom)))
                : factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)),
            factory.createPropertySignature(undefined, factory.createIdentifier('value'), undefined, def.dataType ?
                NodeClassFactory.instance.createUnionTypeNode(...def.dataType.map((p) => NodeClassFactory.instance.createDriverReturnType(p, def)))
                : factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)),
            factory.createPropertySignature(undefined, factory.createIdentifier('label'), undefined, factory.createLiteralTypeNode(factory.createStringLiteral(def.label))),
            factory.createPropertySignature(undefined, factory.createIdentifier('name'), undefined, factory.createLiteralTypeNode(factory.createStringLiteral(def.name)))
        ]));
    }
    createDriverReturnType(def, parent) {
        if (def.enum) {
            {
                if (EnumDefinitionMap.has(parent.classDef.family)) {
                    var enumDef = EnumDefinitionMap.get(parent.classDef.family)[def.indexId];
                    // ?? EnumDefinitionMap[Family.Global]?[def.indexId]
                    if (enumDef) {
                        return factory.createTypeReferenceNode(factory.createQualifiedName(factory.createIdentifier(Family[parent.classDef.family]), factory.createIdentifier(enumDef.name)), undefined);
                    }
                }
                if (def.values) {
                    return NodeClassFactory.instance.createUnionTypeNode(...Object.keys(def.values).map((p) => factory.createLiteralTypeNode(factory.createNumericLiteral(p))));
                }
                //   return NodeClassFactory.instance.createUnionTypeNode(...
                //     Object.values(def.values).map((p) => factory.createTypeReferenceNode(
                //   factory.createQualifiedName(
                //     factory.createIdentifier("UnitOfMeasure"),
                //     factory.createIdentifier(UnitOfMeasure)
                //   ),
                //   undefined
                // )))
            }
        }
        if ('min' in def && 'max' in def && def.max < 1000 && def.min > -1000) {
            return factory.createTypeReferenceNode(factory.createIdentifier('IntRange'), [
                factory.createLiteralTypeNode(this.createLiteral(def.min)),
                factory.createLiteralTypeNode(this.createLiteral(def.max))
            ]);
        }
        return factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
    }
    createParameterDeclarationSignature(def) {
        return factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier(def.name ?? 'value'), def.optional ? factory.createToken(ts.SyntaxKind.QuestionToken) : undefined, def.dataType ?
            NodeClassFactory.instance.createUnionTypeNode(...def.dataType?.map((p) => NodeClassFactory.instance.createCommandParameterType(p, def)))
            : factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword), undefined);
    }
    createParameterSignature(def) {
        return factory.createParameterDeclaration(undefined, undefined, factory.createIdentifier(def.id ?? 'value'), def.optional ? factory.createToken(ts.SyntaxKind.QuestionToken) : undefined, def.dataType ?
            NodeClassFactory.instance.createUnionTypeNode(...def.dataType?.map((p) => NodeClassFactory.instance.createCommandParameterType(p, def)))
            : factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword), undefined);
    }
    createTypeNodeForUOM(uom) {
        return NodeClassFactory.instance.createTypeReferenceNode(UnitOfMeasure[uom] ?? 'Unknown', 'UnitOfMeasure');
    }
}
// #endregion Classes (1)
// #endregion Functions (12)
//# sourceMappingURL=NodeClassFactory.js.map