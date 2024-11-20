/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
export const nodeDefId = "CONTROLLER";
export class MatterBridgeNode extends Base {
    commands = {
        DISCOVER: this.discover,
        QUERY: this.query,
        START_BRIDGE: this.startBridge,
        STOP_BRIDGE: this.stopBridge
    };
    static nodeDefId = "CONTROLLER";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Unknown, label: "Status", name: "status" });
    }
    async discover() {
        return this.sendCommand("DISCOVER");
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async startBridge() {
        return this.sendCommand("START_BRIDGE");
    }
    async stopBridge() {
        return this.sendCommand("STOP_BRIDGE");
    }
    get status() { }
}
return this.drivers.ST?.value;
NodeFactory.register(MatterBridgeNode);
export var MatterBridge;
(function (MatterBridge) {
    function is(node) {
        return node.nodeDefId in ["CONTROLLER"];
    }
    MatterBridge.is = is;
    function is(node) {
        return node.nodeDefId in ["CONTROLLER"];
    }
    MatterBridge.is = is;
    function isImplementedBy(node) {
        return node.nodeDefId in ["CONTROLLER"];
    }
    MatterBridge.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new MatterBridgeNode(isy, nodeInfo);
    }
    MatterBridge.create = create;
    MatterBridge.Node = MatterBridgeNode;
})(MatterBridge || (MatterBridge = {}));
