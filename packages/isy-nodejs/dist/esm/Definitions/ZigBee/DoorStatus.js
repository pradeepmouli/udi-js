export var DoorStatus;
(function (DoorStatus) {
    DoorStatus[DoorStatus["Open"] = 0] = "Open";
    DoorStatus[DoorStatus["Closed"] = 1] = "Closed";
    DoorStatus[DoorStatus["Jammed"] = 2] = "Jammed";
    DoorStatus[DoorStatus["ForcedOpen"] = 3] = "ForcedOpen";
    DoorStatus[DoorStatus["Unspecified"] = 4] = "Unspecified";
    DoorStatus[DoorStatus["Undefined"] = 255] = "Undefined";
})(DoorStatus || (DoorStatus = {}));
