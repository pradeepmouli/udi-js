/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
const nodeDefId = "TempLinc";
export class TempLincNode extends Base {
    commands = {
        CLISPH: this.updateHeatSetpoint,
        CLISPC: this.updateCoolSetpoint,
        CLIMD: this.updateMode,
        CLIFS: this.updateFanMode,
        BRT: this.setpointUp,
        DIM: this.setpointDown,
        BEEP: this.beep,
        QUERY: this.query,
        SETTIME: this.setTime,
        WDU: this.writeChanges
    };
    static nodeDefId = "TempLinc";
    static implements = ["TempLinc", "IRLincTx", "SirenAlert", "SirenArm"];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Degree, label: "Temperature", name: "temperature" });
        this.drivers.CLISPH = Driver.create("CLISPH", this, nodeInfo.property, { uom: UnitOfMeasure.Degree, label: "Heat Setpoint", name: "heatSetpoint" });
        this.drivers.CLISPC = Driver.create("CLISPC", this, nodeInfo.property, { uom: UnitOfMeasure.Degree, label: "Cool Setpoint", name: "coolSetpoint" });
        this.drivers.CLIMD = Driver.create("CLIMD", this, nodeInfo.property, { uom: UnitOfMeasure.InsteonThermostatMode, label: "Mode", name: "mode" });
        this.drivers.CLIFS = Driver.create("CLIFS", this, nodeInfo.property, { uom: UnitOfMeasure.InsteonThermostatFanMode, label: "Fan Mode", name: "fanMode" });
        this.drivers.CLIHUM = Driver.create("CLIHUM", this, nodeInfo.property, { uom: UnitOfMeasure.Percent, label: "Humidity", name: "humidity" });
        this.drivers.CLIHCS = Driver.create("CLIHCS", this, nodeInfo.property, { uom: UnitOfMeasure.ThermostatHeatCoolState, label: "Heat/Cool State", name: "heatCoolState" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
    }
    async updateHeatSetpoint(value) { return this.sendCommand("CLISPH", value); }
    async updateCoolSetpoint(value) { return this.sendCommand("CLISPC", value); }
    async updateMode(value) { return this.sendCommand("CLIMD", value); }
    async updateFanMode(value) { return this.sendCommand("CLIFS", value); }
    async setpointUp() { return this.sendCommand("BRT"); }
    async setpointDown() { return this.sendCommand("DIM"); }
    async beep(value) { return this.sendCommand("BEEP", value); }
    async query() { return this.sendCommand("QUERY"); }
    async setTime() { return this.sendCommand("SETTIME"); }
    async writeChanges() { return this.sendCommand("WDU"); }
    get temperature() {
        return this.drivers.ST?.value;
    }
    get heatSetpoint() {
        return this.drivers.CLISPH?.value;
    }
    get coolSetpoint() {
        return this.drivers.CLISPC?.value;
    }
    get mode() {
        return this.drivers.CLIMD?.value;
    }
    get fanMode() {
        return this.drivers.CLIFS?.value;
    }
    get humidity() {
        return this.drivers.CLIHUM?.value;
    }
    get heatCoolState() {
        return this.drivers.CLIHCS?.value;
    }
    get responding() {
        return this.drivers.ERR?.value;
    }
}
NodeFactory.register(TempLincNode);
export var TempLinc;
(function (TempLinc) {
    function is(node) {
        return ["TempLinc"].includes(node.nodeDefId);
    }
    TempLinc.is = is;
    function isImplementedBy(node) {
        return ["TempLinc", "Thermostat"].includes(node.nodeDefId);
    }
    TempLinc.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new TempLincNode(isy, nodeInfo);
    }
    TempLinc.create = create;
    TempLinc.Node = TempLincNode;
})(TempLinc || (TempLinc = {}));
//# sourceMappingURL=TempLinc.js.map