/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
export const nodeDefId = "BRIDGE";
export class BondBridgeNode extends Base {
    commands = {
        UPDATE: this.forceUpdate
    };
    static nodeDefId = "BRIDGE";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Connected", name: "connected" });
        this.drivers.GPV = Driver.create("GPV", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Plugin Status", name: "pluginStatus" });
    }
    async forceUpdate() {
        return this.sendCommand("UPDATE");
    }
    get connected() {
        return this.drivers.ST?.value;
    }
    get pluginStatus() {
        return this.drivers.GPV?.value;
    }
}
NodeFactory.register(BondBridgeNode);
export var BondBridge;
(function (BondBridge) {
    function is(node) {
        return node.nodeDefId === nodeDefId;
    }
    BondBridge.is = is;
    function create(isy, nodeInfo) {
        return new BondBridgeNode(isy, nodeInfo);
    }
    BondBridge.create = create;
    BondBridge.Node = BondBridgeNode;
})(BondBridge || (BondBridge = {}));
