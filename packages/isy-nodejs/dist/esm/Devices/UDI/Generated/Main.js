/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "EM3Main";
export class MainNode extends Base {
    commands = {
        QUERY: this.query
    };
    static nodeDefId = "EM3Main";
    static implements = ["EM3Main"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Watt, label: "Status", name: "status" });
        this.drivers.TPW = Driver.create("TPW", this, nodeInfo.property, { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async query() { return this.sendCommand("QUERY"); }
    get status() {
        return this.drivers.ST?.value;
    }
    get totalEnergy() {
        return this.drivers.TPW?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(MainNode);
export var Main;
(function (Main) {
    function is(node) { return ["EM3Main"].includes(node.nodeDefId); }
    Main.is = is;
    function isImplementedBy(node) {
        return ["EM3Main"].includes(node.nodeDefId);
    }
    Main.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new MainNode(isy, nodeInfo);
    }
    Main.create = create;
    Main.Node = MainNode;
})(Main || (Main = {}));
//# sourceMappingURL=Main.js.map