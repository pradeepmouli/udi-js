/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "LUTLoadShed";
export class LoadShedNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        QUERY: this.query
    };
    static nodeDefId = "LUTLoadShed";
    static implements = ["LUTLoadShed"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on(value) { return this.sendCommand("DON", { value: value }); }
    async off() { return this.sendCommand("DOF"); }
    async query() { return this.sendCommand("QUERY"); }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(LoadShedNode);
export var LoadShed;
(function (LoadShed) {
    function is(node) { return ["LUTLoadShed"].includes(node.nodeDefId); }
    LoadShed.is = is;
    function isImplementedBy(node) {
        return ["LUTLoadShed"].includes(node.nodeDefId);
    }
    LoadShed.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new LoadShedNode(isy, nodeInfo);
    }
    LoadShed.create = create;
    LoadShed.Node = LoadShedNode;
})(LoadShed || (LoadShed = {}));
//# sourceMappingURL=LoadShed.js.map