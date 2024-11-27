import type { ISY } from '../ISY.js';
import type { DriverState } from '../Model/DriverState.js';
import type { NodeInfo } from '../Model/NodeInfo.js';
import { ISYDeviceNode } from './ISYDeviceNode.js';
export declare class GenericNode extends ISYDeviceNode<any, any, any, any> {
    constructor(isy: ISY, node: NodeInfo);
    applyStatus(prop: DriverState): void;
}
//# sourceMappingURL=GenericNode.d.ts.map