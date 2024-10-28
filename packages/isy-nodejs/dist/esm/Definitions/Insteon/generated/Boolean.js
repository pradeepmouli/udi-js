export var Boolean;
(function (Boolean) {
    Boolean[Boolean["False"] = 0] = "False";
    Boolean[Boolean["True"] = 255] = "True";
})(Boolean || (Boolean = {}));
//# sourceMappingURL=Boolean.js.map