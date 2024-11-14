import { ts } from 'ts-morph';
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
    statements: (import("typescript").VariableStatement | import("typescript").ClassDeclaration | import("typescript").TypeAliasDeclaration | import("typescript").ImportDeclaration)[];
};
export {};
//# sourceMappingURL=EnumFactory.d.ts.map