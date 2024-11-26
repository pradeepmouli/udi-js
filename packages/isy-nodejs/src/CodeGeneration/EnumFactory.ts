import { factory } from "typescript";
import ts from "typescript";
import { UnitOfMeasure } from "../Definitions/Global/UOM.js";

import type {
  NodeClassDefinition,
  DriverDefinition,
  ParameterDefinition,
  CommandDefinition,
  DataTypeDefinition,
} from "../Model/ClassDefinition.js";
import { EnumDefinition, EnumDefinitionMap } from "../Model/EnumDefinition.js";
import { isGeneratorFunction } from "util/types";
import { Logger, loggers } from "winston";
import { pascalCase } from 'moderndash';
import { Family } from '../Definitions/index.js';


const logger = loggers.get("EnumFactory");

export function buildEnums<T extends Family>(map: { [x: string]: EnumDefinition<T> }): GeneratedEnum<T>[] {
  let enums = [];
  for (const indexId in map) {
    enums.push(createEnum(map[indexId]));
  }
  return enums;
}

type GeneratedEnum<T extends Family> = {
  family: T;
  name: string;
  id: string;
  path: string;
  statements: ts.EnumDeclaration[];
};

export function createEnum<T extends Family>(enumDef: EnumDefinition<T>) : GeneratedEnum<T> {
  try {

    const enumNode : ts.EnumDeclaration = factory.createEnumDeclaration(
          [factory.createToken(ts.SyntaxKind.ExportKeyword)],
          factory.createIdentifier(enumDef.name),
          [
            ...Object.entries(enumDef.values).map(([name, value]) =>

              factory.createEnumMember(createMemberName(name), factory.createNumericLiteral(value))
            ),
          ]
        )

    return {
      family: enumDef.family,
      name: enumDef.name,
      path: `/${Family[enumDef.family]}/generated/${enumDef.name}.ts`,
      id: enumDef.id,
      statements: [enumNode]
    };
  } catch (e) {
    if (logger) logger.error(`Error creating ${Family[enumDef.family]} ${enumDef.name} enum: ${e.message}`, e.stack);
    else {
      throw e;
    }
  }
}

class CodeFactory {
}

export class EnumFactory extends CodeFactory {
  static generateEnumsForFamily<T extends Family>(family: T): GeneratedEnum<T>[] {
    return buildEnums<T>(EnumDefinitionMap.get(family) as { [x: string]: EnumDefinition<T> });
  }

  static generateAll() {
    let t = [];
    for (const key of EnumDefinitionMap.keys()) {
      try {
        let e = this.generateEnumsForFamily(key);
        t.push(...e);
        t.push(buildEnumIndex(key, e));
      } catch (e) {
        if (logger) logger.error(`Error generating enums for ${Family[key]}: ${e.message}`, e.stack);
        else {
          throw e;
        }
      }
    }
    return t
  }



}

function buildEnumIndex<T extends Family>(family: T, enums: GeneratedEnum<T>[]) {
  return {
    family,
    path: `/${Family[family]}/generated/index.ts`,
    statements: [
      ...enums.map((p) =>
        factory.createExportDeclaration(
          undefined,
          false,
          undefined,
          factory.createStringLiteral(`./${p.name}.js`),
          undefined
        )
      ),
    ],
  };
}

function createDriverInitializationStatement(def: DriverDefinition): ts.Statement {
  return factory.createExpressionStatement(
    factory.createBinaryExpression(
      factory.createPropertyAccessExpression(
        factory.createPropertyAccessExpression(factory.createThis(), factory.createIdentifier("drivers")),
        factory.createIdentifier(def.id)
      ),
      factory.createToken(ts.SyntaxKind.EqualsToken),
      factory.createCallExpression(
        factory.createPropertyAccessExpression(factory.createIdentifier("Driver"), factory.createIdentifier("create")),
        undefined,
        [
          factory.createStringLiteral("ST"),
          factory.createThis(),
          factory.createAsExpression(
            factory.createPropertyAccessExpression(
              factory.createIdentifier("nodeInfo"),
              factory.createIdentifier("property")
            ),
            factory.createTypeReferenceNode(factory.createIdentifier("DriverState"), undefined)
          ),
          factory.createObjectLiteralExpression(
            [
              factory.createPropertyAssignment(
                factory.createIdentifier("uom"),
                factory.createPropertyAccessExpression(
                  factory.createIdentifier("UnitOfMeasure"),
                  factory.createIdentifier(UnitOfMeasure[def.dataType[0]?.uom] ?? "Unknown")
                )
              ),
              factory.createPropertyAssignment(
                factory.createIdentifier("label"),
                factory.createStringLiteral(def.label)
              ),
              factory.createPropertyAssignment(factory.createIdentifier("name"), factory.createStringLiteral(def.name)),
            ],
            false
          ),
        ]
      )
    )
  );
}

