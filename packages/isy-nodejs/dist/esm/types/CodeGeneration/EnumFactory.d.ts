import ts from "typescript";
import type { NodeClassDefinition } from "../Model/ClassDefinition.js";
import { EnumDefinition } from "../Model/EnumDefinition.js";
import { Family } from '../Definitions/index.js';
export declare function buildEnums<T extends Family>(map: {
    [x: string]: EnumDefinition<T>;
}): GeneratedEnum<T>[];
type GeneratedEnum<T extends Family> = {
    family: T;
    name: string;
    id: string;
    path: string;
    statements: ts.EnumDeclaration[];
};
export declare function createEnum<T extends Family>(enumDef: EnumDefinition<T>): GeneratedEnum<T>;
declare class CodeFactory {
}
export declare class EnumFactory extends CodeFactory {
    static generateEnumsForFamily<T extends Family>(family: T): GeneratedEnum<T>[];
    static generateAll(): any[];
}
export declare function createNodeClass<T extends Family>(nodeClassDef: NodeClassDefinition<T>): {
    name: string;
    id: string;
    statements: (ts.ImportDeclaration | ts.VariableStatement | ts.TypeAliasDeclaration | ts.ClassDeclaration)[];
};
export declare function createMemberName(name: string, mapNullishTo?: string): any;
export {};
//# sourceMappingURL=EnumFactory.d.ts.map