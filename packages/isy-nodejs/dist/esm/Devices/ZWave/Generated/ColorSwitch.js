/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class ColorSwitchNode extends Base {
    commands = {
        DON: this.set,
        FDUP: this.fadeUp,
        FDDOWN: this.fadeDown,
        FDSTOP: this.fadeStop,
        QUERY: this.query
    };
    static nodeDefId = "186";
    static implements = ['186'];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.GV0 = Driver.create("GV0", this, nodeInfo.state['GV0'], { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Warm White", name: "warmWhite" });
        this.drivers.GV2 = Driver.create("GV2", this, nodeInfo.state['GV2'], { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Red", name: "red" });
        this.drivers.GV3 = Driver.create("GV3", this, nodeInfo.state['GV3'], { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Green", name: "green" });
        this.drivers.GV4 = Driver.create("GV4", this, nodeInfo.state['GV4'], { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Blue", name: "blue" });
        this.drivers.GV1 = Driver.create("GV1", this, nodeInfo.state['GV1'], { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Cold White", name: "coldWhite" });
    }
    async set(warmWhite, coldWhite, red, green, blue, duration) { return this.sendCommand("DON", { GV0: warmWhite, GV1: coldWhite, GV2: red, GV3: green, GV4: blue, RR: duration }); }
    async fadeUp(component, startLevel, duration) { return this.sendCommand("FDUP", { ID: component, STARTLEVEL: startLevel, RR: duration }); }
    async fadeDown(component, startLevel, duration) { return this.sendCommand("FDDOWN", { ID: component, STARTLEVEL: startLevel, RR: duration }); }
    async fadeStop(component) { return this.sendCommand("FDSTOP", { ID: component }); }
    async query() { return this.sendCommand("QUERY"); }
    get warmWhite() {
        return this.drivers.GV0?.value;
    }
    get red() {
        return this.drivers.GV2?.value;
    }
    get green() {
        return this.drivers.GV3?.value;
    }
    get blue() {
        return this.drivers.GV4?.value;
    }
    get coldWhite() {
        return this.drivers.GV1?.value;
    }
}
NodeFactory.register(ColorSwitchNode);
export var ColorSwitch;
(function (ColorSwitch) {
    function is(node) {
        return ['186'].includes(node.nodeDefId);
    }
    ColorSwitch.is = is;
    function isImplementedBy(node) {
        return ['186'].includes(node.nodeDefId);
    }
    ColorSwitch.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new ColorSwitchNode(isy, nodeInfo);
    }
    ColorSwitch.create = create;
    ColorSwitch.Node = ColorSwitchNode;
    ColorSwitch.Class = ColorSwitchNode;
    let Commands;
    (function (Commands) {
        Commands["set"] = "DON";
        Commands["fadeUp"] = "FDUP";
        Commands["fadeDown"] = "FDDOWN";
        Commands["fadeStop"] = "FDSTOP";
        Commands["query"] = "QUERY";
    })(Commands = ColorSwitch.Commands || (ColorSwitch.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["warmWhite"] = "GV0";
        Drivers["red"] = "GV2";
        Drivers["green"] = "GV3";
        Drivers["blue"] = "GV4";
        Drivers["coldWhite"] = "GV1";
    })(Drivers = ColorSwitch.Drivers || (ColorSwitch.Drivers = {}));
})(ColorSwitch || (ColorSwitch = {}));
//# sourceMappingURL=ColorSwitch.js.map