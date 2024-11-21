/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "DimmerLampSwitchLED";
export class DimmerLampSwitchLedNode extends Base {
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
        LED: this.led,
        BL: this.backlight,
        WDU: this.writeChanges
    };
    static nodeDefId = "DimmerLampSwitchLED";
    static implements = ["DimmerLampSwitchLED", "DimmerSwitchOnly", "DimmerSwitchOnly_ADV", "DimmerLampOnly", "RelaySwitchOnlyPlusQuery", "RelaySwitchOnlyPlusQuery_ADV", "RelaySwitchOnly", "RelaySwitchOnly_ADV", "RemoteLinc2", "RemoteLinc2_ADV", "IRLincTx", "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.OL = Driver.create("OL", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "On Level", name: "onLevel" });
        this.drivers.RR = Driver.create("RR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Ramp Rate", name: "rampRate" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(value) { return this.sendCommand("DON", { value: value }); }
    async off() { return this.sendCommand("DOF"); }
    async fastOff() { return this.sendCommand("DFOF"); }
    async fastOn() { return this.sendCommand("DFON"); }
    async brighten() { return this.sendCommand("BRT"); }
    async dim() { return this.sendCommand("DIM"); }
    async fadeUp() { return this.sendCommand("FDUP"); }
    async fadeDown() { return this.sendCommand("FDDOWN"); }
    async fadeStop() { return this.sendCommand("FDSTOP"); }
    async query() { return this.sendCommand("QUERY"); }
    async beep(value) { return this.sendCommand("BEEP", { value: value }); }
    async updateOnLevel(value) { return this.sendCommand("OL", { value: value }); }
    async updateRampRate(value) { return this.sendCommand("RR", { value: value }); }
    async led(value) { return this.sendCommand("LED", { value: value }); }
    async backlight(value) { return this.sendCommand("BL", { value: value }); }
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
NodeFactory.register(DimmerLampSwitchLedNode);
NodeFactory.register(DimmerLampSwitchLedNode, "DimmerLampSwitchLED_ADV");
export var DimmerLampSwitchLed;
(function (DimmerLampSwitchLed) {
    function is(node) { return ["DimmerLampSwitchLED", "DimmerLampSwitchLED_ADV"].includes(node.nodeDefId); }
    DimmerLampSwitchLed.is = is;
    function isImplementedBy(node) {
        return ["DimmerLampSwitchLED", "DimmerLampSwitchLED_ADV"].includes(node.nodeDefId);
    }
    DimmerLampSwitchLed.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new DimmerLampSwitchLedNode(isy, nodeInfo);
    }
    DimmerLampSwitchLed.create = create;
    DimmerLampSwitchLed.Node = DimmerLampSwitchLedNode;
})(DimmerLampSwitchLed || (DimmerLampSwitchLed = {}));
//# sourceMappingURL=DimmerLampSwitchLed.js.map