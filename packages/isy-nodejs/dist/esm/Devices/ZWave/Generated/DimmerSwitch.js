/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "119";
export class DimmerSwitchNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFON: this.fastOn,
        DFOF: this.fastOff,
        BRT: this.brighten,
        DIM: this.dim,
        FDUP: this.fadeUp,
        FDDOWN: this.fadeDown,
        FADE: this.fade,
        FDSTOP: this.fadeStop,
        QUERY: this.query,
        CONFIG: this.setConfiguration,
        WDU: this.writeChanges
    };
    static nodeDefId = "119";
    static implements = ["119"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(value, rampRate) { return this.sendCommand("DON", value, { RR: rampRate }); }
    async off() { return this.sendCommand("DOF"); }
    async fastOn() { return this.sendCommand("DFON"); }
    async fastOff() { return this.sendCommand("DFOF"); }
    async brighten() { return this.sendCommand("BRT"); }
    async dim() { return this.sendCommand("DIM"); }
    async fadeUp(startLevel, rampRate) { return this.sendCommand("FDUP", { STARTLEVEL: startLevel, RR: rampRate }); }
    async fadeDown(startLevel, rampRate) { return this.sendCommand("FDDOWN", { STARTLEVEL: startLevel, RR: rampRate }); }
    async fade(direction, startLevel, rampRate, direction2, fadeRate2) { return this.sendCommand("FADE", { DIR: direction, STARTLEVEL: startLevel, RR: rampRate, DIR2: direction2, STEP2: fadeRate2 }); }
    async fadeStop() { return this.sendCommand("FDSTOP"); }
    async query() { return this.sendCommand("QUERY"); }
    async setConfiguration(parameterNumber, parameterValue) { return this.sendCommand("CONFIG", { NUM: parameterNumber, VAL: parameterValue }); }
    async writeChanges() { return this.sendCommand("WDU"); }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(DimmerSwitchNode);
export var DimmerSwitch;
(function (DimmerSwitch) {
    function is(node) { return ["119"].includes(node.nodeDefId); }
    DimmerSwitch.is = is;
    function isImplementedBy(node) {
        return ["119"].includes(node.nodeDefId);
    }
    DimmerSwitch.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new DimmerSwitchNode(isy, nodeInfo);
    }
    DimmerSwitch.create = create;
    DimmerSwitch.Node = DimmerSwitchNode;
})(DimmerSwitch || (DimmerSwitch = {}));
//# sourceMappingURL=DimmerSwitch.js.map