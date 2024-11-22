/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "DimmerLampOnly";
export class DimmerLampNode extends Base {
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
        WDU: this.writeChanges
    };
    static nodeDefId = "DimmerLampOnly";
    static implements = ["DimmerLampOnly", "IRLincTx", "SirenAlert", "SirenArm"];
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
NodeFactory.register(DimmerLampNode);
export var DimmerLamp;
(function (DimmerLamp) {
    function is(node) { return ["DimmerLampOnly"].includes(node.nodeDefId); }
    DimmerLamp.is = is;
    function isImplementedBy(node) {
        return ["DimmerLampOnly", "DimmerLampSwitch", "DimmerLampSwitch_ADV", "DimmerLampSwitchLED", "DimmerLampSwitchLED_ADV"].includes(node.nodeDefId);
    }
    DimmerLamp.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new DimmerLampNode(isy, nodeInfo);
    }
    DimmerLamp.create = create;
    DimmerLamp.Node = DimmerLampNode;
})(DimmerLamp || (DimmerLamp = {}));
//# sourceMappingURL=DimmerLamp.js.map