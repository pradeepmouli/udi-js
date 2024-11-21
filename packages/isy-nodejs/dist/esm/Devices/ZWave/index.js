import { Family as FamilyEnum } from '../../Definitions/index.js';
import { ISYNode } from '../../ISYNode.js';
import { NodeFactory } from '../NodeFactory.js';
export class Base extends ISYNode {
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.family = FamilyEnum.ZWave;
    }
    async getNodeDef() {
        return this.isy.sendRequest(`zmatter/zwave/node/${this.address}/def/get?full=true`);
    }
}
export async function create(...nodeInfo) {
    let nodes = [];
    for (const node of nodeInfo) {
        nodes.push(await NodeFactory.create(node));
    }
    return nodes;
}
//export * from './Generated/index.js';
//# sourceMappingURL=index.js.map