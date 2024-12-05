import { ISY } from '../ISY.js';
import { ISYNode } from '../ISYNode.js';
import { type NodeInfo } from '../Model/NodeInfo.js';
import type { StringKeys } from '../Utils.js';
import { Family } from '../Definitions/index.js';
export declare namespace NodeFactory {
    const registry: NodeClassRegistry;
    type NodeClass<T extends Family | keyof typeof Family> = T extends Family ? typeof ISYNode<T, any, any, any> : T extends keyof typeof Family ? typeof ISYNode<typeof Family[T], any, any, any> : never;
    const implementsRegistry: {
        [x in StringKeys<typeof Family>]?: {
            [x: string]: string[];
        };
    };
    function register<F extends keyof typeof Family>(nodeClass: NodeClass<F>, id?: string): void;
    function sortImplementsRegistry(): void;
    function getImplements<F extends keyof typeof Family, T extends ISYNode<typeof Family[F], any, any, any>>(node: T | typeof ISYNode): string[];
    function getForNode<F extends keyof typeof Family>(family: F, node: NodeInfo<typeof Family[F]>): NodeClass<F>;
    function getForNodeDefId<F extends keyof typeof Family | Family>(family: F, nodeDefId: string): NodeClass<F>;
    function get<F extends keyof typeof Family>(node: NodeInfo<typeof Family[F]>, isy?: ISY): Promise<typeof ISYNode<typeof Family[F], any, any, any>>;
    function create<F extends Family>(nodeInfo: NodeInfo<F>, isy?: ISY): Promise<ISYNode<F, any, any, any>>;
}
export type FamilyNodeClassRegistry<T extends Family> = {
    [x: string]: NodeFactory.NodeClass<T>;
};
type NodeClassRegistry = {
    [x in Extract<keyof typeof Family, string>]?: FamilyNodeClassRegistry<typeof Family[x]>;
};
export {};
//# sourceMappingURL=NodeFactory.d.ts.map