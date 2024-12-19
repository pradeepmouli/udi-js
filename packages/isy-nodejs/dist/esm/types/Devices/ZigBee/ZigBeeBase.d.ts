import 'winston';
import { Family } from '../../Definitions/Global/Families.js';
import { ISYNode } from '../../ISYNode.js';
import { DynamicNode } from '../DynamicNode.js';
import type { NodeDef } from '../../Model/NodeDef.js';
export declare class ZigBeeBase<D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures = {}> extends DynamicNode<Family.ZigBee, D, C, E> {
    static family: Family.ZigBee;
    getNodeDef(nodeDefId: string): Promise<NodeDef>;
}
//# sourceMappingURL=ZigBeeBase.d.ts.map