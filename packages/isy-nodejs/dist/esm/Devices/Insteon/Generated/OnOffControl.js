/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class OnOffControlNode extends Base {
    commands = {};
    static nodeDefId = "OnOffControl";
    static implements = ['OnOffControl', "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(OnOffControlNode);
NodeFactory.register(OnOffControlNode, "OnOffControl_ADV");
export var OnOffControl;
(function (OnOffControl) {
    function is(node) {
        return ['OnOffControl', "OnOffControl_ADV"].includes(node.nodeDefId);
    }
    OnOffControl.is = is;
    function isImplementedBy(node) {
        return ['OnOffControl', "X10", "OnOffControl_ADV"].includes(node.nodeDefId);
    }
    OnOffControl.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new OnOffControlNode(isy, nodeInfo);
    }
    OnOffControl.create = create;
    OnOffControl.Node = OnOffControlNode;
    OnOffControl.Class = OnOffControlNode;
    let Commands;
    (function (Commands) {
    })(Commands = OnOffControl.Commands || (OnOffControl.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["status"] = "ST";
        Drivers["responding"] = "ERR";
    })(Drivers = OnOffControl.Drivers || (OnOffControl.Drivers = {}));
})(OnOffControl || (OnOffControl = {}));
//# sourceMappingURL=OnOffControl.js.map