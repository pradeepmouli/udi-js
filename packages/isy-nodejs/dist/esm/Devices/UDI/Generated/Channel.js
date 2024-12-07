/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class ChannelNode extends Base {
    commands = {};
    static nodeDefId = "EM3Channel";
    static implements = ['EM3Channel'];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Watt, label: "Status", name: "status" });
        this.drivers.TPW = Driver.create("TPW", this, nodeInfo.state['TPW'], { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
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
        return ['EM3Channel'].includes(node.nodeDefId);
    }
    Channel.is = is;
    function isImplementedBy(node) {
        return ['EM3Channel', "EM3Main", "EM3MainChannel"].includes(node.nodeDefId);
    }
    Channel.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new ChannelNode(isy, nodeInfo);
    }
    Channel.create = create;
    Channel.Node = ChannelNode;
    Channel.Class = ChannelNode;
    let Commands;
    (function (Commands) {
    })(Commands = Channel.Commands || (Channel.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["status"] = "ST";
        Drivers["totalEnergy"] = "TPW";
        Drivers["responding"] = "ERR";
    })(Drivers = Channel.Drivers || (Channel.Drivers = {}));
})(Channel || (Channel = {}));
//# sourceMappingURL=Channel.js.map