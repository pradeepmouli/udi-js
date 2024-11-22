import ts, { ModifierFlags, type ModifierSyntaxKind, type PunctuationSyntaxKind } from 'typescript';

type ParameterType<F> = F extends (arg0: infer P) => any ? P : never;

type TokenSyntaxKind = ParameterType<(typeof ts.factory)['createToken']>;

export const SyntaxKind = ts.SyntaxKind;

export type SyntaxKind = ts.SyntaxKind;

export class CodeFactory {
	protected factory: ts.NodeFactory;

	constructor(factory: ts.NodeFactory) {
		this.factory = factory;
	}

	private createIdentifier(name?: string): ts.Identifier | undefined {
		return name ? ts.factory.createIdentifier(name) : undefined;
	}

	createImportClause(isTypeOnly: boolean, name?: string, ...namedBindings: ts.NamedImportBindings[]): ts.ImportClause {
		return ts.factory.createImportClause(isTypeOnly, this.createIdentifier(name), namedBindings.length ? namedBindings[0] : undefined);
	}

	createAssertClause(elements: ts.NodeArray<ts.AssertEntry>, multiLine?: boolean): ts.AssertClause {
		return ts.factory.createAssertClause(elements, multiLine);
	}

	createAssertEntry(name: string, value: ts.Expression): ts.AssertEntry {
		return ts.factory.createAssertEntry(this.createIdentifier(name)!, value);
	}

	createImportTypeAssertionContainer(clause: ts.AssertClause, multiLine?: boolean): ts.ImportTypeAssertionContainer {
		return ts.factory.createImportTypeAssertionContainer(clause, multiLine);
	}

	createImportAttributes(elements: ts.NodeArray<ts.ImportAttribute>, multiLine?: boolean): ts.ImportAttributes {
		return ts.factory.createImportAttributes(elements, multiLine);
	}

	createImportAttribute(name: string, value: ts.Expression): ts.ImportAttribute {
		return ts.factory.createImportAttribute(this.createIdentifier(name)!, value);
	}

	createNamespaceImport(name: string): ts.NamespaceImport {
		return ts.factory.createNamespaceImport(this.createIdentifier(name)!);
	}

	createNamespaceExport(name: string): ts.NamespaceExport {
		return ts.factory.createNamespaceExport(this.createIdentifier(name)!);
	}

	createNamedImports(...elements: ts.ImportSpecifier[]): ts.NamedImports {
		return ts.factory.createNamedImports(elements);
	}

	updateImportClause(node: ts.ImportClause, isTypeOnly: boolean, name?: string, ...namedBindings: ts.NamedImportBindings[]): ts.ImportClause {
		return ts.factory.updateImportClause(node, isTypeOnly, this.createIdentifier(name), namedBindings.length ? namedBindings[0] : undefined);
	}

	updateAssertClause(node: ts.AssertClause, elements: ts.NodeArray<ts.AssertEntry>, multiLine?: boolean): ts.AssertClause {
		return ts.factory.updateAssertClause(node, elements, multiLine);
	}

	updateAssertEntry(node: ts.AssertEntry, name: string, value: ts.Expression): ts.AssertEntry {
		return ts.factory.updateAssertEntry(node, this.createIdentifier(name)!, value);
	}

	updateImportTypeAssertionContainer(node: ts.ImportTypeAssertionContainer, clause: ts.AssertClause, multiLine?: boolean): ts.ImportTypeAssertionContainer {
		return ts.factory.updateImportTypeAssertionContainer(node, clause, multiLine);
	}

	updateImportAttributes(node: ts.ImportAttributes, elements: ts.NodeArray<ts.ImportAttribute>, multiLine?: boolean): ts.ImportAttributes {
		return ts.factory.updateImportAttributes(node, elements, multiLine);
	}

	updateImportAttribute(node: ts.ImportAttribute, name: string, value: ts.Expression): ts.ImportAttribute {
		return ts.factory.updateImportAttribute(node, this.createIdentifier(name)!, value);
	}

	updateNamespaceImport(node: ts.NamespaceImport, name: string): ts.NamespaceImport {
		return ts.factory.updateNamespaceImport(node, this.createIdentifier(name)!);
	}

	updateNamespaceExport(node: ts.NamespaceExport, name: string): ts.NamespaceExport {
		return ts.factory.updateNamespaceExport(node, this.createIdentifier(name)!);
	}

