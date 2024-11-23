/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "X10";
export class X10Node extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        BRT: this.brighten,
        DIM: this.dim,
        QUERY: this.query
    };
    static nodeDefId = "X10";
    static implements = ["X10"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on() { return this.sendCommand("DON"); }
    async off() { return this.sendCommand("DOF"); }
    async brighten() { return this.sendCommand("BRT"); }
    async dim() { return this.sendCommand("DIM"); }
    async query() { return this.sendCommand("QUERY"); }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(X10Node);
export var X10;
(function (X10) {
    function is(node) {
        return ["X10"].includes(node.nodeDefId);
    }
    X10.is = is;
    function isImplementedBy(node) {
        return ["X10"].includes(node.nodeDefId);
    }
    X10.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new X10Node(isy, nodeInfo);
    }
    X10.create = create;
    X10.Node = X10Node;
})(X10 || (X10 = {}));
//# sourceMappingURL=X10.js.map