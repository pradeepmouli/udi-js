import 'winston';
import { DimmerLampSwitchNode } from './Generated/DimmerLampSwitch.js';
// #endregion Type aliases (2)
// #region Classes (1)
//@ts-ignore
export class InsteonDimmableDevice extends DimmerLampSwitchNode {
    // #region Constructors (1)
    constructor(isy, node) {
        super(isy, node);
        this.isDimmable = true;
    }
}
// #endregion Classes (1)
//# sourceMappingURL=InsteonDimmableDevice.js.map