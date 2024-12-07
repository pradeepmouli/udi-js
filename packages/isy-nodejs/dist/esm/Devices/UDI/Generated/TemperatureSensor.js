/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class TemperatureSensorNode extends Base {
    commands = {};
    static nodeDefId = "EM3TempSensor";
    static implements = ['EM3TempSensor'];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Degree, label: "Temperature", name: "temperature" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    get temperature() {
        return this.drivers.ST?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(TemperatureSensorNode);
export var TemperatureSensor;
(function (TemperatureSensor) {
    function is(node) {
        return ['EM3TempSensor'].includes(node.nodeDefId);
    }
    TemperatureSensor.is = is;
    function isImplementedBy(node) {
        return ['EM3TempSensor'].includes(node.nodeDefId);
    }
    TemperatureSensor.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new TemperatureSensorNode(isy, nodeInfo);
    }
    TemperatureSensor.create = create;
    TemperatureSensor.Node = TemperatureSensorNode;
    TemperatureSensor.Class = TemperatureSensorNode;
    let Commands;
    (function (Commands) {
    })(Commands = TemperatureSensor.Commands || (TemperatureSensor.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["temperature"] = "ST";
        Drivers["responding"] = "ERR";
    })(Drivers = TemperatureSensor.Drivers || (TemperatureSensor.Drivers = {}));
})(TemperatureSensor || (TemperatureSensor = {}));
//# sourceMappingURL=TemperatureSensor.js.map