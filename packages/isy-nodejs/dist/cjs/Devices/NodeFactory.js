"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeFactory = void 0;
const ISY_js_1 = require("../ISY.js");
const ISYNode_js_1 = require("../ISYNode.js");
const NodeInfo_js_1 = require("../Model/NodeInfo.js");
var NodeFactory;
(function (NodeFactory) {
    NodeFactory.registry = {};
    function register(nodeClass, id = nodeClass.nodeDefId) {
        let s;
        s = NodeFactory.registry[ISY_js_1.Family[nodeClass.family]] ?? (NodeFactory.registry[nodeClass.family] = new Map());
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
    async function get(node, isy = ISY_js_1.ISY.instance) {
        if (!(0, NodeInfo_js_1.isDynamic)(node)) {
            return Promise.resolve(getForNodeDefId(ISY_js_1.Family[node.family], node.nodeDefId));
        }
        else {
            var nd = getForNodeDefId(ISY_js_1.Family[node.family], node.sgid);
            if (nd) {
                return Promise.resolve(nd);
            }
            let n = (await isy.sendRequest(`zmatter/${node.family == ISY_js_1.Family.ZWave ? "zwave" : "zb"}/node/${node.address}/def/get?full=true`));
            let cls = ISYNode_js_1.ISYNode;
            NodeFactory.register(cls, n.nls);
            return cls;
        }
    }
    NodeFactory.get = get;
    async function create(nodeInfo, isy = ISY_js_1.ISY.instance) {
        const nodeClass = await get(nodeInfo);
        if (nodeClass.name !== "ISYNode") {
            return new nodeClass(isy, nodeInfo);
        }
        else {
            throw new Error(`No class found for ${nodeInfo.family}.${nodeInfo.nodeDefId}`);
        }
    }
    NodeFactory.create = create;
})(NodeFactory || (exports.NodeFactory = NodeFactory = {}));
//# sourceMappingURL=NodeFactory.js.map