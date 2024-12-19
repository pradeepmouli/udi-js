/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class ColorControlNode extends Base {
    commands = {
        MOVETOCT: this.moveToTemperature,
        MOVECT: this.moveTemperature,
        STEPCT: this.stepTemperature,
        UNITS: this.updatePreferredUnits,
        STOP: this.stop,
        QUERY: this.query
    };
    static nodeDefId = "COLOR_CONTROL";
    static implements = ['COLOR_CONTROL'];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.GV2 = Driver.create("GV2", this, nodeInfo.state['GV2'], { uom: UnitOfMeasure.Kelvin, label: "Color Temperature K", name: "colorTemperatureK" });
        this.drivers.GV3 = Driver.create("GV3", this, nodeInfo.state['GV3'], { uom: UnitOfMeasure.Unknown, label: "Color Temperature Mired", name: "colorTemperatureMired" });
        this.drivers.GV4 = Driver.create("GV4", this, nodeInfo.state['GV4'], { uom: UnitOfMeasure.Index, label: "Preferred Units", name: "preferredUnits" });
    }
    async moveToTemperature(color, dur) { return this.sendCommand("MOVETOCT", { COLOR: color, DUR: dur }); }
    async moveTemperature(mode, min, max, rate) { return this.sendCommand("MOVECT", { MIN: min, MAX: max, MODE: mode, RATE: rate }); }
    async stepTemperature(min, max, size, mode, dur) { return this.sendCommand("STEPCT", { MIN: min, MAX: max, SIZE: size, MODE: mode, DUR: dur }); }
    async updatePreferredUnits(value) { return this.sendCommand("UNITS", value); }
    async stop() { return this.sendCommand("STOP"); }
    async query() { return this.sendCommand("QUERY"); }
    get colorTemperatureK() {
        return this.drivers.GV2?.value;
    }
    get colorTemperatureMired() {
        return this.drivers.GV3?.value;
    }
    get preferredUnits() {
        return this.drivers.GV4?.value;
    }
}
NodeFactory.register(ColorControlNode);
export var ColorControl;
(function (ColorControl) {
    function is(node) {
        return ['COLOR_CONTROL'].includes(node.nodeDefId);
    }
    ColorControl.is = is;
    function isImplementedBy(node) {
        return ['COLOR_CONTROL'].includes(node.nodeDefId);
    }
    ColorControl.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new ColorControlNode(isy, nodeInfo);
    }
    ColorControl.create = create;
    ColorControl.Node = ColorControlNode;
    ColorControl.Class = ColorControlNode;
    let Commands;
    (function (Commands) {
        Commands["moveToTemperature"] = "MOVETOCT";
        Commands["moveTemperature"] = "MOVECT";
        Commands["stepTemperature"] = "STEPCT";
        Commands["updatePreferredUnits"] = "UNITS";
        Commands["stop"] = "STOP";
        Commands["query"] = "QUERY";
    })(Commands = ColorControl.Commands || (ColorControl.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["colorTemperatureK"] = "GV2";
        Drivers["colorTemperatureMired"] = "GV3";
        Drivers["preferredUnits"] = "GV4";
    })(Drivers = ColorControl.Drivers || (ColorControl.Drivers = {}));
})(ColorControl || (ColorControl = {}));
//# sourceMappingURL=ColorControl.js.map