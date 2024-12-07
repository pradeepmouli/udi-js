/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class ThermostatNode extends Base {
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
    static nodeDefId = "Thermostat";
    static implements = ['Thermostat'];
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.state['ST'], { uom: UnitOfMeasure.Degree, label: "Temperature", name: "temperature" });
        this.drivers.CLISPH = Driver.create("CLISPH", this, nodeInfo.state['CLISPH'], { uom: UnitOfMeasure.Degree, label: "Heat Setpoint", name: "heatSetpoint" });
        this.drivers.CLISPC = Driver.create("CLISPC", this, nodeInfo.state['CLISPC'], { uom: UnitOfMeasure.Degree, label: "Cool Setpoint", name: "coolSetpoint" });
        this.drivers.CLIMD = Driver.create("CLIMD", this, nodeInfo.state['CLIMD'], { uom: UnitOfMeasure.InsteonThermostatMode, label: "Mode", name: "mode" });
        this.drivers.CLIFS = Driver.create("CLIFS", this, nodeInfo.state['CLIFS'], { uom: UnitOfMeasure.InsteonThermostatFanMode, label: "Fan Mode", name: "fanMode" });
        this.drivers.CLIHUM = Driver.create("CLIHUM", this, nodeInfo.state['CLIHUM'], { uom: UnitOfMeasure.Percent, label: "Humidity", name: "humidity" });
        this.drivers.CLIHCS = Driver.create("CLIHCS", this, nodeInfo.state['CLIHCS'], { uom: UnitOfMeasure.ThermostatHeatCoolState, label: "Heat/Cool State", name: "heatCoolState" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.state['ERR'], { uom: UnitOfMeasure.Index, label: "Responding", name: "responding" });
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
NodeFactory.register(ThermostatNode);
export var Thermostat;
(function (Thermostat) {
    function is(node) {
        return ['Thermostat'].includes(node.nodeDefId);
    }
    Thermostat.is = is;
    function isImplementedBy(node) {
        return ['Thermostat'].includes(node.nodeDefId);
    }
    Thermostat.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new ThermostatNode(isy, nodeInfo);
    }
    Thermostat.create = create;
    Thermostat.Node = ThermostatNode;
    Thermostat.Class = ThermostatNode;
    let Commands;
    (function (Commands) {
        Commands["updateHeatSetpoint"] = "CLISPH";
        Commands["updateCoolSetpoint"] = "CLISPC";
        Commands["updateMode"] = "CLIMD";
        Commands["updateFanMode"] = "CLIFS";
        Commands["setpointUp"] = "BRT";
        Commands["setpointDown"] = "DIM";
        Commands["beep"] = "BEEP";
        Commands["query"] = "QUERY";
        Commands["setTime"] = "SETTIME";
        Commands["writeChanges"] = "WDU";
    })(Commands = Thermostat.Commands || (Thermostat.Commands = {}));
    let Drivers;
    (function (Drivers) {
        Drivers["temperature"] = "ST";
        Drivers["heatSetpoint"] = "CLISPH";
        Drivers["coolSetpoint"] = "CLISPC";
        Drivers["mode"] = "CLIMD";
        Drivers["fanMode"] = "CLIFS";
        Drivers["humidity"] = "CLIHUM";
        Drivers["heatCoolState"] = "CLIHCS";
        Drivers["responding"] = "ERR";
    })(Drivers = Thermostat.Drivers || (Thermostat.Drivers = {}));
})(Thermostat || (Thermostat = {}));
//# sourceMappingURL=Thermostat.js.map