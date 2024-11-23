/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "Siren";
export class SirenNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        ARM: this.arm,
        DISARM: this.disarm,
        QUERY: this.query,
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    static nodeDefId = "Siren";
    static implements = ["Siren", "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Siren", name: "siren" });
        this.drivers.MODE = Driver.create("MODE", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Mode", name: "mode" });
        this.drivers.DELAY = Driver.create("DELAY", this, nodeInfo.property, { uom: UnitOfMeasure.DurationInSeconds, label: "Arm Countdown", name: "armCountdown" });
        this.drivers.DUR = Driver.create("DUR", this, nodeInfo.property, { uom: UnitOfMeasure.DurationInSeconds, label: "Siren Duration", name: "sirenDuration" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(duration) { return this.sendCommand("DON", { DUR: duration }); }
    async off() { return this.sendCommand("DOF"); }
    async arm(value) { return this.sendCommand("ARM", value); }
    async disarm() { return this.sendCommand("DISARM"); }
    async query() { return this.sendCommand("QUERY"); }
    async beep(value) { return this.sendCommand("BEEP", value); }
    async writeChanges() { return this.sendCommand("WDU"); }
    get siren() {
        return this.drivers.ST?.value;
    }
    get mode() {
        return this.drivers.MODE?.value;
    }
    get armCountdown() {
        return this.drivers.DELAY?.value;
    }
    get sirenDuration() {
        return this.drivers.DUR?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(SirenNode);
NodeFactory.register(SirenNode, "Siren_ADV");
export var Siren;
(function (Siren) {
    function is(node) {
        return ["Siren", "Siren_ADV"].includes(node.nodeDefId);
    }
    Siren.is = is;
    function isImplementedBy(node) {
        return ["Siren", "Siren_ADV"].includes(node.nodeDefId);
    }
    Siren.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new SirenNode(isy, nodeInfo);
    }
    Siren.create = create;
    Siren.Node = SirenNode;
})(Siren || (Siren = {}));
//# sourceMappingURL=Siren.js.map