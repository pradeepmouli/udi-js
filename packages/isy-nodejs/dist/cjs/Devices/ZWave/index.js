"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
exports.create = create;
const index_js_1 = require("../../Definitions/index.js");
const ISYNode_js_1 = require("../../ISYNode.js");
const NodeFactory_js_1 = require("../NodeFactory.js");
class Base extends ISYNode_js_1.ISYNode {
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.family = index_js_1.Family.ZWave;
    }
    async getNodeDef() {
        return this.isy.sendRequest(`zmatter/zwave/node/${this.address}/def/get?full=true`);
    }
}
exports.Base = Base;
async function create(...nodeInfo) {
    let nodes = [];
    for (const node of nodeInfo) {
        nodes.push(await NodeFactory_js_1.NodeFactory.create(node));
    }
    return nodes;
}
//# sourceMappingURL=index.js.map