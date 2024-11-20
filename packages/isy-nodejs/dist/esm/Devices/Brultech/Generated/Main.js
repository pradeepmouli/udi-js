/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
export const nodeDefId = "BTMain";
export class MainNode extends Base {
    commands = {
        QUERY: this.query
    };
    static nodeDefId = "BTMain";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Watt, label: "Status", name: "status" });
        this.drivers.TPW = Driver.create("TPW", this, nodeInfo.property, { uom: UnitOfMeasure.KilowattsPerHour, label: "Total Energy", name: "totalEnergy" });
        this.drivers.CV = Driver.create("CV", this, nodeInfo.property, { uom: UnitOfMeasure.Volt, label: "Current Voltage", name: "currentVoltage" });
        this.drivers.CC = Driver.create("CC", this, nodeInfo.property, { uom: UnitOfMeasure.Ampere, label: "Current Current", name: "currentCurrent" });
        this.drivers.PPW = Driver.create("PPW", this, nodeInfo.property, { uom: UnitOfMeasure.Watt, label: "Polarized Power", name: "polarizedPower" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    get status() {
        return this.drivers.ST?.value;
    }
    get totalEnergy() {
        return this.drivers.TPW?.value;
    }
    get currentVoltage() {
        return this.drivers.CV?.value;
    }
    get currentCurrent() {
        return this.drivers.CC?.value;
    }
    get polarizedPower() {
        return this.drivers.PPW?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(MainNode);
export var Main;
(function (Main) {
    function is(node) {
        return node.nodeDefId in ["BTMain"];
    }
    Main.is = is;
    function is(node) {
        return node.nodeDefId in ["BTMain"];
    }
    Main.is = is;
    function isImplementedBy(node) {
        return node.nodeDefId in ["BTMain"];
    }
    Main.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new MainNode(isy, nodeInfo);
    }
    Main.create = create;
    Main.Node = MainNode;
})(Main || (Main = {}));
