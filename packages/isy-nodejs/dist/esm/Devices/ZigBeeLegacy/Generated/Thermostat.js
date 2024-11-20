/* THIS FILE WAS AUTOMATICALLY GENERATED. DO NOT EDIT DIRECTLY. */
import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import { Base } from "../index.js";
import { Driver } from "../../../Definitions/Global/Drivers.js";
import { NodeFactory } from "../../NodeFactory.js";
export const nodeDefId = "Thermostat";
export class ThermostatNode extends Base {
    commands = {
        CLISPH: this.updateHeatSetpoint,
        CLISPC: this.updateCoolSetpoint,
        CLIMD: this.updateMode,
        CLIFS: this.updateFanMode,
        CLISMD: this.updateScheduleMode,
        CLISPHD: this.heatSetpointShift,
        CLISPCD: this.coolSetpointShift,
        QUERY: this.query,
        ADRPST: this.adr
    };
    static nodeDefId = "Thermostat";
    constructor(isy, nodeInfo) {
        super(isy, nodeInfo);
        this.drivers.ST = Driver.create("ST", this, nodeInfo.property, { uom: UnitOfMeasure.Unknown, label: "Temperature", name: "temperature" });
        this.drivers.CLISPH = Driver.create("CLISPH", this, nodeInfo.property, { uom: UnitOfMeasure.Unknown, label: "Heat Setpoint", name: "heatSetpoint" });
        this.drivers.CLISPC = Driver.create("CLISPC", this, nodeInfo.property, { uom: UnitOfMeasure.Unknown, label: "Cool Setpoint", name: "coolSetpoint" });
        this.drivers.CLIMD = Driver.create("CLIMD", this, nodeInfo.property, { uom: UnitOfMeasure.Unknown, label: "Mode", name: "mode" });
        this.drivers.CLIFS = Driver.create("CLIFS", this, nodeInfo.property, { uom: UnitOfMeasure.Unknown, label: "Fan Mode", name: "fanMode" });
        this.drivers.CLIHCS = Driver.create("CLIHCS", this, nodeInfo.property, { uom: UnitOfMeasure.Unknown, label: "Heat/Cool State", name: "heatCoolState" });
        this.drivers.CLIFRS = Driver.create("CLIFRS", this, nodeInfo.property, { uom: UnitOfMeasure.Unknown, label: "Fan State", name: "fanState" });
        this.drivers.CLISMD = Driver.create("CLISMD", this, nodeInfo.property, { uom: UnitOfMeasure.Unknown, label: "Schedule Mode", name: "scheduleMode" });
        this.drivers.ERR = Driver.create("ERR", this, nodeInfo.property, { uom: UnitOfMeasure.Unknown, label: "Responding", name: "responding" });
    }
    async updateHeatSetpoint(value) {
        return this.sendCommand("CLISPH", { value: value });
    }
    async updateCoolSetpoint(value) {
        return this.sendCommand("CLISPC", { value: value });
    }
    async updateMode(value) {
        return this.sendCommand("CLIMD", { value: value });
    }
    async updateFanMode(value) {
        return this.sendCommand("CLIFS", { value: value });
    }
    async updateScheduleMode(value) {
        return this.sendCommand("CLISMD", { value: value });
    }
    async heatSetpointShift(value) {
        return this.sendCommand("CLISPHD", { value: value });
    }
    async coolSetpointShift(value) {
        return this.sendCommand("CLISPCD", { value: value });
    }
    async query() {
        return this.sendCommand("QUERY");
    }
    async adr(value) {
        return this.sendCommand("ADRPST", { value: value });
    }
    get temperature() { }
}
return this.drivers.ST?.value;
public;
get;
heatSetpoint();
{
    return this.drivers.CLISPH?.value;
}
public;
get;
coolSetpoint();
{
    return this.drivers.CLISPC?.value;
}
public;
get;
mode();
{
    return this.drivers.CLIMD?.value;
}
public;
get;
fanMode();
{
    return this.drivers.CLIFS?.value;
}
public;
get;
heatCoolState();
{
    return this.drivers.CLIHCS?.value;
}
public;
get;
fanState();
{
    return this.drivers.CLIFRS?.value;
}
public;
get;
scheduleMode();
{
    return this.drivers.CLISMD?.value;
}
public;
get;
responding();
{
    return this.drivers.ERR?.value;
}
NodeFactory.register(ThermostatNode);
export var Thermostat;
(function (Thermostat) {
    function is(node) {
        return node.nodeDefId in ["Thermostat"];
    }
    Thermostat.is = is;
    function is(node) {
        return node.nodeDefId in ["Thermostat"];
    }
    Thermostat.is = is;
    function isImplementedBy(node) {
        return node.nodeDefId in ["Thermostat"];
    }
    Thermostat.isImplementedBy = isImplementedBy;
    function create(isy, nodeInfo) {
        return new ThermostatNode(isy, nodeInfo);
    }
    Thermostat.create = create;
    Thermostat.Node = ThermostatNode;
})(Thermostat || (Thermostat = {}));
