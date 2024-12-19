export var Error;
(function (Error) {
    Error[Error["True"] = 0] = "True";
    Error[Error["False"] = 1] = "False";
})(Error || (Error = {}));
(function (Error) {
    Error.Boolean = {
        from: (value) => value ? Error.True : Error.False,
        to: (value) => value === Error.True
    };
    Error.Index = {
        from: (value) => value,
        to: (value) => value
    };
})(Error || (Error = {}));
//# sourceMappingURL=Error.js.map