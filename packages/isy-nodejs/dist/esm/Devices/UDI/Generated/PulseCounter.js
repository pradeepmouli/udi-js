/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class PulseCounterNode extends Base {
    commands = {};
    static nodeDefId = "EM3PulseCounter";
    static implements = ['EM3PulseCounter'];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.PulseCount, label: "Status", name: "status" });
        this.drivers.CPW = Driver.create("CPW", this, nodeInfo.state['CPW'], { uom: UnitOfMeasure.Watt, label: "Current Power", name: "currentPower" });
        this.drivers.TPW = Driver.create("TPW", this, nodeInfo.state['TPW'], { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
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
    function is(node) {
        return ['EM3PulseCounter'].includes(node.nodeDefId);
    }
    PulseCounter.is = is;
    function isImplementedBy(node) {
        return ['EM3PulseCounter'].includes(node.nodeDefId);
    }
    PulseCounter.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new PulseCounterNode(isy, nodeInfo);
    }
    PulseCounter.create = create;
    PulseCounter.Node = PulseCounterNode;
    PulseCounter.Class = PulseCounterNode;
    let Commands;
    (function (Commands) {
    })(Commands = PulseCounter.Commands || (PulseCounter.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["status"] = "ST";
        Drivers["currentPower"] = "CPW";
        Drivers["totalEnergy"] = "TPW";
        Drivers["responding"] = "ERR";
    })(Drivers = PulseCounter.Drivers || (PulseCounter.Drivers = {}));
})(PulseCounter || (PulseCounter = {}));
//# sourceMappingURL=PulseCounter.js.map