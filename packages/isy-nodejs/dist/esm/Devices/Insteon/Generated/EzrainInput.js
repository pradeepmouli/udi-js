/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class EzrainInputNode extends Base {
    commands = {
        WDU: this.writeChanges
    };
    static nodeDefId = "EZRAIN_Input";
    static implements = ['EZRAIN_Input', "EZIO2x4_Input", "EZIO2x4_Input_ADV", "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async writeChanges() { return this.sendCommand("WDU"); }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(EzrainInputNode);
NodeFactory.register(EzrainInputNode, "EZRAIN_Input_ADV");
export var EzrainInput;
(function (EzrainInput) {
    function is(node) {
        return ['EZRAIN_Input', "EZRAIN_Input_ADV"].includes(node.nodeDefId);
    }
    EzrainInput.is = is;
    function isImplementedBy(node) {
        return ['EZRAIN_Input', "EZRAIN_Input_ADV"].includes(node.nodeDefId);
    }
    EzrainInput.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new EzrainInputNode(isy, nodeInfo);
    }
    EzrainInput.create = create;
    EzrainInput.Node = EzrainInputNode;
    EzrainInput.Class = EzrainInputNode;
    let Commands;
    (function (Commands) {
        Commands["writeChanges"] = "WDU";
    })(Commands = EzrainInput.Commands || (EzrainInput.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["status"] = "ST";
        Drivers["responding"] = "ERR";
    })(Drivers = EzrainInput.Drivers || (EzrainInput.Drivers = {}));
})(EzrainInput || (EzrainInput = {}));
//# sourceMappingURL=EzrainInput.js.map