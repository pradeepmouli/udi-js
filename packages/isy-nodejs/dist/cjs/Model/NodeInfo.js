"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.family = family;
exports.isDynamic = isDynamic;
exports.isStatic = isStatic;
const ISY_js_1 = require("../ISY.js");
// #endregion Interfaces (7)
// #region Functions (3)
function family(nodeInfo) {
    if (nodeInfo.family === ISY_js_1.Family.ZWave) {
        return true;
    }
}
function isDynamic(nodeInfo) {
    return nodeInfo.family in [ISY_js_1.Family.ZWave, ISY_js_1.Family.ZigBee];
}
function isStatic(nodeInfo) {
    return !isDynamic(nodeInfo);
}
// #endregion Functions (3)
//# sourceMappingURL=NodeInfo.js.map