import { Project, SourceFile, ts } from 'ts-morph';
import { Family } from '../Definitions/index.js';
import { NodeClassDefinition } from '../Model/ClassDefinition.js';
import { CodeFactory } from './NodeFactory.js';
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
    N: any;
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
}
export {};
//# sourceMappingURL=NodeClassFactory.d.ts.map