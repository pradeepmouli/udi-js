/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class AlertModuleSirenNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        DFOF: this.fastOff,
        DFON: this.fastOn,
        QUERY: this.query,
        BEEP: this.beep,
        WDU: this.writeChanges
    };
    static nodeDefId = "AlertModuleSiren";
    static implements = ['AlertModuleSiren', "AlertModuleArmed", "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(onLevel) { return this.sendCommand("DON", { OL: onLevel }); }
    async off() { return this.sendCommand("DOF"); }
    async fastOff() { return this.sendCommand("DFOF"); }
    async fastOn() { return this.sendCommand("DFON"); }
    async query() { return this.sendCommand("QUERY"); }
    async beep(value) { return this.sendCommand("BEEP", value); }
    async writeChanges() { return this.sendCommand("WDU"); }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(AlertModuleSirenNode);
NodeFactory.register(AlertModuleSirenNode, "AlertModuleSiren_ADV");
export var AlertModuleSiren;
(function (AlertModuleSiren) {
    function is(node) {
        return ['AlertModuleSiren', "AlertModuleSiren_ADV"].includes(node.nodeDefId);
    }
    AlertModuleSiren.is = is;
    function isImplementedBy(node) {
        return ['AlertModuleSiren', "AlertModuleSiren_ADV"].includes(node.nodeDefId);
    }
    AlertModuleSiren.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new AlertModuleSirenNode(isy, nodeInfo);
    }
    AlertModuleSiren.create = create;
    AlertModuleSiren.Node = AlertModuleSirenNode;
    AlertModuleSiren.Class = AlertModuleSirenNode;
    let Commands;
    (function (Commands) {
        Commands["on"] = "DON";
        Commands["off"] = "DOF";
        Commands["fastOff"] = "DFOF";
        Commands["fastOn"] = "DFON";
        Commands["query"] = "QUERY";
        Commands["beep"] = "BEEP";
        Commands["writeChanges"] = "WDU";
    })(Commands = AlertModuleSiren.Commands || (AlertModuleSiren.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["status"] = "ST";
        Drivers["responding"] = "ERR";
    })(Drivers = AlertModuleSiren.Drivers || (AlertModuleSiren.Drivers = {}));
})(AlertModuleSiren || (AlertModuleSiren = {}));
//# sourceMappingURL=AlertModuleSiren.js.map