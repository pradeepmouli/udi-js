import ts from 'typescript';
import { Family } from '../ISY.js';
import type { NodeClassDefinition } from '../Model/ClassDefinition.js';
export declare function buildNodeClasses<T extends Family>(map: {
    [x: string]: NodeClassDefinition<T>;
}): {
    name: string;
    id: string;
    statements: (ts.ImportDeclaration | ts.VariableStatement | ts.TypeAliasDeclaration | ts.ClassDeclaration)[];
}[];
export declare function createNodeClass<T extends Family>(nodeClassDef: NodeClassDefinition<T>): {
    name: string;
    id: string;
    statements: (ts.ImportDeclaration | ts.VariableStatement | ts.TypeAliasDeclaration | ts.ClassDeclaration)[];
};
//# sourceMappingURL=NodeClassFactory.d.ts.map