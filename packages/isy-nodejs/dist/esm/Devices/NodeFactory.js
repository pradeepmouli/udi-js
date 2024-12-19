import { ISY } from '../ISY.js';
import { isDynamic } from '../Model/NodeInfo.js';
import { Family } from '../Definitions/index.js';
export var NodeFactory;
(function (NodeFactory) {
    NodeFactory.registry = {};
    NodeFactory.implementsRegistry = {};
    function register(nodeClass, id = nodeClass.nodeDefId) {
        //let s; //FamilyNodeClassRegistry<(typeof Family)[F]>;
        let f = Family[nodeClass.family];
        let s = (NodeFactory.registry[f] ?? (NodeFactory.registry[f] = {}));
        s[id] = nodeClass;
        if (!NodeFactory.implementsRegistry[f]) {
            NodeFactory.implementsRegistry[f] = {};
        }
        NodeFactory.implementsRegistry[f][id] = nodeClass.implements;
    }
    NodeFactory.register = register;
    function compare(a, b) {
        if (a.nodeDefId === b.nodeDefId) {
            return 0;
        }
        if (a.implements.includes(b.nodeDefId))
            return 1;
        if (b.implements.includes(a.nodeDefId))
            return -1;
        return a.nodeDefId.localeCompare(b.nodeDefId);
    }
    function sortImplementsRegistry() {
        for (let f in NodeFactory.implementsRegistry) {
            let reg = NodeFactory.implementsRegistry[f];
            for (let e in reg) {
                reg[e] = reg[e].sort((a, b) => compare(getForNodeDefId(f, a), getForNodeDefId(f, b)));
            }
        }
    }
    NodeFactory.sortImplementsRegistry = sortImplementsRegistry;
    function getImplements(node) {
        return NodeFactory.implementsRegistry[Family[node.family]][node.nodeDefId];
    }
    NodeFactory.getImplements = getImplements;
    function getForNode(family, node) {
        if (isDynamic(node)) {
            return getForNodeDefId(family, node.sgid);
        }
        return getForNodeDefId(family, node.nodeDefId);
    }
    NodeFactory.getForNode = getForNode;
    function getForNodeDefId(family, nodeDefId) {
        if (typeof family === "string") {
            return NodeFactory.registry[family][nodeDefId];
        }
        else if (typeof family === "number") {
            return NodeFactory.registry[Family[family]][nodeDefId];
        }
    }
    NodeFactory.getForNodeDefId = getForNodeDefId;
    async function get(node, isy = ISY.instance) {
        if (!isDynamic(node)) {
            return Promise.resolve(getForNodeDefId(Family[node.family ?? Family.Insteon], node.nodeDefId));
        }
        else {
            var nd = getForNodeDefId(Family[node.family], String(node.sgid));
            if (nd) {
                return Promise.resolve(nd);
            }
            let n = (await isy.sendRequest(`zmatter/${node.family == Family.ZWave ? "zwave" : "zb"}/node/${node.address}/def/get?full=true`));
            let cls = (await import('../Devices/GenericNode.js')).GenericNode;
            NodeFactory.register(cls, n.nls);
            return cls;
        }
    }
    NodeFactory.get = get;
    async function create(nodeInfo, isy = ISY.instance) {
        const nodeClass = await get(nodeInfo);
        if (nodeClass.name !== "ISYNode") {
            return new nodeClass(isy, nodeInfo);
        }
        else {
            throw new Error(`No class found for ${nodeInfo.family}.${nodeInfo.nodeDefId}`);
        }
    }
    NodeFactory.create = create;
})(NodeFactory || (NodeFactory = {}));
//# sourceMappingURL=NodeFactory.js.map