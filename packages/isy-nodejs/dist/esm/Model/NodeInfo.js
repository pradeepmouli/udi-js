import { Family } from '../Definitions/index.js';
// #endregion Interfaces (7)
// #region Functions (3)
export function family(nodeInfo) {
    if (nodeInfo.family === Family.ZWave) {
        return true;
    }
}
export function isDynamic(nodeInfo) {
    return [Family.ZWave, Family.ZigBee].includes(nodeInfo.family);
}
export function isStatic(nodeInfo) {
    return !isDynamic(nodeInfo);
}
// #endregion Functions (3)
//# sourceMappingURL=NodeInfo.js.map