	updateNamedImports(node: ts.NamedImports, ...elements: ts.ImportSpecifier[]): ts.NamedImports {
		return ts.factory.updateNamedImports(node, elements);
	}

	// Additional methods to cover common usages in NodeClassFactory.ts

	createImportDeclaration(moduleSpecifier: string, namedImports: string[], isTypeOnly = false, importAttributes?: ts.ImportAttributes, ...modifierFlags: ModifierFlags[]): ts.ImportDeclaration {
		return ts.factory.createImportDeclaration(
			this.createModifiers(...modifierFlags),
			this.createImportClause(isTypeOnly, undefined, ts.factory.createNamedImports(namedImports.map((name) => ts.factory.createImportSpecifier(false, undefined, this.createIdentifier(name)!)))),
			ts.factory.createStringLiteral(moduleSpecifier),
			importAttributes
		);
	}

	createVariableStatement(name: string, initializer: ts.Expression, isConst = true): ts.VariableStatement {
		return ts.factory.createVariableStatement(
			[ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
			ts.factory.createVariableDeclarationList(
				[ts.factory.createVariableDeclaration(this.createIdentifier(name)!, undefined, undefined, initializer)],
				isConst ? ts.NodeFlags.Const : ts.NodeFlags.None
			)
		);
	}

	createTypeAliasDeclaration(name: string, type: ts.TypeNode): ts.TypeAliasDeclaration {
		return ts.factory.createTypeAliasDeclaration(undefined, this.createIdentifier(name)!, undefined, type);
	}

	createClassDeclaration(name: string, members: ts.ClassElement[], heritageClauses?: ts.HeritageClause[]): ts.ClassDeclaration {
		return ts.factory.createClassDeclaration(this.createModifiers(ts.ModifierFlags.Export), this.createIdentifier(name)!, undefined, heritageClauses, members);
	}

	and<T>(...flags: T[]): T {
		if (flags.length === 0) {
			return 0 as T;
		}

		return flags.reduce((acc: number, flag) => acc & (flag as number), flags[0] as number) as T;
	}

	or<T>(...flags: T[]): T {
		if (flags.length === 0) {
			return 0 as T;
		}

		return flags.reduce((acc: number, flag) => acc | (flag as number), flags[0] as number) as T;
	}

	createModifiers(...flags: ts.ModifierFlags[]): ts.Modifier[] {
		return ts.factory.createModifiersFromModifierFlags(this.or(...flags));
	}

	createMethodDeclaration(name: string, parameters: ts.ParameterDeclaration[], body: ts.Block, isAsync = false): ts.MethodDeclaration {
		return ts.factory.createMethodDeclaration(
			isAsync ? this.createModifiers(ts.ModifierFlags.Async) : undefined,
			undefined,
			this.createIdentifier(name)!,
			undefined,
			undefined,
			parameters,
			undefined,
			body
		);
	}

	createPropertyDeclaration(name: string, initializer: ts.Expression, modifiers: ts.Modifier[] = []): ts.PropertyDeclaration {
		return ts.factory.createPropertyDeclaration(modifiers, this.createIdentifier(name)!, undefined, undefined, initializer);
	}

	createConstructorDeclaration(parameters: ts.ParameterDeclaration[], body: ts.Block): ts.ConstructorDeclaration {
		return ts.factory.createConstructorDeclaration(undefined, parameters, body);
	}

	createFunctionDeclaration(name: string, parameters: ts.ParameterDeclaration[], body: ts.Block, returnType?: ts.TypeNode): ts.FunctionDeclaration {
		return ts.factory.createFunctionDeclaration([this.createModifier(ts.SyntaxKind.ExportKeyword)], undefined, this.createIdentifier(name)!, undefined, parameters, returnType, body);
	}
	createModifier(ExportKeyword: ts.ModifierSyntaxKind): ts.ModifierLike {
		return ts.factory.createModifier(ExportKeyword);
	}

	createModuleDeclaration(name: string, body: ts.ModuleBlock, ...modifierFlags: ModifierFlags[]): ts.ModuleDeclaration {
		return ts.factory.createModuleDeclaration(this.createModifiers(...modifierFlags), this.createIdentifier(name)!, body, ts.NodeFlags.Namespace);
	}

	createToken<T extends ModifierSyntaxKind>(kind: T): ts.ModifierLike;
	createToken<T extends PunctuationSyntaxKind>(kind: T): ts.PunctuationToken<T>;
	createToken<T extends TokenSyntaxKind>(kind: T): ts.Token<T> {
		return ts.factory.createToken(kind);
	}

	createPropertySignature(name: string, type: ts.TypeNode, optional = false, ...modifiers: ModifierFlags[]): ts.PropertySignature {
		return ts.factory.createPropertySignature(this.createModifiers(...modifiers), this.createIdentifier(name)!, optional ? this.createToken(ts.SyntaxKind.QuestionToken) : undefined, type);
	}
	createTypeReferenceNode(typeName: string, qualifier: string): ts.TypeReferenceNode;
	createTypeReferenceNode(typeName: string, ...typeArguments: ts.TypeNode[]): ts.TypeReferenceNode;
	createTypeReferenceNode(typeName: string, qualifier?: string | ts.TypeNode, ...typeArguments: ts.TypeNode[]): ts.TypeReferenceNode {
		if (typeof qualifier === 'string') {
			return ts.factory.createTypeReferenceNode(ts.factory.createQualifiedName(this.createIdentifier(qualifier), this.createIdentifier(typeName)!), typeArguments);
		} else {
			return ts.factory.createTypeReferenceNode(this.createIdentifier(typeName)!, [qualifier, ...typeArguments]);
		}
	}

	typesEqual(a: ts.TypeNode, b: ts.TypeNode): boolean {
		if (ts.isLiteralTypeNode(a) && ts.isLiteralTypeNode(b)) {
			if (ts.isNumericLiteral(a.literal) && ts.isNumericLiteral(b.literal)) {
				return a.literal.text === b.literal.text;
			} else if (ts.isStringLiteral(a.literal) && ts.isStringLiteral(b.literal)) {
				return a.literal.text === b.literal.text;
			} else if (ts.isBigIntLiteral(a.literal) && ts.isBigIntLiteral(b.literal)) {
				return a.literal.text === b.literal.text;
			}
		}

		if (ts.isTypeReferenceNode(a) && ts.isTypeReferenceNode(b)) {
			if (ts.isIdentifier(a.typeName) && ts.isIdentifier(b.typeName)) {
				return a.typeName.text === b.typeName.text;
			}
		}
		return false;
	}

	createUnionTypeNode(...types: ts.TypeNode[]): ts.UnionTypeNode {
		let t = [types[0]];
		for (let i = 1; i < types.length; i++) {
			if (types[i].kind !== ts.SyntaxKind.NeverKeyword) {
				if (types[i].kind === ts.SyntaxKind.UnionType) {
					types.push(...(types[i] as ts.UnionTypeNode).types);
				} else if (!t.some((x) => this.typesEqual(x, types[i]))) t.push(types[i]);
			}
		}
		return ts.factory.createUnionTypeNode(types);
	}

	createIntersectionTypeNode(types: ts.TypeNode[]): ts.IntersectionTypeNode {
		return ts.factory.createIntersectionTypeNode(types);
	}

	createTypeLiteralNode(members: ts.TypeElement[]): ts.TypeLiteralNode {
		return ts.factory.createTypeLiteralNode(members);
	}

	createFunctionTypeNode(type: ts.TypeNode, typeParameters: readonly ts.TypeParameterDeclaration[], ...parameters: ts.ParameterDeclaration[]): ts.FunctionTypeNode {
		return ts.factory.createFunctionTypeNode(typeParameters, parameters, type);
	}

	createParameter(name: string, type: ts.TypeNode, initializer?: ts.Expression, optional = false): ts.ParameterDeclaration {
		return ts.factory.createParameterDeclaration(undefined, undefined, this.createIdentifier(name)!, optional ? this.createToken(ts.SyntaxKind.QuestionToken) : undefined, type, initializer);
	}

	createExpressionStatement(expression: ts.Expression): ts.ExpressionStatement {
		return ts.factory.createExpressionStatement(expression);
	}

	createCallExpression(expression: ts.Expression, typeArguments: ts.TypeNode[] | undefined, argumentsArray: ts.Expression[]): ts.CallExpression {
		return ts.factory.createCallExpression(expression, typeArguments, argumentsArray);
	}

	createReturnStatement(expression?: ts.Expression): ts.ReturnStatement {
		return ts.factory.createReturnStatement(expression);
	}

	createNewExpression(expression: ts.Expression, typeArguments: ts.TypeNode[] | undefined, argumentsArray: ts.Expression[]): ts.NewExpression {
		return ts.factory.createNewExpression(expression, typeArguments, argumentsArray);
	}

	createObjectLiteral(properties: ts.ObjectLiteralElementLike[], multiLine?: boolean): ts.ObjectLiteralExpression {
		return ts.factory.createObjectLiteralExpression(properties, multiLine);
	}

	createPropertyAssignment(name: string, initializer: ts.Expression): ts.PropertyAssignment {
		return ts.factory.createPropertyAssignment(this.createIdentifier(name)!, initializer);
	}

	createQualifiedName(left: ts.EntityName, right: string): ts.QualifiedName {
		return ts.factory.createQualifiedName(left, this.createIdentifier(right)!);
	}

	createLiteralTypeNode(literal: string | number): ts.LiteralTypeNode {
		if (typeof literal === 'number') {
			return ts.factory.createLiteralTypeNode(this.createNumericLiteral(literal as number));
		}

		return ts.factory.createLiteralTypeNode(this.createStringLiteral(literal));
	}

	createNumericLiteral(value: number): ts.NumericLiteral {
		return ts.factory.createNumericLiteral(value.toString());
	}

	createStringLiteral(text: string): ts.StringLiteral {
		return ts.factory.createStringLiteral(text);
	}

	createKeywordTypeNode(kind: ts.KeywordTypeSyntaxKind): ts.KeywordTypeNode {
		return ts.factory.createKeywordTypeNode(kind);
	}

	createTypePredicateNode(parameterName: ts.Identifier, type: ts.TypeNode): ts.TypePredicateNode {
		return ts.factory.createTypePredicateNode(undefined, parameterName, type);
	}

	createBinaryExpression(left: ts.Expression, operator: ts.BinaryOperator, right: ts.Expression): ts.BinaryExpression {
		return ts.factory.createBinaryExpression(left, operator, right);
	}

	createPropertyAccessExpression(expression: ts.Expression, name: string): ts.PropertyAccessExpression {
		return ts.factory.createPropertyAccessExpression(expression, this.createIdentifier(name)!);
	}

	createHeritageClause(token: ts.SyntaxKind.ExtendsKeyword | ts.SyntaxKind.ImplementsKeyword, types: ts.ExpressionWithTypeArguments[]): ts.HeritageClause {
		return ts.factory.createHeritageClause(token, types);
	}

	createExpressionWithTypeArguments(expression: ts.Expression, typeArguments?: ts.TypeNode[]): ts.ExpressionWithTypeArguments {
		return ts.factory.createExpressionWithTypeArguments(expression, typeArguments);
	}
	createBlock(multiLine: boolean, ...statements: ts.Statement[]): ts.Block;
	createBlock(...statements: ts.Statement[]);
	createBlock(multiLine: boolean | ts.Statement, ...statements: ts.Statement[]): ts.Block {
		if(typeof multiLine === 'boolean') {
			return ts.factory.createBlock(statements, multiLine);
		}
		return ts.factory.createBlock([multiLine, ...statements]);

	}

	createModuleBlock(statements: ts.Statement[]): ts.ModuleBlock {
		return ts.factory.createModuleBlock(statements);
	}

	createInterfaceDeclaration(name: string, members: ts.TypeElement[], heritageClauses?: ts.HeritageClause[]): ts.InterfaceDeclaration {
		return ts.factory.createInterfaceDeclaration([ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)], this.createIdentifier(name)!, undefined, heritageClauses, members);
	}

	createTypeOperatorNode(operator: ts.SyntaxKind.KeyOfKeyword | ts.SyntaxKind.ReadonlyKeyword | ts.SyntaxKind.UniqueKeyword, type: ts.TypeNode): ts.TypeOperatorNode {
		return ts.factory.createTypeOperatorNode(operator, type);
	}

	createTypeQueryNode(exprName: ts.EntityName): ts.TypeQueryNode {
		return ts.factory.createTypeQueryNode(exprName);
	}

	createAsExpression(expression: ts.Expression, type: ts.TypeNode): ts.AsExpression {
		return ts.factory.createAsExpression(expression, type);
	}

	createPropertyAccessChain(name: string, useQuestionDot: boolean = true, expression: ts.Expression): ts.PropertyAccessChain {
		return ts.factory.createPropertyAccessChain(expression, useQuestionDot ? this.createToken(ts.SyntaxKind.QuestionDotToken) : undefined, this.createIdentifier(name)!);
	}
}
