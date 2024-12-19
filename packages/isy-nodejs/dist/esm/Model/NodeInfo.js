import { Family } from '../Definitions/index.js';
// #endregion Interfaces (7)
// #region Functions (3)
export function isFamily(nodeInfo, family) {
    return nodeInfo.family ?? 1 === family;
}
export function parseDeviceInfo(nodeInfo) {
    const type = nodeInfo.type === undefined || nodeInfo.type === '0.0.0.0' ? nodeInfo.hint : nodeInfo.type;
    const family = nodeInfo.family ?? nodeInfo.family == 0 ? Family.Insteon : nodeInfo.family;
    if (isFamily(nodeInfo, Family.Insteon)) {
        const s = type.split('.');
        return { category: Number(s[0]), model: Number(s[1]), firmwareVersion: Number(Number(s[2]).toString(16)), firmwareRevision: Number(Number(s[3]).toString(16)) };
    }
    else {
        const s = type.split('.');
        return { domain: Number(s[0]), category: Number(s[1]), subcategory: Number(s[1]), model: Number(s[2]) };
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