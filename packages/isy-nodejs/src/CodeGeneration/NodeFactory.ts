import ts, { ModifierFlags, type ModifierSyntaxKind, type PunctuationSyntaxKind } from 'typescript';


type ParameterType<F> = F extends (arg0: infer P) => any ? P : never;

type TokenSyntaxKind = ParameterType<typeof ts.factory["createToken"]>;

export const SyntaxKind = ts.SyntaxKind;

export type SyntaxKind = ts.SyntaxKind;

export class NodeFactory {
	private factory: ts.NodeFactory;

	constructor(factory: ts.NodeFactory) {
		this.factory = factory;
	}

	private createIdentifier(name?: string): ts.Identifier | undefined {
		return name ? this.factory.createIdentifier(name) : undefined;
	}

	createImportClause(isTypeOnly: boolean, name?: string, ...namedBindings: ts.NamedImportBindings[]): ts.ImportClause {
		return this.factory.createImportClause(isTypeOnly, this.createIdentifier(name), namedBindings.length ? namedBindings[0] : undefined);
	}

	createAssertClause(elements: ts.NodeArray<ts.AssertEntry>, multiLine?: boolean): ts.AssertClause {
		return this.factory.createAssertClause(elements, multiLine);
	}

	createAssertEntry(name: string, value: ts.Expression): ts.AssertEntry {
		return this.factory.createAssertEntry(this.createIdentifier(name)!, value);
	}

	createImportTypeAssertionContainer(clause: ts.AssertClause, multiLine?: boolean): ts.ImportTypeAssertionContainer {
		return this.factory.createImportTypeAssertionContainer(clause, multiLine);
	}

	createImportAttributes(elements: ts.NodeArray<ts.ImportAttribute>, multiLine?: boolean): ts.ImportAttributes {
		return this.factory.createImportAttributes(elements, multiLine);
	}

	createImportAttribute(name: string, value: ts.Expression): ts.ImportAttribute {
		return this.factory.createImportAttribute(this.createIdentifier(name)!, value);
	}

	createNamespaceImport(name: string): ts.NamespaceImport {
		return this.factory.createNamespaceImport(this.createIdentifier(name)!);
	}

	createNamespaceExport(name: string): ts.NamespaceExport {
		return this.factory.createNamespaceExport(this.createIdentifier(name)!);
	}

	createNamedImports(...elements: ts.ImportSpecifier[]): ts.NamedImports {
		return this.factory.createNamedImports(elements);
	}

	updateImportClause(node: ts.ImportClause, isTypeOnly: boolean, name?: string, ...namedBindings: ts.NamedImportBindings[]): ts.ImportClause {
		return this.factory.updateImportClause(node, isTypeOnly, this.createIdentifier(name), namedBindings.length ? namedBindings[0] : undefined);
	}

	updateAssertClause(node: ts.AssertClause, elements: ts.NodeArray<ts.AssertEntry>, multiLine?: boolean): ts.AssertClause {
		return this.factory.updateAssertClause(node, elements, multiLine);
	}

	updateAssertEntry(node: ts.AssertEntry, name: string, value: ts.Expression): ts.AssertEntry {
		return this.factory.updateAssertEntry(node, this.createIdentifier(name)!, value);
	}

	updateImportTypeAssertionContainer(node: ts.ImportTypeAssertionContainer, clause: ts.AssertClause, multiLine?: boolean): ts.ImportTypeAssertionContainer {
		return this.factory.updateImportTypeAssertionContainer(node, clause, multiLine);
	}

	updateImportAttributes(node: ts.ImportAttributes, elements: ts.NodeArray<ts.ImportAttribute>, multiLine?: boolean): ts.ImportAttributes {
		return this.factory.updateImportAttributes(node, elements, multiLine);
	}

	updateImportAttribute(node: ts.ImportAttribute, name: string, value: ts.Expression): ts.ImportAttribute {
		return this.factory.updateImportAttribute(node, this.createIdentifier(name)!, value);
	}

	updateNamespaceImport(node: ts.NamespaceImport, name: string): ts.NamespaceImport {
		return this.factory.updateNamespaceImport(node, this.createIdentifier(name)!);
	}

	updateNamespaceExport(node: ts.NamespaceExport, name: string): ts.NamespaceExport {
		return this.factory.updateNamespaceExport(node, this.createIdentifier(name)!);
	}

	updateNamedImports(node: ts.NamedImports, ...elements: ts.ImportSpecifier[]): ts.NamedImports {
		return this.factory.updateNamedImports(node, elements);
	}

	// Additional methods to cover common usages in NodeClassFactory.ts

	createImportDeclaration(moduleSpecifier: string, namedImports: string[], isTypeOnly = false, importAttributes?: ts.ImportAttributes, ...modifierFlags: ModifierFlags[]): ts.ImportDeclaration {
		return this.factory.createImportDeclaration(
			this.createModifiers(...modifierFlags),
			this.createImportClause(isTypeOnly, undefined, this.factory.createNamedImports(namedImports.map((name) => this.factory.createImportSpecifier(false, undefined, this.createIdentifier(name)!)))),
			this.factory.createStringLiteral(moduleSpecifier),
			importAttributes
		);
	}

