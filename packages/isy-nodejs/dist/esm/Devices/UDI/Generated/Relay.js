/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class RelayNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        QUERY: this.query
    };
    static nodeDefId = "EM3Relay";
    static implements = ['EM3Relay'];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Percent, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async on() { return this.sendCommand("DON"); }
    async off() { return this.sendCommand("DOF"); }
    async query() { return this.sendCommand("QUERY"); }
    get status() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(RelayNode);
export var Relay;
(function (Relay) {
    function is(node) {
        return ['EM3Relay'].includes(node.nodeDefId);
    }
    Relay.is = is;
    function isImplementedBy(node) {
        return ['EM3Relay'].includes(node.nodeDefId);
    }
    Relay.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new RelayNode(isy, nodeInfo);
    }
    Relay.create = create;
    Relay.Node = RelayNode;
    Relay.Class = RelayNode;
    let Commands;
    (function (Commands) {
        Commands["on"] = "DON";
        Commands["off"] = "DOF";
        Commands["query"] = "QUERY";
    })(Commands = Relay.Commands || (Relay.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["status"] = "ST";
        Drivers["responding"] = "ERR";
    })(Drivers = Relay.Drivers || (Relay.Drivers = {}));
})(Relay || (Relay = {}));
//# sourceMappingURL=Relay.js.map