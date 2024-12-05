export var Error;
(function (Error) {
    Error[Error["True"] = 0] = "True";
    Error[Error["False"] = 1] = "False";
})(Error || (Error = {}));
(function (Error) {
    function toBoolean(value) {
        return value === Error.True;
    }
    Error.toBoolean = toBoolean;
    function fromBoolean(value) {
        return value ? Error.True : Error.False;
    }
    Error.fromBoolean = fromBoolean;
})(Error || (Error = {}));
//# sourceMappingURL=Error.js.map