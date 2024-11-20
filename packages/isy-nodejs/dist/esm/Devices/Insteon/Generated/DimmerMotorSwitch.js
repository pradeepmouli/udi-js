/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "DimmerMotorSwitch";
export class DimmerMotorSwitchNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFOF: this.fastOff,
        DFON: this.fastOn,
        FDUP: this.fadeUp,
        FDDOWN: this.fadeDown,
        FDSTOP: this.fadeStop,
        QUERY: this.query,
        BEEP: this.beep,
        OL: this.updateOnLevel,
        DUR: this.updateMaxDuration,
        BL: this.backlight,
        WDU: this.writeChanges
    };
    static nodeDefId = "DimmerMotorSwitch";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.OL = Driver.create("OL", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "On Level", name: "onLevel" });
        this.drivers.DUR = Driver.create("DUR", this, nodeInfo.property, { uom: UnitOfMeasure.DurationInSeconds, label: "Max Duration", name: "maxDuration" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(value) {
        return this.sendCommand("DON", { value: value });
    }
    async off() {
        return this.sendCommand("DOF");
    }
    async fastOff() {
        return this.sendCommand("DFOF");
    }
    async fastOn() {
        return this.sendCommand("DFON");
    }
    async fadeUp() {
        return this.sendCommand("FDUP");
    }
    async fadeDown() {
        return this.sendCommand("FDDOWN");
    }
    async fadeStop() {
        return this.sendCommand("FDSTOP");
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async beep(value) {
        return this.sendCommand("BEEP", { value: value });
    }
    async updateOnLevel(value) {
        return this.sendCommand("OL", { value: value });
    }
    async updateMaxDuration(value) {
        return this.sendCommand("DUR", { value: value });
    }
    async backlight(value) {
        return this.sendCommand("BL", { value: value });
    }
    async writeChanges() {
        return this.sendCommand("WDU");
    }
    get status() {
        return this.drivers.ST?.value;
    }
    get onLevel() {
        return this.drivers.OL?.value;
    }
    get maxDuration() {
        return this.drivers.DUR?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(DimmerMotorSwitchNode);
NodeFactory.register(DimmerMotorSwitchNode, "DimmerMotorSwitch_ADV");
export var DimmerMotorSwitch;
(function (DimmerMotorSwitch) {
    function is(node) {
        return node.nodeDefId in ["DimmerMotorSwitch", "DimmerMotorSwitch_ADV"];
    }
    DimmerMotorSwitch.is = is;
    function isImplementedBy(node) {
        return node.nodeDefId in ["DimmerMotorSwitch", "DimmerMotorSwitch_ADV"];
    }
    DimmerMotorSwitch.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new DimmerMotorSwitchNode(isy, nodeInfo);
    }
    DimmerMotorSwitch.create = create;
    DimmerMotorSwitch.Node = DimmerMotorSwitchNode;
})(DimmerMotorSwitch || (DimmerMotorSwitch = {}));
//# sourceMappingURL=DimmerMotorSwitch.js.map