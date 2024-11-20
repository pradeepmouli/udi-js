/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "AlertModuleSiren";
export class AlertModuleSirenNode extends Base {
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
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(onLevel) {
        return this.sendCommand("DON", { OL: onLevel });
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
    async query() {
        return this.sendCommand("QUERY");
    }
    async beep(value) {
        return this.sendCommand("BEEP", { value: value });
    }
    async writeChanges() {
        return this.sendCommand("WDU");
    }
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
        return node.nodeDefId in ["AlertModuleSiren", "AlertModuleSiren_ADV"];
    }
    AlertModuleSiren.is = is;
    function isImplementedBy(node) {
        return node.nodeDefId in ["AlertModuleSiren", "AlertModuleSiren_ADV"];
    }
    AlertModuleSiren.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new AlertModuleSirenNode(isy, nodeInfo);
    }
    AlertModuleSiren.create = create;
    AlertModuleSiren.Node = AlertModuleSirenNode;
})(AlertModuleSiren || (AlertModuleSiren = {}));
//# sourceMappingURL=AlertModuleSiren.js.map