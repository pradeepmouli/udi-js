import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = TempLinc.Commands;
type Drivers = TempLinc.Drivers;
declare class TempLincNode extends Base<Drivers, Commands> implements TempLinc.Interface {
    readonly commands: {
        CLISPH: (value: number) => Promise<any>;
        CLISPC: (value: number) => Promise<any>;
        CLIMD: (value: (0 | 1 | 2 | 3 | 5)) => Promise<any>;
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
    readonly nodeDefId: 'TempLinc';
    constructor(isy: ISY, nodeInfo: NodeInfo);
    updateHeatSetpoint(value: number): Promise<any>;
    updateCoolSetpoint(value: number): Promise<any>;
    updateMode(value: (0 | 1 | 2 | 3 | 5)): Promise<any>;
    updateFanMode(value: (7 | 8)): Promise<any>;
    setpointUp(): Promise<any>;
    setpointDown(): Promise<any>;
    beep(value?: number): Promise<any>;
    query(): Promise<any>;
    setTime(): Promise<any>;
    writeChanges(): Promise<any>;
    get temperature(): number;
    get heatSetpoint(): number;
    get coolSetpoint(): number;
    get mode(): (0 | 1 | 2 | 3 | 5);
    get fanMode(): (7 | 8);
    get humidity(): number;
    get heatCoolState(): number;
    get responding(): Insteon.Error;
}
export declare namespace TempLinc {
    interface Interface extends Omit<InstanceType<typeof TempLincNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is TempLincNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is TempLincNode;
    function create(isy: ISY, nodeInfo: NodeInfo): TempLincNode;
    const Node: typeof TempLincNode;
    type Commands = {
        CLISPH: ((value: number) => Promise<boolean>) & {
            label: "Heat Setpoint";
            name: "updateHeatSetpoint";
        };
        CLISPC: ((value: number) => Promise<boolean>) & {
            label: "Cool Setpoint";
            name: "updateCoolSetpoint";
        };
        CLIMD: ((value: (0 | 1 | 2 | 3 | 5)) => Promise<boolean>) & {
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
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.Degree;
            value: number;
            label: "Temperature";
            name: "temperature";
        };
        CLISPH: {
            uom: UnitOfMeasure.Degree;
            value: number;
            label: "Heat Setpoint";
            name: "heatSetpoint";
        };
        CLISPC: {
            uom: UnitOfMeasure.Degree;
            value: number;
            label: "Cool Setpoint";
            name: "coolSetpoint";
        };
        CLIMD: {
            uom: UnitOfMeasure.InsteonThermostatMode;
            value: (0 | 1 | 2 | 3 | 5);
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
            value: number;
            label: "Humidity";
            name: "humidity";
        };
        CLIHCS: {
            uom: UnitOfMeasure.ThermostatHeatCoolState;
            value: number;
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
export {};
//# sourceMappingURL=TempLinc.d.ts.map