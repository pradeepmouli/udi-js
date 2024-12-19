import type { Family, ISY } from '../../ISY.js';
import 'winston';
import type { NodeInfo } from '../../Model/NodeInfo.js';
import { DimmerLampSwitch } from './Generated/DimmerLampSwitch.js';
export declare class InsteonDimmableDevice extends DimmerLampSwitch.Node {
    constructor(isy: ISY, node: NodeInfo<Family.Insteon>);
}
//# sourceMappingURL=InsteonDimmableDevice.d.ts.map