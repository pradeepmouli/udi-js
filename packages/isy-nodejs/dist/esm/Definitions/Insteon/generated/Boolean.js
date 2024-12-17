export var Boolean;
(function (Boolean) {
    Boolean[Boolean["False"] = 0] = "False";
    Boolean[Boolean["True"] = 255] = "True";
})(Boolean || (Boolean = {}));
(function (Boolean) {
    function toBoolean(value) {
        return value === Boolean.True;
    }
    Boolean.toBoolean = toBoolean;
    function fromBoolean(value) {
        return value ? Boolean.True : Boolean.False;
    }
    Boolean.fromBoolean = fromBoolean;
})(Boolean || (Boolean = {}));
//# sourceMappingURL=Boolean.js.map