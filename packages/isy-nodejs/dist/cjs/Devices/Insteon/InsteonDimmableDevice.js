"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsteonDimmableDevice = void 0;
require("winston");
const DimmerLampSwitch_js_1 = require("./DimmerLampSwitch.js");
// #endregion Type aliases (2)
// #region Classes (1)
//@ts-ignore
class InsteonDimmableDevice extends DimmerLampSwitch_js_1.DimmerLampSwitch.Node {
    // #region Constructors (1)
    constructor(isy, node) {
        super(isy, node);
        this.isDimmable = true;
    }
}
exports.InsteonDimmableDevice = InsteonDimmableDevice;
// #endregion Classes (1)
//# sourceMappingURL=InsteonDimmableDevice.js.map