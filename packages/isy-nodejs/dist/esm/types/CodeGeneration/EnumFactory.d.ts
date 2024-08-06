import ts from 'typescript';
import { Family } from '../ISY.js';
import type { NodeClassDefinition } from '../Model/ClassDefinition.js';
import { EnumDefinition } from '../Model/EnumDefinition.js';
export declare function buildEnums<T extends Family>(map: {
    [x: string]: EnumDefinition<T>;
}): {
    name: string;
    id: string;
    statements: ts.EnumDeclaration[];
}[];
export declare function createEnum(enumDef: EnumDefinition<Family>): {
    name: string;
    id: string;
    statements: ts.EnumDeclaration[];
};
export declare function createNodeClass<T extends Family>(nodeClassDef: NodeClassDefinition<T>): {
    name: string;
    id: string;
    statements: (ts.ImportDeclaration | ts.VariableStatement | ts.TypeAliasDeclaration | ts.ClassDeclaration)[];
};
//# sourceMappingURL=EnumFactory.d.ts.map