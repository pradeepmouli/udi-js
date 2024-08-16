import ts from "typescript";
import { Family } from "../ISY.js";
import { NodeClassDefinition } from "../Model/ClassDefinition.js";
type GeneratedNodeClass<T extends Family> = {
    family: T;
    name: string;
    id: string;
    path: string;
    statements: (ts.ImportDeclaration | ts.VariableStatement | ts.TypeAliasDeclaration | ts.ClassDeclaration | ts.ExpressionStatement | ts.ModuleDeclaration)[];
};
export declare class NodeClassFactory {
    generateAll(): {
        family: Family;
        path: string;
        statements: ts.Statement[];
    }[];
    generateClassesForFamily<T extends Family>(family: T): GeneratedNodeClass<T>[];
}
export declare function buildNodeClasses<T extends Family>(map: {
    [x: string]: NodeClassDefinition<T>;
}): {
    family: T;
    name: string;
    id: string;
    path: string;
    statements: (ts.ImportDeclaration | ts.VariableStatement | ts.TypeAliasDeclaration | ts.ClassDeclaration | ts.ExpressionStatement | ts.ModuleDeclaration)[];
}[];
export declare function createNodeClass<T extends Family>(nodeClassDef: NodeClassDefinition<T>): GeneratedNodeClass<T>;
export {};
//# sourceMappingURL=NodeClassFactory.d.ts.map