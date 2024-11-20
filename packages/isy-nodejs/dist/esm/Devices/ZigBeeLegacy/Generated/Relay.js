/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
export const nodeDefId = "RelayLoadControl";
export class RelayNode extends Base {
    commands = {
        DON: this.on,
        DOF: this.off,
        QUERY: this.query,
        ADRPST: this.adr
    };
    static nodeDefId = "RelayLoadControl";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Unknown, label: "Status", name: "status" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Unknown, label: "Responding", name: "responding" });
    }
    async on() {
        return this.sendCommand("DON");
    }
    async off() {
        return this.sendCommand("DOF");
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async adr(value) {
        return this.sendCommand("ADRPST", { value: value });
    }
    get status() { }
}
return this.drivers.ST?.value;
public;
get;
responding();
{
    return this.drivers.ERR?.value;
}
NodeFactory.register(RelayNode);
export var Relay;
(function (Relay) {
    function is(node) {
        return node.nodeDefId in ["RelayLoadControl"];
    }
    Relay.is = is;
    function is(node) {
        return node.nodeDefId in ["RelayLoadControl"];
    }
    Relay.is = is;
    function isImplementedBy(node) {
        return node.nodeDefId in ["RelayLoadControl"];
    }
    Relay.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new RelayNode(isy, nodeInfo);
    }
    Relay.create = create;
    Relay.Node = RelayNode;
})(Relay || (Relay = {}));
