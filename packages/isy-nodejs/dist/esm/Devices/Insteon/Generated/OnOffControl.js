/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "OnOffControl";
export class OnOffControlNode extends Base {
    commands = {};
    static nodeDefId = "OnOffControl";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Boolean, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
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
        return node.nodeDefId in ["OnOffControl", "OnOffControl_ADV"];
    }
    OnOffControl.is = is;
    function isImplementedBy(node) {
        return node.nodeDefId in ["OnOffControl", "X10", "OnOffControl_ADV"];
    }
    OnOffControl.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new OnOffControlNode(isy, nodeInfo);
    }
    OnOffControl.create = create;
    OnOffControl.Node = OnOffControlNode;
})(OnOffControl || (OnOffControl = {}));
//# sourceMappingURL=OnOffControl.js.map