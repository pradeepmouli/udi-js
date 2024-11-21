/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "EM3PulseCounter";
export class PulseCounterNode extends Base {
    commands = {};
    static nodeDefId = "EM3PulseCounter";
    static implements = ["EM3PulseCounter"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.PulseCount, label: "Status", name: "status" });
        this.drivers.CPW = Driver.create("CPW", this, nodeInfo.property, { uom: UnitOfMeasure.Watt, label: "Current Power", name: "currentPower" });
        this.drivers.TPW = Driver.create("TPW", this, nodeInfo.property, { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    get status() {
        return this.drivers.ST?.value;
    }
    get currentPower() {
        return this.drivers.CPW?.value;
    }
    get totalEnergy() {
        return this.drivers.TPW?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(PulseCounterNode);
export var PulseCounter;
(function (PulseCounter) {
    function is(node) { return ["EM3PulseCounter"].includes(node.nodeDefId); }
    PulseCounter.is = is;
    function isImplementedBy(node) {
        return ["EM3PulseCounter"].includes(node.nodeDefId);
    }
    PulseCounter.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new PulseCounterNode(isy, nodeInfo);
    }
    PulseCounter.create = create;
    PulseCounter.Node = PulseCounterNode;
})(PulseCounter || (PulseCounter = {}));
//# sourceMappingURL=PulseCounter.js.map