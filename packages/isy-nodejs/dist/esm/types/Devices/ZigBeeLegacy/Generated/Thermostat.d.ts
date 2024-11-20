import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
export declare const nodeDefId = "Thermostat";
type Commands = Thermostat.Commands;
type Drivers = Thermostat.Drivers;
export declare class ThermostatNode extends Base<Drivers, Commands> implements Thermostat.Interface {
    readonly commands: {
        CLISPH: (value: any) => Promise<any>;
        CLISPC: (value: any) => Promise<any>;
        CLIMD: (value: any) => Promise<any>;
        CLIFS: (value: any) => Promise<any>;
        CLISMD: (value: any) => Promise<any>;
        CLISPHD: (value: any) => Promise<any>;
        CLISPCD: (value: any) => Promise<any>;
        QUERY: () => Promise<any>;
        ADRPST: (value: any) => Promise<any>;
    };
    static nodeDefId: string;
    readonly nodeDefId: "Thermostat";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    updateHeatSetpoint(value: ): Promise<any>;
    updateCoolSetpoint(value: ): Promise<any>;
    updateMode(value: ): Promise<any>;
    updateFanMode(value: ): Promise<any>;
    updateScheduleMode(value: ): Promise<any>;
    heatSetpointShift(value: ): Promise<any>;
    coolSetpointShift(value: ): Promise<any>;
    query(): Promise<any>;
    adr(value: ): Promise<any>;
    get temperature(): {};
}
export declare namespace Thermostat {
    interface Interface extends Omit<InstanceType<typeof ThermostatNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "Thermostat";
    }
    function is(node: ISYNode<any, any, any, any>): node is ThermostatNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is ThermostatNode;
    function create(isy: ISY, nodeInfo: NodeInfo): ThermostatNode;
    const Node: typeof ThermostatNode;
    type Commands = {
        CLISPH: ((value: ) => Promise<boolean>) & {
            label: "Heat Setpoint";
            name: "updateHeatSetpoint";
        };
        CLISPC: ((value: ) => Promise<boolean>) & {
            label: "Cool Setpoint";
            name: "updateCoolSetpoint";
        };
        CLIMD: ((value: ) => Promise<boolean>) & {
            label: "Mode";
            name: "updateMode";
        };
        CLIFS: ((value: ) => Promise<boolean>) & {
            label: "Fan Mode";
            name: "updateFanMode";
        };
        CLISMD: ((value: ) => Promise<boolean>) & {
            label: "Schedule Mode";
            name: "updateScheduleMode";
        };
        CLISPHD: ((value: ) => Promise<boolean>) & {
            label: "Heat Setpoint Shift";
            name: "heatSetpointShift";
        };
        CLISPCD: ((value: ) => Promise<boolean>) & {
            label: "Cool Setpoint Shift";
            name: "coolSetpointShift";
        };
        QUERY: (() => Promise<boolean>) & {
            label: "Query";
            name: "query";
        };
        ADRPST: ((value: ) => Promise<boolean>) & {
            label: "ADR";
            name: "adr";
        };
    };
    type Drivers = {
        ST: {
            uom: ;
            value: ;
            label: "Temperature";
            name: "temperature";
        };
        CLISPH: {
            uom: ;
            value: ;
            label: "Heat Setpoint";
            name: "heatSetpoint";
        };
        CLISPC: {
            uom: ;
            value: ;
            label: "Cool Setpoint";
            name: "coolSetpoint";
        };
        CLIMD: {
            uom: ;
            value: ;
            label: "Mode";
            name: "mode";
        };
        CLIFS: {
            uom: ;
            value: ;
            label: "Fan Mode";
            name: "fanMode";
        };
        CLIHCS: {
            uom: ;
            value: ;
            label: "Heat/Cool State";
            name: "heatCoolState";
        };
        CLIFRS: {
            uom: ;
            value: ;
            label: "Fan State";
            name: "fanState";
        };
        CLISMD: {
            uom: ;
            value: ;
            label: "Schedule Mode";
            name: "scheduleMode";
        };
        ERR: {
            uom: ;
            value: ;
            label: "Responding";
            name: "responding";
        };
    };
}
export {};
//# sourceMappingURL=Thermostat.d.ts.map