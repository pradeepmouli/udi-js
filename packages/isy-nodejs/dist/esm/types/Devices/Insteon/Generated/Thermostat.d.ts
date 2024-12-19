import { Family, UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Base } from "../index.js";
import type { IntRange } from "type-fest";
import { Insteon } from "../../../Definitions/index.js";
type Commands = Thermostat.Commands.Type;
type Drivers = Thermostat.Drivers.Type;
declare class ThermostatNode extends Base<Drivers, Commands> implements Thermostat.Interface {
    readonly commands: {
        CLISPH: (value: number) => Promise<any>;
        CLISPC: (value: number) => Promise<any>;
        CLIMD: (value: (0 | 1 | 2 | 3 | 5 | 6 | 7)) => Promise<any>;
        CLIFS: (value: (7 | 8)) => Promise<any>;
        BRT: () => Promise<any>;
        DIM: () => Promise<any>;
        BEEP: (value?: number) => Promise<any>;
        QUERY: () => Promise<any>;
        SETTIME: () => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'Thermostat';
    constructor(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>);
    updateHeatSetpoint(value: number): Promise<any>;
    updateCoolSetpoint(value: number): Promise<any>;
    updateMode(value: (0 | 1 | 2 | 3 | 5 | 6 | 7)): Promise<any>;
    updateFanMode(value: (7 | 8)): Promise<any>;
    setpointUp(): Promise<any>;
    setpointDown(): Promise<any>;
    beep(value?: number): Promise<any>;
    query(): Promise<any>;
    setTime(): Promise<any>;
    writeChanges(): Promise<any>;
    get temperature(): number;
    get heatSetpoint(): IntRange<0, 120>;
    get coolSetpoint(): IntRange<10, 120>;
    get mode(): (0 | 1 | 2 | 3 | 5 | 6 | 7);
    get fanMode(): (7 | 8);
    get humidity(): IntRange<0, 100>;
    get heatCoolState(): IntRange<0, 2>;
    get responding(): Insteon.Error;
}
export declare namespace Thermostat {
    interface Interface extends Omit<InstanceType<typeof ThermostatNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is ThermostatNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is ThermostatNode;
    function create(isy: ISY, nodeInfo: NodeInfo<Family.Insteon>): ThermostatNode;
    const Node: typeof ThermostatNode;
    const Class: typeof ThermostatNode;
    namespace Commands {
        type Type = {
            CLISPH: ((value: number) => Promise<boolean>) & {
                label: "Heat Setpoint";
                name: "updateHeatSetpoint";
            };
            CLISPC: ((value: number) => Promise<boolean>) & {
                label: "Cool Setpoint";
                name: "updateCoolSetpoint";
            };
            CLIMD: ((value: (0 | 1 | 2 | 3 | 5 | 6 | 7)) => Promise<boolean>) & {
                label: "Mode";
                name: "updateMode";
            };
            CLIFS: ((value: (7 | 8)) => Promise<boolean>) & {
                label: "Fan Mode";
                name: "updateFanMode";
            };
            BRT: (() => Promise<boolean>) & {
                label: "Setpoint Up";
                name: "setpointUp";
            };
            DIM: (() => Promise<boolean>) & {
                label: "Setpoint Down";
                name: "setpointDown";
            };
            BEEP: ((value?: number) => Promise<boolean>) & {
                label: "Beep";
                name: "beep";
            };
            QUERY: (() => Promise<boolean>) & {
                label: "Query";
                name: "query";
            };
            SETTIME: (() => Promise<boolean>) & {
                label: "Set Time";
                name: "setTime";
            };
            WDU: (() => Promise<boolean>) & {
                label: "Write Changes";
                name: "writeChanges";
            };
        };
    }
    enum Commands {
        updateHeatSetpoint = "CLISPH",
        updateCoolSetpoint = "CLISPC",
        updateMode = "CLIMD",
        updateFanMode = "CLIFS",
        setpointUp = "BRT",
        setpointDown = "DIM",
        beep = "BEEP",
        query = "QUERY",
        setTime = "SETTIME",
        writeChanges = "WDU"
    }
    namespace Drivers {
        type Type = {
            ST: {
                uom: UnitOfMeasure.Degree;
                value: number;
                label: "Temperature";
                name: "temperature";
            };
            CLISPH: {
                uom: UnitOfMeasure.Degree;
                value: IntRange<0, 120>;
                label: "Heat Setpoint";
                name: "heatSetpoint";
            };
            CLISPC: {
                uom: UnitOfMeasure.Degree;
                value: IntRange<10, 120>;
                label: "Cool Setpoint";
                name: "coolSetpoint";
            };
            CLIMD: {
                uom: UnitOfMeasure.InsteonThermostatMode;
                value: (0 | 1 | 2 | 3 | 5 | 6 | 7);
                label: "Mode";
                name: "mode";
            };
            CLIFS: {
                uom: UnitOfMeasure.InsteonThermostatFanMode;
                value: (7 | 8);
                label: "Fan Mode";
                name: "fanMode";
            };
            CLIHUM: {
                uom: UnitOfMeasure.Percent;
                value: IntRange<0, 100>;
                label: "Humidity";
                name: "humidity";
            };
            CLIHCS: {
                uom: UnitOfMeasure.ThermostatHeatCoolState;
                value: IntRange<0, 2>;
                label: "Heat/Cool State";
                name: "heatCoolState";
            };
            ERR: {
                uom: UnitOfMeasure.Index;
                value: Insteon.Error;
                label: "Responding";
                name: "responding";
            };
        };
    }
    enum Drivers {
        temperature = "ST",
        heatSetpoint = "CLISPH",
        coolSetpoint = "CLISPC",
        mode = "CLIMD",
        fanMode = "CLIFS",
        humidity = "CLIHUM",
        heatCoolState = "CLIHCS",
        responding = "ERR"
    }
}
export {};
//# sourceMappingURL=Thermostat.d.ts.map