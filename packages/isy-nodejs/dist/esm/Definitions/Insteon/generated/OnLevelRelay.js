export var OnLevelRelay;
(function (OnLevelRelay) {
    OnLevelRelay[OnLevelRelay["Off"] = 0] = "Off";
    OnLevelRelay[OnLevelRelay["On"] = 100] = "On";
})(OnLevelRelay || (OnLevelRelay = {}));
(function (OnLevelRelay) {
    function toBoolean(value) {
        return value === OnLevelRelay.On;
    }
    OnLevelRelay.toBoolean = toBoolean;
    function fromBoolean(value) {
        return value ? OnLevelRelay.On : OnLevelRelay.Off;
    }
    OnLevelRelay.fromBoolean = fromBoolean;
})(OnLevelRelay || (OnLevelRelay = {}));
//# sourceMappingURL=OnLevelRelay.js.map