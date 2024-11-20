/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "IMETER_SOLO";
export class ImeterSoloNode extends Base {
    commands = {
        RESET: this.resetTotalEnergy,
        QUERY: this.query,
        WDU: this.writeChanges
    };
    static nodeDefId = "IMETER_SOLO";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Watt, label: "Current Power", name: "currentPower" });
        this.drivers.TPW = Driver.create("TPW", this, nodeInfo.property, { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async resetTotalEnergy() {
        return this.sendCommand("RESET");
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async writeChanges() {
        return this.sendCommand("WDU");
    }
    get currentPower() {
        return this.drivers.ST?.value;
    }
    get totalEnergy() {
        return this.drivers.TPW?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(ImeterSoloNode);
export var ImeterSolo;
(function (ImeterSolo) {
    function is(node) {
        return node.nodeDefId in ["IMETER_SOLO"];
    }
    ImeterSolo.is = is;
    function isImplementedBy(node) {
        return node.nodeDefId in ["IMETER_SOLO"];
    }
    ImeterSolo.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new ImeterSoloNode(isy, nodeInfo);
    }
    ImeterSolo.create = create;
    ImeterSolo.Node = ImeterSoloNode;
})(ImeterSolo || (ImeterSolo = {}));
//# sourceMappingURL=ImeterSolo.js.map