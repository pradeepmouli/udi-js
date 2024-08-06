export var Error;
(function (Error) {
    Error[Error["True"] = 0] = "True";
    Error[Error["False"] = 1] = "False";
})(Error || (Error = {}));
