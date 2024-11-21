export var BehaviorRegistry;
(function (BehaviorRegistry) {
    const registry = {};
    function register(behavior) {
        registry[behavior.cluster.name.toLowerCase()] = behavior;
    }
    BehaviorRegistry.register = register;
    function get(cluster) {
        return registry[cluster.toLowerCase()];
    }
    BehaviorRegistry.get = get;
})(BehaviorRegistry || (BehaviorRegistry = {}));
//# sourceMappingURL=BehaviorRegistry.js.map