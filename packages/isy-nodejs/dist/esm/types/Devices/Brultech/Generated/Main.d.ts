import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Brultech } from "../../../Definitions/index.js";
export declare const nodeDefId = "BTMain";
type Commands = Main.Commands;
type Drivers = Main.Drivers;
export declare class MainNode extends Base<Drivers, Commands> implements Main.Interface {
    readonly commands: {
        QUERY: () => Promise<any>;
    };
    static nodeDefId: string;
    readonly nodeDefId: "BTMain";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    query(): Promise<any>;
    get status(): number;
    get totalEnergy(): number;
    get currentVoltage(): number;
    get currentCurrent(): number;
    get polarizedPower(): number;
    get responding(): Brultech.Error;
}
export declare namespace Main {
    interface Interface extends Omit<InstanceType<typeof MainNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "BTMain";
    }
    function is(node: ISYNode<any, any, any, any>): node is MainNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is MainNode;
    function create(isy: ISY, nodeInfo: NodeInfo): MainNode;
    const Node: typeof MainNode;
    type Commands = {
        QUERY: (() => Promise<boolean>) & {
            label: "Query";
            name: "query";
        };
    };
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.Watt;
            value: number;
            label: "Status";
            name: "status";
        };
        TPW: {
            uom: UnitOfMeasure.KilowattsPerHour;
            value: number;
            label: "Total Energy";
            name: "totalEnergy";
        };
        CV: {
            uom: UnitOfMeasure.Volt;
            value: number;
            label: "Current Voltage";
            name: "currentVoltage";
        };
        CC: {
            uom: UnitOfMeasure.Ampere;
            value: number;
            label: "Current Current";
            name: "currentCurrent";
        };
        PPW: {
            uom: UnitOfMeasure.Watt;
            value: number;
            label: "Polarized Power";
            name: "polarizedPower";
        };
        ERR: {
            uom: UnitOfMeasure.Index;
            value: Brultech.Error;
            label: "Responding";
            name: "responding";
        };
    };
}
export {};
//# sourceMappingURL=Main.d.ts.map