export var Lock;
(function (Lock) {
    Lock[Lock["Unlocked"] = 0] = "Unlocked";
    Lock[Lock["Locked"] = 100] = "Locked";
})(Lock || (Lock = {}));
(function (Lock) {
    function toString(value) {
        switch (value) {
            case Lock.Unlocked: return "Unlocked";
            case Lock.Locked: return "Locked";
            default: return value.toString();
        }
    }
    Lock.toString = toString;
    function toEnum(value) {
        switch (value) {
            case "Unlocked": return Lock.Unlocked;
            case "Locked": return Lock.Locked;
            default: return parseInt(value);
        }
    }
    Lock.toEnum = toEnum;
    function toBoolean(value) {
        return value === Lock.Locked;
    }
    Lock.toBoolean = toBoolean;
    function fromBoolean(value) {
        return value ? Lock.Locked : Lock.Unlocked;
    }
    Lock.fromBoolean = fromBoolean;
})(Lock || (Lock = {}));
//# sourceMappingURL=Lock.js.map