function createDriverSignatureReturnType(def: DataTypeDefinition): ts.TypeNode {
  if (def.enum) {
    return factory.createUnionTypeNode(
      Object.keys(def.values).map((p) => factory.createLiteralTypeNode(factory.createNumericLiteral(p)))
    );
  } else return factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
}

function createDriverPropertyReturnType(def: DataTypeDefinition): ts.TypeNode {
  if (def.enum) {
    {
      if (Object.keys(def.values).length == 2) {
        return factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
      }
      return factory.createUnionTypeNode(
        Object.keys(def.values).map((p) => factory.createLiteralTypeNode(factory.createNumericLiteral(p)))
      );

      //   return factory.createUnionTypeNode(
      //     Object.values(def.values).map((p) => factory.createTypeReferenceNode(
      //   factory.createQualifiedName(
      //     factory.createIdentifier("UnitOfMeasure"),
      //     factory.createIdentifier(UnitOfMeasure)
      //   ),
      //   undefined
      // )))
    }
  } else return factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
}

function createParameterSignature(def: ParameterDefinition) {
  return factory.createParameterDeclaration(
    undefined,
    undefined,
    factory.createIdentifier(def.id ?? "value"),
    undefined,
    undefined,
    undefined
  );
}

function createCommandSignature(def: CommandDefinition) {
  return factory.createPropertySignature(
    undefined,
    factory.createIdentifier(def.id),
    undefined,
    factory.createFunctionTypeNode(
      undefined,
      def.parameters ? Object.values(def.parameters).map(createParameterSignature) : [],

      factory.createTypeReferenceNode(factory.createIdentifier("Promise"), [
        factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
      ])
    )
  );
}

function createDriverSignature(def: DriverDefinition) {
  return factory.createPropertySignature(
    undefined,
    factory.createIdentifier(def.id),
    factory.createToken(ts.SyntaxKind.QuestionToken),
    factory.createTypeLiteralNode([
      factory.createPropertySignature(
        undefined,
        factory.createIdentifier("uom"),
        undefined,
        def.dataType
          ? factory.createUnionTypeNode(Object.values(def.dataType).map((p) => createTypeNodeForUOM(p.uom)))
          : factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
      ),
      factory.createPropertySignature(
        undefined,
        factory.createIdentifier("value"),
        undefined,
        def.dataType
          ? factory.createUnionTypeNode(Object.values(def.dataType).map(createDriverSignatureReturnType))
          : factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
      ),
    ])
  );
}

function createTypeNodeForUOM(uom: number): ts.TypeNode {
  return factory.createTypeReferenceNode(
    factory.createQualifiedName(
      factory.createIdentifier("UnitOfMeasure"),
      factory.createIdentifier(UnitOfMeasure[uom] ?? "Unknown")
    )
  );
}

function createParameterDeclarationSignature(def: ParameterDefinition) {
  return factory.createParameterDeclaration(
    undefined,
    undefined,
    factory.createIdentifier(def.name ?? "value"),
    undefined,
    undefined,
    undefined
  );
}

