/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "EZRAIN_Input";
export class EzrainInputNode extends Base {
    commands = {
        WDU: this.writeChanges
    };
    static nodeDefId = "EZRAIN_Input";
    static implements = ["EZRAIN_Input", "EZIO2x4_Input", "EZIO2x4_Input_ADV", "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
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
        return ["EZRAIN_Input", "EZRAIN_Input_ADV"].includes(node.nodeDefId);
    }
    EzrainInput.is = is;
    function isImplementedBy(node) {
        return ["EZRAIN_Input", "EZRAIN_Input_ADV"].includes(node.nodeDefId);
    }
    EzrainInput.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new EzrainInputNode(isy, nodeInfo);
    }
    EzrainInput.create = create;
    EzrainInput.Node = EzrainInputNode;
})(EzrainInput || (EzrainInput = {}));
//# sourceMappingURL=EzrainInput.js.map