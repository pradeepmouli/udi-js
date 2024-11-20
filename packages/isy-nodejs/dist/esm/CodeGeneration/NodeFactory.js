import ts from 'typescript';
export const SyntaxKind = ts.SyntaxKind;
export class NodeFactory {
    factory;
    constructor(factory) {
        this.factory = factory;
    }
    createIdentifier(name) {
        return name ? this.factory.createIdentifier(name) : undefined;
    }
    createImportClause(isTypeOnly, name, ...namedBindings) {
        return this.factory.createImportClause(isTypeOnly, this.createIdentifier(name), namedBindings.length ? namedBindings[0] : undefined);
    }
    createAssertClause(elements, multiLine) {
        return this.factory.createAssertClause(elements, multiLine);
    }
    createAssertEntry(name, value) {
        return this.factory.createAssertEntry(this.createIdentifier(name), value);
    }
    createImportTypeAssertionContainer(clause, multiLine) {
        return this.factory.createImportTypeAssertionContainer(clause, multiLine);
    }
    createImportAttributes(elements, multiLine) {
        return this.factory.createImportAttributes(elements, multiLine);
    }
    createImportAttribute(name, value) {
        return this.factory.createImportAttribute(this.createIdentifier(name), value);
    }
    createNamespaceImport(name) {
        return this.factory.createNamespaceImport(this.createIdentifier(name));
    }
    createNamespaceExport(name) {
        return this.factory.createNamespaceExport(this.createIdentifier(name));
    }
    createNamedImports(...elements) {
        return this.factory.createNamedImports(elements);
    }
    updateImportClause(node, isTypeOnly, name, ...namedBindings) {
        return this.factory.updateImportClause(node, isTypeOnly, this.createIdentifier(name), namedBindings.length ? namedBindings[0] : undefined);
    }
    updateAssertClause(node, elements, multiLine) {
        return this.factory.updateAssertClause(node, elements, multiLine);
    }
    updateAssertEntry(node, name, value) {
        return this.factory.updateAssertEntry(node, this.createIdentifier(name), value);
    }
    updateImportTypeAssertionContainer(node, clause, multiLine) {
        return this.factory.updateImportTypeAssertionContainer(node, clause, multiLine);
    }
    updateImportAttributes(node, elements, multiLine) {
        return this.factory.updateImportAttributes(node, elements, multiLine);
    }
    updateImportAttribute(node, name, value) {
        return this.factory.updateImportAttribute(node, this.createIdentifier(name), value);
    }
    updateNamespaceImport(node, name) {
        return this.factory.updateNamespaceImport(node, this.createIdentifier(name));
    }
    updateNamespaceExport(node, name) {
        return this.factory.updateNamespaceExport(node, this.createIdentifier(name));
    }
    updateNamedImports(node, ...elements) {
        return this.factory.updateNamedImports(node, elements);
    }
    // Additional methods to cover common usages in NodeClassFactory.ts
    createImportDeclaration(moduleSpecifier, namedImports, isTypeOnly = false, importAttributes, ...modifierFlags) {
        return this.factory.createImportDeclaration(this.createModifiers(...modifierFlags), this.createImportClause(isTypeOnly, undefined, this.factory.createNamedImports(namedImports.map((name) => this.factory.createImportSpecifier(false, undefined, this.createIdentifier(name))))), this.factory.createStringLiteral(moduleSpecifier), importAttributes);
    }
    createVariableStatement(name, initializer, isConst = true) {
        return this.factory.createVariableStatement([this.factory.createModifier(ts.SyntaxKind.ExportKeyword)], this.factory.createVariableDeclarationList([this.factory.createVariableDeclaration(this.createIdentifier(name), undefined, undefined, initializer)], isConst ? ts.NodeFlags.Const : ts.NodeFlags.None));
    }
    createTypeAliasDeclaration(name, type) {
        return this.factory.createTypeAliasDeclaration(undefined, this.createIdentifier(name), undefined, type);
    }
    createClassDeclaration(name, members, heritageClauses) {
        return this.factory.createClassDeclaration(this.createModifiers(ts.ModifierFlags.Export), this.createIdentifier(name), undefined, heritageClauses, members);
    }
    and(...flags) {
        if (flags.length === 0) {
            return 0;
        }
        return flags.reduce((acc, flag) => acc & flag, flags[0]);
    }
    createModifiers(...flags) {
        return this.factory.createModifiersFromModifierFlags(this.and(...flags));
    }
    createMethodDeclaration(name, parameters, body, isAsync = false) {
        return this.factory.createMethodDeclaration(isAsync ? this.createModifiers(ts.ModifierFlags.Async) : undefined, undefined, this.createIdentifier(name), undefined, undefined, parameters, undefined, body);
    }
    createPropertyDeclaration(name, initializer, modifiers = []) {
        return this.factory.createPropertyDeclaration(modifiers, this.createIdentifier(name), undefined, undefined, initializer);
    }
    createConstructorDeclaration(parameters, body) {
        return this.factory.createConstructorDeclaration(undefined, parameters, body);
    }
    createFunctionDeclaration(name, parameters, body, returnType) {
        return this.factory.createFunctionDeclaration([this.createModifier(ts.SyntaxKind.ExportKeyword)], undefined, this.createIdentifier(name), undefined, parameters, returnType, body);
    }
    createModifier(ExportKeyword) {
        return ts.factory.createModifier(ExportKeyword);
    }
    createModuleDeclaration(name, body, ...modifierFlags) {
        return this.factory.createModuleDeclaration(this.createModifiers(...modifierFlags), this.createIdentifier(name), body, ts.NodeFlags.Namespace);
    }
    createToken(kind) {
        return this.factory.createToken(kind);
    }
    createPropertySignature(name, type, optional = false, ...modifiers) {
        return this.factory.createPropertySignature(this.createModifiers(...modifiers), this.createIdentifier(name), optional ? this.createToken(ts.SyntaxKind.QuestionToken) : undefined, type);
    }
    createTypeReferenceNode(typeName, typeArguments) {
        return this.factory.createTypeReferenceNode(this.createIdentifier(typeName), typeArguments);
    }
    createUnionTypeNode(types) {
        return this.factory.createUnionTypeNode(types);
    }
    createIntersectionTypeNode(types) {
        return this.factory.createIntersectionTypeNode(types);
    }
    createTypeLiteralNode(members) {
        return this.factory.createTypeLiteralNode(members);
    }
    createFunctionTypeNode(type, typeParameters, ...parameters) {
        return this.factory.createFunctionTypeNode(typeParameters, parameters, type);
    }
    createParameter(name, type, initializer, optional = false) {
        return this.factory.createParameterDeclaration(undefined, undefined, this.createIdentifier(name), optional ? this.createToken(ts.SyntaxKind.QuestionToken) : undefined, type, initializer);
    }
    createExpressionStatement(expression) {
        return this.factory.createExpressionStatement(expression);
    }
    createCallExpression(expression, typeArguments, argumentsArray) {
        return this.factory.createCallExpression(expression, typeArguments, argumentsArray);
    }
    createReturnStatement(expression) {
        return this.factory.createReturnStatement(expression);
    }
    createNewExpression(expression, typeArguments, argumentsArray) {
        return this.factory.createNewExpression(expression, typeArguments, argumentsArray);
    }
    createObjectLiteral(properties, multiLine) {
        return this.factory.createObjectLiteralExpression(properties, multiLine);
    }
    createPropertyAssignment(name, initializer) {
        return this.factory.createPropertyAssignment(this.createIdentifier(name), initializer);
    }
    createQualifiedName(left, right) {
        return this.factory.createQualifiedName(left, this.createIdentifier(right));
    }
    createLiteralTypeNode(literal) {
        if (typeof literal === 'number') {
            return this.factory.createLiteralTypeNode(this.createNumericLiteral(literal));
        }
        return this.factory.createLiteralTypeNode(this.createStringLiteral(literal));
    }
    createNumericLiteral(value) {
        return this.factory.createNumericLiteral(value.toString());
    }
    createStringLiteral(text) {
        return this.factory.createStringLiteral(text);
    }
    createKeywordTypeNode(kind) {
        return this.factory.createKeywordTypeNode(kind);
    }
    createTypePredicateNode(parameterName, type) {
        return this.factory.createTypePredicateNode(undefined, parameterName, type);
    }
    createBinaryExpression(left, operator, right) {
        return this.factory.createBinaryExpression(left, operator, right);
    }
    createPropertyAccessExpression(expression, name) {
        return this.factory.createPropertyAccessExpression(expression, this.createIdentifier(name));
    }
    createHeritageClause(token, types) {
        return this.factory.createHeritageClause(token, types);
    }
    createExpressionWithTypeArguments(expression, typeArguments) {
        return this.factory.createExpressionWithTypeArguments(expression, typeArguments);
    }
    createBlock(statements, multiLine) {
        return this.factory.createBlock(statements, multiLine);
    }
    createModuleBlock(statements) {
        return this.factory.createModuleBlock(statements);
    }
    createInterfaceDeclaration(name, members, heritageClauses) {
        return this.factory.createInterfaceDeclaration([this.factory.createModifier(ts.SyntaxKind.ExportKeyword)], this.createIdentifier(name), undefined, heritageClauses, members);
    }
    createTypeOperatorNode(operator, type) {
        return this.factory.createTypeOperatorNode(operator, type);
    }
    createTypeQueryNode(exprName) {
        return this.factory.createTypeQueryNode(exprName);
    }
    createAsExpression(expression, type) {
        return this.factory.createAsExpression(expression, type);
    }
    createPropertyAccessChain(name, useQuestionDot = true, expression) {
        return this.factory.createPropertyAccessChain(expression, useQuestionDot ? this.createToken(ts.SyntaxKind.QuestionDotToken) : undefined, this.createIdentifier(name));
    }
}
//# sourceMappingURL=NodeFactory.js.map