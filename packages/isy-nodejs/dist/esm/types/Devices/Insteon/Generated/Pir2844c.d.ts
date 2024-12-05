import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = Pir2844c.Commands;
type Drivers = Pir2844c.Drivers;
declare class Pir2844cNode extends Base<Drivers, Commands> implements Pir2844c.Interface {
    readonly commands: {
        CLITEMP: (value: number) => Promise<any>;
        QUERY: () => Promise<any>;
        BEEP: (value?: number) => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'PIR2844C' | "PIR2844C_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    calibrateTemperature(value: number): Promise<any>;
    query(): Promise<any>;
    beep(value?: number): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): Insteon.OnLevelRelay;
    get temperature(): number;
    get luminance(): number;
    get batteryLevel(): number;
    get batteryPowered(): Insteon.Boolean;
    get responding(): Insteon.Error;
}
export declare namespace Pir2844c {
    interface Interface extends Omit<InstanceType<typeof Pir2844cNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is Pir2844cNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is Pir2844cNode;
    function create(isy: ISY, nodeInfo: NodeInfo): Pir2844cNode;
    const Node: typeof Pir2844cNode;
    type Commands = {
        CLITEMP: ((value: number) => Promise<boolean>) & {
            label: "Calibrate Temperature";
            name: "calibrateTemperature";
        };
        QUERY: (() => Promise<boolean>) & {
            label: "Query";
            name: "query";
        };
        BEEP: ((value?: number) => Promise<boolean>) & {
            label: "Beep";
            name: "beep";
        };
        WDU: (() => Promise<boolean>) & {
            label: "Write Changes";
            name: "writeChanges";
        };
    };
    type Drivers = {
        ST: {
            uom: UnitOfMeasure.Percent;
            value: Insteon.OnLevelRelay;
            label: "Status";
            name: "status";
        };
        CLITEMP: {
            uom: UnitOfMeasure.Celsius;
            value: number;
            label: "Temperature";
            name: "temperature";
        };
        LUMIN: {
            uom: UnitOfMeasure.Percent;
            value: number;
            label: "Luminance";
            name: "luminance";
        };
        BATLVL: {
            uom: UnitOfMeasure.Percent;
            value: number;
            label: "Battery Level";
            name: "batteryLevel";
        };
        GV1: {
            uom: UnitOfMeasure.Boolean;
            value: Insteon.Boolean;
            label: "Battery Powered";
            name: "batteryPowered";
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
//# sourceMappingURL=Pir2844c.d.ts.map