import 'winston';
import { Family } from '../../Definitions/Global/Families.js';
import { ISYNode } from '../../ISYNode.js';
import { DynamicNode } from '../DynamicNode.js';
import type { NodeDef } from '../../Model/NodeDef.js';
export declare class ZWaveBase<D extends ISYNode.DriverSignatures, C extends ISYNode.CommandSignatures, E extends ISYNode.EventSignatures = {}> extends DynamicNode<Family.ZWave, D, C, E> {
    static family: Family.ZWave;
    getNodeDef(nodeDefId: string): Promise<NodeDef>;
    convertFrom(value: any, uom: number): any;
    convertTo(value: any, uom: number): any;
}
//# sourceMappingURL=ZWaveBase.d.ts.map