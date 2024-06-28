import { Categories } from './Categories.js';
import { EventEmitter as BaseEventEmitter } from 'events';
export function byteToPct(value) {
    return Math.round((value * 100) / 255);
}
export function pctToByte(value) {
    return Math.round((value * 255) / 100);
}
export function byteToDegree(value) {
    return Math.fround(value / 2);
}
let lastrequest = Promise.resolve();
export var Family;
(function (Family) {
    Family[Family["Insteon"] = 1] = "Insteon";
    Family[Family["UPB"] = 7] = "UPB";
})(Family || (Family = {}));
export class EventEmitter extends BaseEventEmitter {
}
export function parseTypeCode(typeCode) {
    try {
        const s = typeCode.split('.');
        let output = { category: Number(s[0]), deviceCode: Number(s[1]), firmwareVersion: Number(Number(s[2]).toString(16)), minorVersion: Number(Number(s[3]).toString(16)) };
        return output;
    }
    catch (err) {
        return null;
    }
}
export function getCategory(device) {
    try {
        const s = device.type.split('.');
        return Number(s[0]);
    }
    catch (err) {
        return Categories.Unknown;
    }
}
export function getSubcategory(device) {
    try {
        const s = device.type.split('.');
        return Number(s[1]);
    }
    catch (err) {
        return Categories.Unknown;
    }
}
