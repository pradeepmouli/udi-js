/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "EM3Channel";
export class ChannelNode extends Base {
    commands = {};
    static nodeDefId = "EM3Channel";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Watt, label: "Status", name: "status" });
        this.drivers.TPW = Driver.create("TPW", this, nodeInfo.property, { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
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
NodeFactory.register(ChannelNode);
export var Channel;
(function (Channel) {
    function is(node) {
        return node.nodeDefId in ["EM3Channel"];
    }
    Channel.is = is;
    function isImplementedBy(node) {
        return node.nodeDefId in ["EM3Channel", "EM3Main", "EM3MainChannel"];
    }
    Channel.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new ChannelNode(isy, nodeInfo);
    }
    Channel.create = create;
    Channel.Node = ChannelNode;
})(Channel || (Channel = {}));
//# sourceMappingURL=Channel.js.map