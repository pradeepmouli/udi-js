;
function isNested(property, input) {
    let prop = `${property}s`;
    return input.hasOwnProperty(prop) ? input[prop].hasOwnProperty(property) : false;
}
let x = /sts/;
//type isNestedNodeDef = isNested<NodeDef>;
export function flattenNestedProperty(input, property) {
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
export function flattenNestedObject(input) {
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
//# sourceMappingURL=NodeDef.js.map