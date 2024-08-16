export var InsteonBoolean;
(function (InsteonBoolean) {
    InsteonBoolean[InsteonBoolean["False"] = 0] = "False";
    InsteonBoolean[InsteonBoolean["True"] = 255] = "True";
})(InsteonBoolean || (InsteonBoolean = {}));
(function (InsteonBoolean) {
    InsteonBoolean.Converter = {
        to: (value) => {
            return value > 0;
        },
        from: (value) => {
            return value ? 255 : 0;
        },
    };
})(InsteonBoolean || (InsteonBoolean = {}));
//# sourceMappingURL=Boolean.js.map