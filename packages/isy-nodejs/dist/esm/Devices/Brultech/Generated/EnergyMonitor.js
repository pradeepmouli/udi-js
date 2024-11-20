/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
export const nodeDefId = "BTChannel";
export class EnergyMonitorNode extends Base {
    commands = {};
    static nodeDefId = "BTChannel";
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
NodeFactory.register(EnergyMonitorNode);
export var EnergyMonitor;
(function (EnergyMonitor) {
    function is(node) {
        return node.nodeDefId === nodeDefId;
    }
    EnergyMonitor.is = is;
    function create(isy, nodeInfo) {
        return new EnergyMonitorNode(isy, nodeInfo);
    }
    EnergyMonitor.create = create;
    EnergyMonitor.Node = EnergyMonitorNode;
})(EnergyMonitor || (EnergyMonitor = {}));
