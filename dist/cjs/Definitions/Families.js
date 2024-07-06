"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Family = void 0;
const ISYEvent_js_1 = require("../Events/ISYEvent.js");
var Family;
(function (Family) {
    Family[Family["Elk"] = 0] = "Elk";
    Family[Family["Insteon"] = 1] = "Insteon";
    Family[Family["UPB"] = 2] = "UPB";
    Family[Family["ZigBeeLegacy"] = 3] = "ZigBeeLegacy";
    Family[Family["ZWaveLegacy"] = 4] = "ZWaveLegacy";
    Family[Family["AutoDR"] = 5] = "AutoDR";
    Family[Family["Scene"] = 6] = "Scene";
    Family[Family["UDI"] = 7] = "UDI";
    Family[Family["Brultech"] = 8] = "Brultech";
    Family[Family["NCD"] = 9] = "NCD";
    Family[Family["Poly"] = 10] = "Poly";
    Family[Family["Lutron"] = 11] = "Lutron";
    Family[Family["ZWave"] = 12] = "ZWave";
    Family[Family["ZigBee"] = 14] = "ZigBee";
})(Family || (exports.Family = Family = {}));
class GenericEvent extends ISYEvent_js_1.ISYEvent {
}
