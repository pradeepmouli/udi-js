import { Registry } from '../../Registry.js';
export var BehaviorRegistry;
(function (BehaviorRegistry) {
    const registry = new Registry();
    function register(behavior, family) {
        if (family) {
            registry.register(behavior.cluster.name.toLowerCase(), behavior, family);
            return;
        }
        registry.register(behavior.cluster.name.toLowerCase(), behavior, behavior.nodeClass);
    }
    BehaviorRegistry.register = register;
    function get(node, cluster) {
        return registry.get(node, cluster.toLowerCase());
    }
    BehaviorRegistry.get = get;
    /*const registry: {[x:string]: Behavior.Type} = {};
    const nodeLevelRegistry: {[x:string]: {[x:string]: Behavior.Type}} = {};



    register<T extends Behavior.Type>(behavior: T & {cluster: {name: string}, nodeClass: {nodeDefId}} ): void
    {
        registry[behavior.cluster.name.toLowerCase()] = behavior;
        nodeLevelRegistry[behavior.nodeClass.nodeDefId] = nodeLevelRegistry[behavior.
        nodeClass.nodeDefId] ?? {};
        nodeLevelRegistry[behavior.nodeClass.nodeDefId][behavior.cluster.name.toLowerCase()] = behavior;

    }

     function get(nodeClass: typeof ISYNode, cluster: string): Behavior.Type
    {
        if(nodeLevelRegistry[nodeClass.nodeDefId])
            return nodeLevelRegistry[nodeClass.nodeDefId][cluster.toLowerCase()];
        else
            for (const nodeDefId in NodeFactory.getImplements(nodeClass))
            {
                if(nodeLevelRegistry[nodeDefId][cluster.toLowerCase()])
                    return nodeLevelRegistry[nodeDefId][cluster.toLowerCase()];
            }
        return registry[cluster.toLowerCase()];

    }*/
})(BehaviorRegistry || (BehaviorRegistry = {}));
//# sourceMappingURL=BehaviorRegistry.js.map