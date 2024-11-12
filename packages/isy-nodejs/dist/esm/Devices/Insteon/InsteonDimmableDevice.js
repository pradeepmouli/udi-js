import 'winston';
import { DimmerLampSwitch } from './DimmerLampSwitch.js';
// #endregion Type aliases (2)
// #region Classes (1)
//@ts-ignore
export class InsteonDimmableDevice extends DimmerLampSwitch.Node {
    // #region Constructors (1)
    constructor(isy, node) {
        super(isy, node);
        this.isDimmable = true;
    }
}
// #endregion Classes (1)
//# sourceMappingURL=InsteonDimmableDevice.js.map