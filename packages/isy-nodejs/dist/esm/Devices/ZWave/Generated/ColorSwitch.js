/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
export class ColorSwitchNode extends Base {
    // #region Properties (3)
    commands = {
        DON: this.set,
        FDUP: this.fadeUp,
        FDDOWN: this.fadeDown,
        FDSTOP: this.fadeStop,
        QUERY: this.query
    };
    static nodeDefId = "186";
    // #endregion Properties (3)
    // #region Constructors (1)
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.GV0 = Driver.create("GV0", this, nodeInfo.property, { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Warm White", name: "warmWhite" });
        this.drivers.GV2 = Driver.create("GV2", this, nodeInfo.property, { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Red", name: "red" });
        this.drivers.GV3 = Driver.create("GV3", this, nodeInfo.property, { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Green", name: "green" });
        this.drivers.GV4 = Driver.create("GV4", this, nodeInfo.property, { uom: UnitOfMeasure.Raw1ByteUnsignedValue, label: "Blue", name: "blue" });
    }
    // #endregion Constructors (1)
    // #region Public Getters And Setters (4)
    get blue() {
        return this.drivers.GV4?.value;
    }
    get green() {
        return this.drivers.GV3?.value;
    }
    get red() {
        return this.drivers.GV2?.value;
    }
    get warmWhite() {
        return this.drivers.GV0?.value;
    }
    // #endregion Public Getters And Setters (4)
    // #region Public Methods (5)
    async fadeDown(component, startLevel, duration) {
        return this.sendCommand("FDDOWN", { ID: component, STARTLEVEL: startLevel, RR: duration });
    }
    async fadeStop(component) {
        return this.sendCommand("FDSTOP", { ID: component });
    }
    async fadeUp(component, startLevel, duration) {
        return this.sendCommand("FDUP", { ID: component, STARTLEVEL: startLevel, RR: duration });
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async set(warmWhite, red, green, blue, duration) {
        return this.sendCommand("DON", { GV0: warmWhite, GV2: red, GV3: green, GV4: blue, RR: duration });
    }
}
NodeFactory.register(ColorSwitchNode);
export var ColorSwitch;
(function (ColorSwitch) {
    function is(node) {
        return node.nodeDefId === ColorSwitchNode.nodeDefId;
    }
    ColorSwitch.is = is;
    function create(isy, nodeInfo) {
        return new ColorSwitchNode(isy, nodeInfo);
    }
    ColorSwitch.create = create;
    ColorSwitch.Node = ColorSwitchNode;
})(ColorSwitch || (ColorSwitch = {}));
//# sourceMappingURL=ColorSwitch.js.map