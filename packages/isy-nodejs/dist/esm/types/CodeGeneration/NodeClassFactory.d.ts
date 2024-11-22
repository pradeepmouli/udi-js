import { Project, SourceFile, ts } from 'ts-morph';
import { Family } from '../Definitions/index.js';
import { CommandDefinition, DataTypeDefinition, DriverDefinition, NodeClassDefinition, ParameterDefinition } from '../Model/ClassDefinition.js';
import { CodeFactory } from './CodeFactory.js';
type GeneratedNodeClass<T extends Family> = {
    family: T;
    name: string;
    id: string;
    path: string;
    statements: any;
    sourceFile: SourceFile;
};
export declare class NodeClassFactory extends CodeFactory {
    static _basePath: string;
    static project: Project;
    static instance: NodeClassFactory;
    static get basePath(): string;
    static set basePath(value: string);
    static buildNodeClasses<T extends Family>(map: {
        [x: string]: NodeClassDefinition<T>;
    }): GeneratedNodeClass<T>[];
    createNodeClass<T extends Family>(nodeClassDef: NodeClassDefinition<T>): {
        family: T;
        name: string;
        id: string;
        path: string;
        statements: ts.NodeArray<ts.Statement>;
        sourceFile: SourceFile;
    };
    static generateAll(): {
        family: Family;
        path: string;
        statements: ts.Statement[];
    }[];
    static generateClassesForFamily<T extends Family>(family: T): GeneratedNodeClass<T>[];
    static buildClassIndex<T extends Family>(family: T, classes: GeneratedNodeClass<T>[]): {
        family: T;
        path: string;
        statements: import("typescript").ExportDeclaration[];
    };
    createCommandArguments(def: CommandDefinition): any[];
    createCommandMethodDeclaration(def: CommandDefinition): import("typescript").MethodDeclaration;
    createCommandParameterType(def: DataTypeDefinition, parent: ParameterDefinition): ts.TypeNode;
    createCommandSignature(def: CommandDefinition): import("typescript").PropertySignature;
    createDriverGetDeclaration(def: DriverDefinition): import("typescript").GetAccessorDeclaration;
    createDriverInitializationStatement(def: DriverDefinition): ts.Statement;
    createDriverPropertyReturnType(def: DataTypeDefinition, parent: DriverDefinition): ts.TypeNode;
    createDriverSignature(def: DriverDefinition): import("typescript").PropertySignature;
    createDriverSignatureReturnType(def: DataTypeDefinition, parent: DriverDefinition): ts.TypeNode;
    createParameterDeclarationSignature(def: ParameterDefinition): import("typescript").ParameterDeclaration;
    createParameterSignature(def: ParameterDefinition): import("typescript").ParameterDeclaration;
    createTypeNodeForUOM(uom: number): ts.TypeNode;
}
export {};
//# sourceMappingURL=NodeClassFactory.d.ts.map