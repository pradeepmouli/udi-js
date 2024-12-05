import { unique } from 'moderndash';
import ts from 'typescript';
export const SyntaxKind = ts.SyntaxKind;
export class CodeFactory {
    factory;
    constructor(factory) {
        this.factory = factory;
    }
    createIdentifier(name) {
        return name ? ts.factory.createIdentifier(name) : undefined;
    }
    createImportClause(isTypeOnly, name, ...namedBindings) {
        return ts.factory.createImportClause(isTypeOnly, this.createIdentifier(name), namedBindings.length ? namedBindings[0] : undefined);
    }
    createAssertClause(elements, multiLine) {
        return ts.factory.createAssertClause(elements, multiLine);
    }
    createAssertEntry(name, value) {
        return ts.factory.createAssertEntry(this.createIdentifier(name), value);
    }
    createImportTypeAssertionContainer(clause, multiLine) {
        return ts.factory.createImportTypeAssertionContainer(clause, multiLine);
    }
    createImportAttributes(elements, multiLine) {
        return ts.factory.createImportAttributes(elements, multiLine);
    }
    createImportAttribute(name, value) {
        return ts.factory.createImportAttribute(this.createIdentifier(name), value);
    }
    createNamespaceImport(name) {
        return ts.factory.createNamespaceImport(this.createIdentifier(name));
    }
    createNamespaceExport(name) {
        return ts.factory.createNamespaceExport(this.createIdentifier(name));
    }
    createNamedImports(...elements) {
        return ts.factory.createNamedImports(elements);
    }
    updateImportClause(node, isTypeOnly, name, ...namedBindings) {
        return ts.factory.updateImportClause(node, isTypeOnly, this.createIdentifier(name), namedBindings.length ? namedBindings[0] : undefined);
    }
    updateAssertClause(node, elements, multiLine) {
        return ts.factory.updateAssertClause(node, elements, multiLine);
    }
    updateAssertEntry(node, name, value) {
        return ts.factory.updateAssertEntry(node, this.createIdentifier(name), value);
    }
    updateImportTypeAssertionContainer(node, clause, multiLine) {
        return ts.factory.updateImportTypeAssertionContainer(node, clause, multiLine);
    }
    updateImportAttributes(node, elements, multiLine) {
        return ts.factory.updateImportAttributes(node, elements, multiLine);
    }
    updateImportAttribute(node, name, value) {
        return ts.factory.updateImportAttribute(node, this.createIdentifier(name), value);
    }
    updateNamespaceImport(node, name) {
        return ts.factory.updateNamespaceImport(node, this.createIdentifier(name));
    }
    updateNamespaceExport(node, name) {
        return ts.factory.updateNamespaceExport(node, this.createIdentifier(name));
    }
    updateNamedImports(node, ...elements) {
        return ts.factory.updateNamedImports(node, elements);
    }
    // Additional methods to cover common usages in NodeClassFactory.ts
    createImportDeclaration(moduleSpecifier, namedImports, isTypeOnly = false, importAttributes, ...modifierFlags) {
        return ts.factory.createImportDeclaration(this.createModifiers(...modifierFlags), this.createImportClause(isTypeOnly, undefined, ts.factory.createNamedImports(namedImports.map((name) => ts.factory.createImportSpecifier(false, undefined, this.createIdentifier(name))))), ts.factory.createStringLiteral(moduleSpecifier), importAttributes);
    }
    createVariableStatement(name, initializer, isConst = true) {
        return ts.factory.createVariableStatement([ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)], ts.factory.createVariableDeclarationList([ts.factory.createVariableDeclaration(this.createIdentifier(name), undefined, undefined, initializer)], isConst ? ts.NodeFlags.Const : ts.NodeFlags.None));
    }
    createTypeAliasDeclaration(name, type) {
        return ts.factory.createTypeAliasDeclaration(undefined, this.createIdentifier(name), undefined, type);
    }
    createClassDeclaration(name, members, heritageClauses) {
        return ts.factory.createClassDeclaration(this.createModifiers(ts.ModifierFlags.Export), this.createIdentifier(name), undefined, heritageClauses, members);
    }
    and(...flags) {
        if (flags.length === 0) {
            return 0;
        }
        return flags.reduce((acc, flag) => acc & flag, flags[0]);
    }
    or(...flags) {
        if (flags.length === 0) {
            return 0;
        }
        return flags.reduce((acc, flag) => acc | flag, flags[0]);
    }
    createModifiers(...flags) {
        return ts.factory.createModifiersFromModifierFlags(this.or(...flags));
    }
    createMethodDeclaration(name, parameters, body, isAsync = false) {
        return ts.factory.createMethodDeclaration(isAsync ? this.createModifiers(ts.ModifierFlags.Async) : undefined, undefined, this.createIdentifier(name), undefined, undefined, parameters, undefined, body);
    }
    createPropertyDeclaration(name, initializer, modifiers = []) {
        return ts.factory.createPropertyDeclaration(modifiers, this.createIdentifier(name), undefined, undefined, initializer);
    }
    createConstructorDeclaration(parameters, body) {
        return ts.factory.createConstructorDeclaration(undefined, parameters, body);
    }
    createFunctionDeclaration(name, parameters, body, returnType) {
        return ts.factory.createFunctionDeclaration([this.createModifier(ts.SyntaxKind.ExportKeyword)], undefined, this.createIdentifier(name), undefined, parameters, returnType, body);
    }
    createModifier(ExportKeyword) {
        return ts.factory.createModifier(ExportKeyword);
    }
    createModuleDeclaration(name, body, ...modifierFlags) {
        return ts.factory.createModuleDeclaration(this.createModifiers(...modifierFlags), this.createIdentifier(name), body, ts.NodeFlags.Namespace);
    }
    createToken(kind) {
        return ts.factory.createToken(kind);
    }
    createPropertySignature(name, type, optional = false, ...modifiers) {
        return ts.factory.createPropertySignature(this.createModifiers(...modifiers), this.createIdentifier(name), optional ? this.createToken(ts.SyntaxKind.QuestionToken) : undefined, type);
    }
    createTypeReferenceNode(typeName, qualifier, ...typeArguments) {
        if (typeof qualifier === 'string') {
            return ts.factory.createTypeReferenceNode(ts.factory.createQualifiedName(this.createIdentifier(qualifier), this.createIdentifier(typeName)), typeArguments);
        }
        else {
            return ts.factory.createTypeReferenceNode(this.createIdentifier(typeName), [qualifier, ...typeArguments]);
        }
    }
    typesEqual(a, b) {
        if (ts.isLiteralTypeNode(a) && ts.isLiteralTypeNode(b)) {
            if (ts.isNumericLiteral(a.literal) && ts.isNumericLiteral(b.literal)) {
                return a.literal.text === b.literal.text;
            }
            else if (ts.isStringLiteral(a.literal) && ts.isStringLiteral(b.literal)) {
                return a.literal.text === b.literal.text;
            }
            else if (ts.isBigIntLiteral(a.literal) && ts.isBigIntLiteral(b.literal)) {
                return a.literal.text === b.literal.text;
            }
        }
        if (ts.isTypeReferenceNode(a) && ts.isTypeReferenceNode(b)) {
            if (ts.isIdentifier(a.typeName) && ts.isIdentifier(b.typeName)) {
                return a.typeName.text === b.typeName.text;
            }
        }
        if (a.kind === ts.SyntaxKind.NumberKeyword || a.kind === ts.SyntaxKind.StringKeyword || a.kind === ts.SyntaxKind.BigIntKeyword) {
            return a.kind === b.kind;
        }
        return false;
    }
    createUnionTypeNode(...types) {
        let t = unique(types, this.typesEqual);
        /*try
        {
        let t = [types[0]];
        for (let i = 1; i < types.length; i++) {
            if (types[i].kind !== ts.SyntaxKind.NeverKeyword) {
                if (types[i].kind === ts.SyntaxKind.UnionType) {
                    types.push(...(types[i] as ts.UnionTypeNode).types);
                } else if (!t.some((x) => this.typesEqual(x, types[i]))) t.push(types[i]);
            }
        }
            return ts.factory.createUnionTypeNode(t);
        }
        catch(e)
        {*/
        //console.warn(e);
        return ts.factory.createUnionTypeNode(t);
        //}
    }
    createIntersectionTypeNode(types) {
        return ts.factory.createIntersectionTypeNode(types);
    }
    createTypeLiteralNode(members) {
        return ts.factory.createTypeLiteralNode(members);
    }
    createFunctionTypeNode(type, typeParameters, ...parameters) {
        return ts.factory.createFunctionTypeNode(typeParameters, parameters, type);
    }
    createParameter(name, type, initializer, optional = false) {
        return ts.factory.createParameterDeclaration(undefined, undefined, this.createIdentifier(name), optional ? this.createToken(ts.SyntaxKind.QuestionToken) : undefined, type, initializer);
    }
    createExpressionStatement(expression) {
        return ts.factory.createExpressionStatement(expression);
    }
    createCallExpression(expression, typeArguments, argumentsArray) {
        return ts.factory.createCallExpression(expression, typeArguments, argumentsArray);
    }
    createReturnStatement(expression) {
        return ts.factory.createReturnStatement(expression);
    }
    createNewExpression(expression, typeArguments, argumentsArray) {
        return ts.factory.createNewExpression(expression, typeArguments, argumentsArray);
    }
    createObjectLiteral(properties, multiLine) {
        return ts.factory.createObjectLiteralExpression(properties, multiLine);
    }
    createPropertyAssignment(name, initializer) {
        return ts.factory.createPropertyAssignment(this.createIdentifier(name), initializer);
    }
    createQualifiedName(left, right) {
        return ts.factory.createQualifiedName(left, this.createIdentifier(right));
    }
    createLiteralTypeNode(literal) {
        if (typeof literal === 'number') {
            return ts.factory.createLiteralTypeNode(this.createNumericLiteral(literal));
        }
        return ts.factory.createLiteralTypeNode(this.createStringLiteral(literal));
    }
    createLiteral(value) {
        if (typeof value === 'number') {
            return this.createNumericLiteral(value);
        }
        return this.createStringLiteral(value);
    }
    createNumericLiteral(value, flags) {
        return ts.factory.createNumericLiteral(value.toString(), flags);
    }
    createStringLiteral(text) {
        return ts.factory.createStringLiteral(text, true);
    }
    createKeywordTypeNode(kind) {
        return ts.factory.createKeywordTypeNode(kind);
    }
    createTypePredicateNode(parameterName, type) {
        return ts.factory.createTypePredicateNode(undefined, parameterName, type);
    }
    createBinaryExpression(left, operator, right) {
        return ts.factory.createBinaryExpression(left, operator, right);
    }
    createPropertyAccessExpression(expression, name) {
        return ts.factory.createPropertyAccessExpression(expression, name);
    }
    createHeritageClause(token, ...types) {
        return ts.factory.createHeritageClause(token, types);
    }
    createExpressionWithTypeArguments(expression, ...typeArguments) {
        return ts.factory.createExpressionWithTypeArguments(expression, typeArguments);
    }
    createBlock(multiLine, ...statements) {
        if (typeof multiLine === 'boolean') {
            return ts.factory.createBlock(statements, multiLine);
        }
        return ts.factory.createBlock([multiLine, ...statements], true);
    }
    createModuleBlock(statements) {
        return ts.factory.createModuleBlock(statements);
    }
    createInterfaceDeclaration(name, members, heritageClauses) {
        return ts.factory.createInterfaceDeclaration([ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)], this.createIdentifier(name), undefined, heritageClauses, members);
    }
    createTypeOperatorNode(operator, type) {
        return ts.factory.createTypeOperatorNode(operator, type);
    }
    createTypeQueryNode(exprName) {
        return ts.factory.createTypeQueryNode(exprName);
    }
    createAsExpression(expression, type) {
        return ts.factory.createAsExpression(expression, type);
    }
    createPropertyAccessChain(name, useQuestionDot = true, expression) {
        return ts.factory.createPropertyAccessChain(expression, useQuestionDot ? this.createToken(ts.SyntaxKind.QuestionDotToken) : undefined, this.createIdentifier(name));
    }
}
//# sourceMappingURL=CodeFactory.js.map