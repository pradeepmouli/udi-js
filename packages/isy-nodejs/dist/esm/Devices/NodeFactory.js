import { ISY } from '../ISY.js';
import { ISYNode } from '../ISYNode.js';
import { isDynamic } from '../Model/NodeInfo.js';
import { Family } from '../Definitions/index.js';
export var NodeFactory;
(function (NodeFactory) {
    NodeFactory.registry = {};
    function register(nodeClass, id = nodeClass.nodeDefId) {
        let s;
        s = NodeFactory.registry[Family[nodeClass.family]] ?? (NodeFactory.registry[nodeClass.family] = new Map());
        s.set(nodeClass.nodeDefId, nodeClass);
    }
    NodeFactory.register = register;
    function getForNodeDefId(family, nodeDefId) {
        return NodeFactory.registry[family]?.get(nodeDefId);
    }
    NodeFactory.getForNodeDefId = getForNodeDefId;
    function getForNLSId(family, nodeDefId) {
        return NodeFactory.registry[family].get(nodeDefId);
    }
    NodeFactory.getForNLSId = getForNLSId;
    async function get(node, isy = ISY.instance) {
        if (!isDynamic(node)) {
            return Promise.resolve(getForNodeDefId(Family[node.family], node.nodeDefId));
        }
        else {
            var nd = getForNodeDefId(Family[node.family], node.sgid);
            if (nd) {
                return Promise.resolve(nd);
            }
            let n = (await isy.sendRequest(`zmatter/${node.family == Family.ZWave ? "zwave" : "zb"}/node/${node.address}/def/get?full=true`));
            let cls = ISYNode;
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