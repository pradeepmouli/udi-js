import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import type { IntRange } from "type-fest";
import { Insteon } from "../../../Definitions/index.js";
type Commands = Pir2844c.Commands.Type;
type Drivers = Pir2844c.Drivers.Type;
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
    get temperature(): IntRange<-31, 70>;
    get luminance(): IntRange<0, 100>;
    get batteryLevel(): IntRange<0, 100>;
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
    const Class: typeof Pir2844cNode;
    namespace Commands {
        type Type = {
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
    }
    enum Commands {
        calibrateTemperature = "CLITEMP",
        query = "QUERY",
        beep = "BEEP",
        writeChanges = "WDU"
    }
    namespace Drivers {
        type Type = {
            ST: {
                uom: UnitOfMeasure.Percent;
                value: Insteon.OnLevelRelay;
                label: "Status";
                name: "status";
            };
            CLITEMP: {
                uom: UnitOfMeasure.Celsius;
                value: IntRange<-31, 70>;
                label: "Temperature";
                name: "temperature";
            };
            LUMIN: {
                uom: UnitOfMeasure.Percent;
                value: IntRange<0, 100>;
                label: "Luminance";
                name: "luminance";
            };
            BATLVL: {
                uom: UnitOfMeasure.Percent;
                value: IntRange<0, 100>;
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
    enum Drivers {
        status = "ST",
        temperature = "CLITEMP",
        luminance = "LUMIN",
        batteryLevel = "BATLVL",
        batteryPowered = "GV1",
        responding = "ERR"
    }
}
export {};
//# sourceMappingURL=Pir2844c.d.ts.map