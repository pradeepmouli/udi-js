import { Family as FamilyEnum } from '../../Definitions/index.js';
import type { ISY } from '../../ISY.js';
import { ISYNode } from '../../ISYNode.js';
import type { NodeInfo } from '../../Model/NodeInfo.js';
export declare class Base<Drivers extends ISYNode.DriverSignatures, Commands extends ISYNode.CommandSignatures> extends ISYNode<FamilyEnum.ZWave, Drivers, Commands> {
    constructor(isy: ISY, nodeInfo: NodeInfo);
    getNodeDef(): Promise<any>;
}
export declare function create(...nodeInfo: NodeInfo<FamilyEnum.ZWave>[]): Promise<Base<any, any>[]>;
//# sourceMappingURL=index.d.ts.map