	createVariableStatement(name: string, initializer: ts.Expression, isConst = true): ts.VariableStatement {
		return this.factory.createVariableStatement(
			[this.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
			this.factory.createVariableDeclarationList(
				[this.factory.createVariableDeclaration(this.createIdentifier(name)!, undefined, undefined, initializer)],
				isConst ? ts.NodeFlags.Const : ts.NodeFlags.None
			)
		);
	}

	createTypeAliasDeclaration(name: string, type: ts.TypeNode): ts.TypeAliasDeclaration {
		return this.factory.createTypeAliasDeclaration(undefined, this.createIdentifier(name)!, undefined, type);
	}

	createClassDeclaration(name: string, members: ts.ClassElement[], heritageClauses?: ts.HeritageClause[]): ts.ClassDeclaration {
		return this.factory.createClassDeclaration(this.createModifiers(ts.ModifierFlags.Export), this.createIdentifier(name)!, undefined, heritageClauses, members);
	}

	and<T>(...flags: T[]): T {
		if (flags.length === 0) {
			return 0 as T;
		}

		return flags.reduce((acc: number, flag) => acc & (flag as number), flags[0] as number) as T;
	}

	createModifiers(...flags: ts.ModifierFlags[]): ts.Modifier[] {
		return this.factory.createModifiersFromModifierFlags(this.and(...flags));
	}

	createMethodDeclaration(name: string, parameters: ts.ParameterDeclaration[], body: ts.Block, isAsync = false): ts.MethodDeclaration {
		return this.factory.createMethodDeclaration(
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
		return this.factory.createPropertyDeclaration(modifiers, this.createIdentifier(name)!, undefined, undefined, initializer);
	}

	createConstructorDeclaration(parameters: ts.ParameterDeclaration[], body: ts.Block): ts.ConstructorDeclaration {
		return this.factory.createConstructorDeclaration(undefined, parameters, body);
	}

	createFunctionDeclaration(name: string, parameters: ts.ParameterDeclaration[], body: ts.Block, returnType?: ts.TypeNode): ts.FunctionDeclaration {
		return this.factory.createFunctionDeclaration([this.createModifier(ts.SyntaxKind.ExportKeyword)], undefined, this.createIdentifier(name)!, undefined, parameters, returnType, body);
	}
	createModifier(ExportKeyword: ts.ModifierSyntaxKind): ts.ModifierLike {
		return ts.factory.createModifier(ExportKeyword);
	}

	createModuleDeclaration(name: string, body: ts.ModuleBlock, ...modifierFlags: ModifierFlags[]): ts.ModuleDeclaration {
		return this.factory.createModuleDeclaration(this.createModifiers(...modifierFlags), this.createIdentifier(name)!, body, ts.NodeFlags.Namespace);
	}

	createToken<T extends ModifierSyntaxKind>(kind: T): ts.ModifierLike;
	createToken<T extends PunctuationSyntaxKind>(kind: T): ts.PunctuationToken<T>;
	createToken<T extends TokenSyntaxKind>(kind: T): ts.Token<T> {
		return this.factory.createToken(kind);
	}

	createPropertySignature(name: string, type: ts.TypeNode, optional = false, ...modifiers: ModifierFlags[]): ts.PropertySignature {
		return this.factory.createPropertySignature(this.createModifiers(...modifiers), this.createIdentifier(name)!, optional ? this.createToken(ts.SyntaxKind.QuestionToken) : undefined, type);
	}

	createTypeReferenceNode(typeName: string, typeArguments?: ts.TypeNode[]): ts.TypeReferenceNode {
		return this.factory.createTypeReferenceNode(this.createIdentifier(typeName)!, typeArguments);
	}

	createUnionTypeNode(types: ts.TypeNode[]): ts.UnionTypeNode {
		return this.factory.createUnionTypeNode(types);
	}

	createIntersectionTypeNode(types: ts.TypeNode[]): ts.IntersectionTypeNode {
		return this.factory.createIntersectionTypeNode(types);
	}

	createTypeLiteralNode(members: ts.TypeElement[]): ts.TypeLiteralNode {
		return this.factory.createTypeLiteralNode(members);
	}

	createFunctionTypeNode(type: ts.TypeNode, typeParameters: readonly ts.TypeParameterDeclaration[], ...parameters: ts.ParameterDeclaration[]): ts.FunctionTypeNode {
		return this.factory.createFunctionTypeNode(typeParameters, parameters, type);
	}

	createParameter(name: string, type: ts.TypeNode, initializer?: ts.Expression, optional = false): ts.ParameterDeclaration {
		return this.factory.createParameterDeclaration(undefined, undefined, this.createIdentifier(name)!, optional ? this.createToken(ts.SyntaxKind.QuestionToken) : undefined, type, initializer);
	}

	createExpressionStatement(expression: ts.Expression): ts.ExpressionStatement {
		return this.factory.createExpressionStatement(expression);
	}

	createCallExpression(expression: ts.Expression, typeArguments: ts.TypeNode[] | undefined, argumentsArray: ts.Expression[]): ts.CallExpression {
		return this.factory.createCallExpression(expression, typeArguments, argumentsArray);
	}

	createReturnStatement(expression?: ts.Expression): ts.ReturnStatement {
		return this.factory.createReturnStatement(expression);
	}

	createNewExpression(expression: ts.Expression, typeArguments: ts.TypeNode[] | undefined, argumentsArray: ts.Expression[]): ts.NewExpression {
		return this.factory.createNewExpression(expression, typeArguments, argumentsArray);
	}

	createObjectLiteral(properties: ts.ObjectLiteralElementLike[], multiLine?: boolean): ts.ObjectLiteralExpression {
		return this.factory.createObjectLiteralExpression(properties, multiLine);
	}

	createPropertyAssignment(name: string, initializer: ts.Expression): ts.PropertyAssignment {
		return this.factory.createPropertyAssignment(this.createIdentifier(name)!, initializer);
	}

	createQualifiedName(left: ts.EntityName, right: string): ts.QualifiedName {
		return this.factory.createQualifiedName(left, this.createIdentifier(right)!);
	}

	createLiteralTypeNode(literal: string | number): ts.LiteralTypeNode {
		if(typeof literal === 'number') {
			return this.factory.createLiteralTypeNode(this.createNumericLiteral(literal as number));
		}


		return this.factory.createLiteralTypeNode(this.createStringLiteral(literal));
	}

	createNumericLiteral(value: number): ts.NumericLiteral {
		return this.factory.createNumericLiteral(value.toString());
	}

	createStringLiteral(text: string): ts.StringLiteral {
		return this.factory.createStringLiteral(text);
	}

	createKeywordTypeNode(kind: ts.KeywordTypeSyntaxKind): ts.KeywordTypeNode {
		return this.factory.createKeywordTypeNode(kind);
	}

	createTypePredicateNode(parameterName: ts.Identifier, type: ts.TypeNode): ts.TypePredicateNode {
		return this.factory.createTypePredicateNode(undefined, parameterName, type);
	}

	createBinaryExpression(left: ts.Expression, operator: ts.BinaryOperator, right: ts.Expression): ts.BinaryExpression {
		return this.factory.createBinaryExpression(left, operator, right);
	}

	createPropertyAccessExpression(expression: ts.Expression, name: string): ts.PropertyAccessExpression {
		return this.factory.createPropertyAccessExpression(expression, this.createIdentifier(name)!);
	}

	createHeritageClause(token: ts.SyntaxKind.ExtendsKeyword | ts.SyntaxKind.ImplementsKeyword, types: ts.ExpressionWithTypeArguments[]): ts.HeritageClause {
		return this.factory.createHeritageClause(token, types);
	}

	createExpressionWithTypeArguments(expression: ts.Expression, typeArguments?: ts.TypeNode[]): ts.ExpressionWithTypeArguments {
		return this.factory.createExpressionWithTypeArguments(expression, typeArguments);
	}

	createBlock(statements: ts.Statement[], multiLine?: boolean): ts.Block {
		return this.factory.createBlock(statements, multiLine);
	}

	createModuleBlock(statements: ts.Statement[]): ts.ModuleBlock {
		return this.factory.createModuleBlock(statements);
	}

	createInterfaceDeclaration(name: string, members: ts.TypeElement[], heritageClauses?: ts.HeritageClause[]): ts.InterfaceDeclaration {
		return this.factory.createInterfaceDeclaration([this.factory.createModifier(ts.SyntaxKind.ExportKeyword)], this.createIdentifier(name)!, undefined, heritageClauses, members);
	}

	createTypeOperatorNode(operator: ts.SyntaxKind.KeyOfKeyword | ts.SyntaxKind.ReadonlyKeyword | ts.SyntaxKind.UniqueKeyword, type: ts.TypeNode): ts.TypeOperatorNode {
		return this.factory.createTypeOperatorNode(operator, type);
	}

	createTypeQueryNode(exprName: ts.EntityName): ts.TypeQueryNode {
		return this.factory.createTypeQueryNode(exprName);
	}

	createAsExpression(expression: ts.Expression, type: ts.TypeNode): ts.AsExpression {
		return this.factory.createAsExpression(expression, type);
	}

	createPropertyAccessChain(name: string, useQuestionDot: boolean = true, expression: ts.Expression): ts.PropertyAccessChain {
		return this.factory.createPropertyAccessChain(expression, useQuestionDot ? this.createToken(ts.SyntaxKind.QuestionDotToken) : undefined, this.createIdentifier(name)!);
	}
}
