export function right(numChars) {
    var l = this.length;
    return this.substring(length - numChars);
}
export function left(numChars) {
    return this.substring(0, numChars - 1);
}
export function rightWithToken(maxNumChars, token = ' ') {
    var s = this.split(token);
    var sb = s.pop();
    var sp = s.pop();
    while (sp !== undefined && sb.length + sp.length + token.length <= maxNumChars) {
        sb = sp + token + sb;
        sp = s.pop();
    }
    return sb;
}
export function leftWithToken(maxNumChars, token = ' ') {
    var s = this.split(token).reverse();
    var sb = s.pop();
    var sp = s.pop();
    while (sp !== undefined && sb.length + sp?.length + token.length <= maxNumChars) {
        sb = sb + token + sp;
        sp = s.pop();
    }
    return sb;
}
export function remove(searchValue) {
    return this.replace(searchValue, '');
}
export function removeAll(searchValue) {
    return this.replaceAll(searchValue, '');
}
String.prototype.remove = remove;
String.prototype.removeAll = removeAll;
String.prototype.left = left;
String.prototype.right = right;
String.prototype.leftWithToken = leftWithToken;
String.prototype.rightWithToken = rightWithToken;
//# sourceMappingURL=utils.js.map