function createCommandMethodDeclaration(def: CommandDefinition) {
  return factory.createMethodDeclaration(
    [factory.createToken(ts.SyntaxKind.AsyncKeyword)],
    undefined,
    factory.createIdentifier(def.name),
    undefined,
    undefined,

    def.parameters ? Object.values(def.parameters).map(createParameterDeclarationSignature) : undefined,
    undefined,
    factory.createBlock(
      [
        factory.createExpressionStatement(
          factory.createCallExpression(
            factory.createPropertyAccessExpression(factory.createThis(), factory.createIdentifier("sendCommand")),
            undefined,
            [
              factory.createStringLiteral(def.id),
              ...(def.parameters
                ? [
                    factory.createObjectLiteralExpression(
                      [
                        ...Object.values(def.parameters).map((p) =>
                          factory.createPropertyAssignment(
                            factory.createIdentifier(p.id ?? "value"),
                            factory.createIdentifier(p.name ?? "value")
                          )
                        ),
                      ],
                      false
                    ),
                  ]
                : []),
            ]
          )
        ),
      ],
      true
    )
  );
}

function createDriverGetDeclaration(def: DriverDefinition) {
  return factory.createGetAccessorDeclaration(
    [factory.createToken(ts.SyntaxKind.PublicKeyword)],
    factory.createIdentifier(def.name),
    [],
    factory.createUnionTypeNode(Object.values(def.dataType).map(createDriverPropertyReturnType)),
    factory.createBlock(
      [
        factory.createReturnStatement(
          factory.createPropertyAccessChain(
            factory.createPropertyAccessExpression(
              factory.createPropertyAccessExpression(factory.createThis(), factory.createIdentifier("drivers")),
              factory.createIdentifier(def.id)
            ),
            factory.createToken(ts.SyntaxKind.QuestionDotToken),
            factory.createIdentifier("value")
          )
        ),
      ],
      true
    )
  );
}

