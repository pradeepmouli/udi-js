import { Family, ISY } from '../ISY.js';
import type { ISYNode } from '../ISYNode.js';
import type { NodeInfo } from '../Model/NodeInfo.js';
import type { Constructor } from './Constructor.js';
export declare namespace NodeFactory {
    const registry: NodeClassRegistry;
    function isDynamic(node: NodeInfo): boolean;
    function isDynamicClass(node: NodeInfo): boolean;
    function register<F extends keyof typeof Family>(nodeClass: typeof ISYNode<(typeof Family)[F], any, any, any>): void;
    function getForNodeDefId<F extends keyof typeof Family>(family: F, nodeDefId: string): Constructor<ISYNode<(typeof Family)[F], any, any, any>>;
    function getForNLSId<F extends keyof typeof Family>(family: F, nodeDefId: string): Constructor<ISYNode<(typeof Family)[F], any, any, any>>;
    function get<F extends keyof typeof Family>(node: NodeInfo, isy?: ISY): Promise<Constructor<ISYNode<(typeof Family)[F], any, any, any>>>;
    function create(nodeInfo: NodeInfo, isy?: ISY): Promise<ISYNode<Family, any, any, any>>;
}
export type FamilyNodeClassRegistry<T extends Family> = Map<string, Constructor<ISYNode<T, any, any, any>>>;
export type NodeClassRegistry = {
    [x in Extract<keyof typeof Family, string>]?: FamilyNodeClassRegistry<typeof Family[x]>;
};
//# sourceMappingURL=NodeFactory.d.ts.map