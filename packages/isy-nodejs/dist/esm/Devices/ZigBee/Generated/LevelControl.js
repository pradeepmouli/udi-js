/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class LevelControlNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFON: this.fastOn,
        DFOF: this.fastOff,
        TOGGLE: this.toggle,
        BRT: this.brighten,
        DIM: this.dim,
        OL: this.updateOnLevel,
        RR: this.updateRampRate,
        IDENTIFY: this.identify,
        QUERY: this.query
    };
    static nodeDefId = "LEVEL_CONTROL";
    static implements = ['LEVEL_CONTROL'];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.OffOn, label: "Status", name: "status" });
        this.drivers.OL = Driver.create("OL", this, nodeInfo.state['OL'], { uom: UnitOfMeasure.Percent, label: "On Level", name: "onLevel" });
        this.drivers.RR = Driver.create("RR", this, nodeInfo.state['RR'], { uom: UnitOfMeasure.DurationInSeconds, label: "Ramp Rate", name: "rampRate" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(value, rampRate) { return this.sendCommand("DON", value, { RR: rampRate }); }
    async off() { return this.sendCommand("DOF"); }
    async fastOn() { return this.sendCommand("DFON"); }
    async fastOff() { return this.sendCommand("DFOF"); }
    async toggle() { return this.sendCommand("TOGGLE"); }
    async brighten() { return this.sendCommand("BRT"); }
    async dim() { return this.sendCommand("DIM"); }
    async updateOnLevel(value) { return this.sendCommand("OL", value); }
    async updateRampRate(value) { return this.sendCommand("RR", value); }
    async identify(value) { return this.sendCommand("IDENTIFY", value); }
    async query() { return this.sendCommand("QUERY"); }
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
NodeFactory.register(LevelControlNode);
export var LevelControl;
(function (LevelControl) {
    function is(node) {
        return ['LEVEL_CONTROL'].includes(node.nodeDefId);
    }
    LevelControl.is = is;
    function isImplementedBy(node) {
        return ['LEVEL_CONTROL'].includes(node.nodeDefId);
    }
    LevelControl.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new LevelControlNode(isy, nodeInfo);
    }
    LevelControl.create = create;
    LevelControl.Node = LevelControlNode;
    LevelControl.Class = LevelControlNode;
    let Commands;
    (function (Commands) {
        Commands["on"] = "DON";
        Commands["off"] = "DOF";
        Commands["fastOn"] = "DFON";
        Commands["fastOff"] = "DFOF";
        Commands["toggle"] = "TOGGLE";
        Commands["brighten"] = "BRT";
        Commands["dim"] = "DIM";
        Commands["updateOnLevel"] = "OL";
        Commands["updateRampRate"] = "RR";
        Commands["identify"] = "IDENTIFY";
        Commands["query"] = "QUERY";
    })(Commands = LevelControl.Commands || (LevelControl.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["status"] = "ST";
        Drivers["onLevel"] = "OL";
        Drivers["rampRate"] = "RR";
        Drivers["responding"] = "ERR";
    })(Drivers = LevelControl.Drivers || (LevelControl.Drivers = {}));
})(LevelControl || (LevelControl = {}));
//# sourceMappingURL=LevelControl.js.map