export function createNodeClass<T extends Family>(nodeClassDef: NodeClassDefinition<T>) {
  return {
    name: nodeClassDef.name,
    id: nodeClassDef.id,
    statements: [
      factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
          false,
          undefined,
          factory.createNamedImports([
            factory.createImportSpecifier(false, undefined, factory.createIdentifier("UnitOfMeasure")),
          ])
        ),
        factory.createStringLiteral("../../../Definitions/Global/UOM.js"),
        undefined
      ),
      factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
          false,
          undefined,
          factory.createNamedImports([
            factory.createImportSpecifier(false, undefined, factory.createIdentifier("Family")),
          ])
        ),
        factory.createStringLiteral("../../../Definitions/Global/Families.js"),
        undefined
      ),
      factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
          true,
          undefined,
          factory.createNamedImports([
            factory.createImportSpecifier(false, undefined, factory.createIdentifier("NodeInfo")),
          ])
        ),
        factory.createStringLiteral("../../../Definitions/NodeInfo.js"),
        undefined
      ),
      factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
          true,
          undefined,
          factory.createNamedImports([factory.createImportSpecifier(false, undefined, factory.createIdentifier("ISY"))])
        ),
        factory.createStringLiteral("../../../ISY.js"),
        undefined
      ),
      factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
          false,
          undefined,
          factory.createNamedImports([
            factory.createImportSpecifier(false, undefined, factory.createIdentifier("ISYDeviceNode")),
          ])
        ),
        factory.createStringLiteral("../../../ISYNode.js"),
        undefined
      ),
      factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
          false,
          undefined,
          factory.createNamedImports([
            factory.createImportSpecifier(false, undefined, factory.createIdentifier("Driver")),
          ])
        ),
        factory.createStringLiteral("../../../Definitions/Global/Drivers.js"),
        undefined
      ),
      factory.createImportDeclaration(
        undefined,
        factory.createImportClause(
          true,
          undefined,
          factory.createNamedImports([
            factory.createImportSpecifier(false, undefined, factory.createIdentifier("DriverState")),
          ])
        ),
        factory.createStringLiteral("../../../Model/DriverState.js"),
        undefined
      ),
      factory.createVariableStatement(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        factory.createVariableDeclarationList(
          [
            factory.createVariableDeclaration(
              factory.createIdentifier("nodeDefId"),
              undefined,
              undefined,
              factory.createStringLiteral(nodeClassDef.id)
            ),
          ],
          ts.NodeFlags.Const
        )
      ),
      factory.createTypeAliasDeclaration(
        undefined,
        factory.createIdentifier("Commands"),
        undefined,
        factory.createTypeLiteralNode([...Object.values(nodeClassDef.commands).map(createCommandSignature)])
      ),
      factory.createTypeAliasDeclaration(
        undefined,
        factory.createIdentifier("Drivers"),
        undefined,
        factory.createTypeLiteralNode([...Object.values(nodeClassDef.drivers).map(createDriverSignature)])
      ),
      factory.createClassDeclaration(
        [factory.createToken(ts.SyntaxKind.ExportKeyword)],
        factory.createIdentifier(nodeClassDef.name),
        undefined,
        [
          factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
            factory.createExpressionWithTypeArguments(factory.createIdentifier("ISYDeviceNode"), [
              factory.createTypeReferenceNode(
                factory.createQualifiedName(
                  factory.createIdentifier("Family"),
                  factory.createIdentifier(Family[nodeClassDef.family])
                ),
                undefined
              ),
              factory.createTypeOperatorNode(
                ts.SyntaxKind.KeyOfKeyword,
                factory.createTypeReferenceNode(factory.createIdentifier("Drivers"), undefined)
              ),
              factory.createTypeOperatorNode(
                ts.SyntaxKind.KeyOfKeyword,
                factory.createTypeReferenceNode(factory.createIdentifier("Commands"), undefined)
              ),
            ]),
          ]),
        ],
        [
          factory.createPropertyDeclaration(
            [factory.createToken(ts.SyntaxKind.PublicKeyword), factory.createToken(ts.SyntaxKind.ReadonlyKeyword)],
            factory.createIdentifier("commands"),
            undefined,
            factory.createTypeReferenceNode(factory.createIdentifier("Commands"), undefined),
            factory.createObjectLiteralExpression(
              [
                ...Object.values(nodeClassDef.commands).map((c) =>
                  factory.createPropertyAssignment(
                    factory.createIdentifier(c.id),
                    factory.createPropertyAccessExpression(factory.createThis(), factory.createIdentifier(c.name))
                  )
                ),
              ],
              true
            )
          ),
          factory.createPropertyDeclaration(
            [factory.createToken(ts.SyntaxKind.PublicKeyword)],
            factory.createIdentifier("drivers"),
            undefined,
            factory.createTypeReferenceNode(factory.createIdentifier("Drivers"), undefined),
            factory.createObjectLiteralExpression([], false)
          ),
          factory.createPropertyDeclaration(
            [factory.createToken(ts.SyntaxKind.StaticKeyword)],
            factory.createIdentifier("nodeDefId"),
            undefined,
            undefined,
            factory.createStringLiteral(nodeClassDef.id)
          ),
          factory.createConstructorDeclaration(
            undefined,
            [
              factory.createParameterDeclaration(
                undefined,
                undefined,
                factory.createIdentifier("isy"),
                undefined,
                factory.createTypeReferenceNode(factory.createIdentifier("ISY"), undefined),
                undefined
              ),
              factory.createParameterDeclaration(
                undefined,
                undefined,
                factory.createIdentifier("nodeInfo"),
                undefined,
                factory.createTypeReferenceNode(factory.createIdentifier("NodeInfo"), undefined),
                undefined
              ),
            ],
            factory.createBlock(
              [
                factory.createExpressionStatement(
                  factory.createCallExpression(factory.createSuper(), undefined, [
                    factory.createIdentifier("isy"),
                    factory.createIdentifier("nodeInfo"),
                  ])
                ),
                ...Object.values(nodeClassDef.drivers).map(createDriverInitializationStatement),
              ],
              true
            )
          ),
          ...Object.values(nodeClassDef.commands).map(createCommandMethodDeclaration),
          ...Object.values(nodeClassDef.drivers).map(createDriverGetDeclaration),
        ]
      ),
    ],
  };
}

function createMemberName(name: string, mapNullishTo: string = 'Unknown'): any {
	let label = pascalCase(name) ?? 'Unknown';
	if (!label.substring(0, 1).match(/[a-zA-Z]/)) {
    if(!isNaN(Number.parseInt(label)))
    {
        return factory.createIdentifier(`_${label}`);
    }
		return factory.createStringLiteral(label);
	}
	return factory.createIdentifier(label);
}
