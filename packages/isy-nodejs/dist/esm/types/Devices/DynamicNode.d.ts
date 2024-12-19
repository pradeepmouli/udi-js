import { type Family } from '../Definitions/index.js';
import type { ISY } from '../ISY.js';
import { ISYNode } from '../ISYNode.js';
import type { NodeDef } from '../Model/NodeDef.js';
import type { NodeInfo } from '../Model/NodeInfo.js';
import { ISYDeviceNode } from './ISYDeviceNode.js';
export declare abstract class DynamicNode<T extends Family.ZWave | Family.ZigBee, D extends ISYNode.DriverSignatures, C, E extends ISYNode.EventSignatures> extends ISYDeviceNode<T, D, C, E> {
    abstract getNodeDef(nodeDefId: string): Promise<NodeDef>;
    constructor(isy: ISY, node: NodeInfo<T>);
}
//# sourceMappingURL=DynamicNode.d.ts.map