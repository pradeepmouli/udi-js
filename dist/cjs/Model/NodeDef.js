"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flattenNestedProperty = flattenNestedProperty;
exports.flattenNestedObject = flattenNestedObject;
;
function isNested(property, input) {
    let prop = `${property}s`;
    return input.hasOwnProperty(prop) ? input[prop].hasOwnProperty(property) : false;
}
let x = /sts/;
//type isNestedNodeDef = isNested<NodeDef>;
function flattenNestedProperty(input, property) {
    if (isNested(property, input)) {
        //@ts-expect-error
        return { ...input, [`${property}s`]: input[`${property}s`][property] };
    }
}
//   for (const key in Object.keys(input)) {
//     const subkey = key.left(key.length - 1);
//     if (isNested(subkey, input)) {
//       const newValue = input[key][subkey];
//       clone[key] = newValue; //isArray(newValue) ? newValue.map(flattenNestedObject) : flattenNestedObject(newValue);
//     } else {
//       clone[key] = input[key];
//     }
//   }
//   return clone;
// }
function flattenNestedObject(input) {
    let clone = {};
    for (const key in Object.keys(input)) {
        const subkey = key.left(key.length - 1);
        if (isNested(subkey, input)) {
            const newValue = input[key][subkey];
            clone[key] = newValue; //isArray(newValue) ? newValue.map(flattenNestedObject) : flattenNestedObject(newValue);
        }
        else {
            clone[key] = input[key];
        }
    }
    return clone;
}
