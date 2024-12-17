/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
class TempLincNode extends Base {
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
    static implements = ['TempLinc', "IRLincTx", "SirenAlert", "SirenArm"];
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
NodeFactory.register(TempLincNode);
export var TempLinc;
(function (TempLinc) {
    function is(node) {
        return ['TempLinc'].includes(node.nodeDefId);
    }
    TempLinc.is = is;
    function isImplementedBy(node) {
        return ['TempLinc', "Thermostat"].includes(node.nodeDefId);
    }
    TempLinc.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new TempLincNode(isy, nodeInfo);
    }
    TempLinc.create = create;
    TempLinc.Node = TempLincNode;
    TempLinc.Class = TempLincNode;
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
    })(Commands = TempLinc.Commands || (TempLinc.Commands = {}));
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
    })(Drivers = TempLinc.Drivers || (TempLinc.Drivers = {}));
})(TempLinc || (TempLinc = {}));
//# sourceMappingURL=TempLinc.js.map