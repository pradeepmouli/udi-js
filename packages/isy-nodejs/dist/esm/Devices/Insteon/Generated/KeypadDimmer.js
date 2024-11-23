/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "KeypadDimmer";
export class KeypadDimmerNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFOF: this.fastOff,
        DFON: this.fastOn,
        BRT: this.brighten,
        DIM: this.dim,
        FDUP: this.fadeUp,
        FDDOWN: this.fadeDown,
        FDSTOP: this.fadeStop,
        QUERY: this.query,
        BEEP: this.beep,
        OL: this.updateOnLevel,
        RR: this.updateRampRate,
        BL: this.backlight,
        WDU: this.writeChanges
    };
    static nodeDefId = "KeypadDimmer";
    static implements = ["KeypadDimmer", "RelaySwitchOnlyPlusQuery", "RelaySwitchOnlyPlusQuery_ADV", "RelaySwitchOnly", "RelaySwitchOnly_ADV", "RemoteLinc2", "RemoteLinc2_ADV", "IRLincTx", "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.OL = Driver.create("OL", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "On Level", name: "onLevel" });
        this.drivers.RR = Driver.create("RR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Ramp Rate", name: "rampRate" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(value) { return this.sendCommand("DON", value); }
    async off() { return this.sendCommand("DOF"); }
    async fastOff() { return this.sendCommand("DFOF"); }
    async fastOn() { return this.sendCommand("DFON"); }
    async brighten() { return this.sendCommand("BRT"); }
    async dim() { return this.sendCommand("DIM"); }
    async fadeUp() { return this.sendCommand("FDUP"); }
    async fadeDown() { return this.sendCommand("FDDOWN"); }
    async fadeStop() { return this.sendCommand("FDSTOP"); }
    async query() { return this.sendCommand("QUERY"); }
    async beep(value) { return this.sendCommand("BEEP", value); }
    async updateOnLevel(value) { return this.sendCommand("OL", value); }
    async updateRampRate(value) { return this.sendCommand("RR", value); }
    async backlight(value) { return this.sendCommand("BL", value); }
    async writeChanges() { return this.sendCommand("WDU"); }
    get status() {
        return this.drivers.ST?.value;
    }
    get onLevel() {
        return this.drivers.OL?.value;
    }
    get rampRate() {
        return this.drivers.RR?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(KeypadDimmerNode);
NodeFactory.register(KeypadDimmerNode, "KeypadDimmer_ADV");
export var KeypadDimmer;
(function (KeypadDimmer) {
    function is(node) {
        return ["KeypadDimmer", "KeypadDimmer_ADV"].includes(node.nodeDefId);
    }
    KeypadDimmer.is = is;
    function isImplementedBy(node) {
        return ["KeypadDimmer", "KeypadDimmer_ADV"].includes(node.nodeDefId);
    }
    KeypadDimmer.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new KeypadDimmerNode(isy, nodeInfo);
    }
    KeypadDimmer.create = create;
    KeypadDimmer.Node = KeypadDimmerNode;
})(KeypadDimmer || (KeypadDimmer = {}));
//# sourceMappingURL=KeypadDimmer.js.map