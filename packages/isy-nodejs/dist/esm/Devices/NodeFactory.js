import { Family, ISY } from '../ISY.js';
export var NodeFactory;
(function (NodeFactory) {
    NodeFactory.registry = {};
    function isDynamic(node) {
        return node.family in [Family.ZWave, Family.ZigBee];
    }
    NodeFactory.isDynamic = isDynamic;
    function isDynamicClass(node) {
        return node.family in [Family.ZWave, Family.ZigBee];
    }
    NodeFactory.isDynamicClass = isDynamicClass;
    function register(nodeClass) {
        let s;
        s = NodeFactory.registry[nodeClass.family] ?? (NodeFactory.registry[nodeClass.family] = new Map());
        s.set(nodeClass.nodeDefId, nodeClass);
    }
    NodeFactory.register = register;
    function getForNodeDefId(family, nodeDefId) {
        return NodeFactory.registry[family]?.get(nodeDefId);
    }
    NodeFactory.getForNodeDefId = getForNodeDefId;
    function getForNLSId(family, nodeDefId) {
        return NodeFactory.registry[family]?.get(nodeDefId);
    }
    NodeFactory.getForNLSId = getForNLSId;
    async function get(node, isy = ISY.instance) {
        if (!isDynamic(node))
            return getForNodeDefId(Family[node.family], node.nodeDefId);
        else {
            let n = (await isy.sendRequest(`zmatter/${node.family == Family.ZWave ? "zwave" : "zb"}/node/${node.address}/def/get?full=true`));
            return getForNLSId(Family[node.family], n.nls);
        }
    }
    NodeFactory.get = get;
    async function create(nodeInfo, isy = ISY.instance) {
        const nodeClass = await get(nodeInfo);
        if (nodeClass) {
            return new nodeClass(isy, nodeInfo);
        }
        else {
            throw new Error(`No class found for ${nodeInfo.family}.${nodeInfo.nodeDefId}`);
        }
    }
    NodeFactory.create = create;
})(NodeFactory || (NodeFactory = {}));
//# sourceMappingURL=NodeFactory.js.map