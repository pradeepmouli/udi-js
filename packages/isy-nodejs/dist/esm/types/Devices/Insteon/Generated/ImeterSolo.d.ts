import { UnitOfMeasure } from "../../../Definitions/Global/index.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = ImeterSolo.Commands.Type;
type Drivers = ImeterSolo.Drivers.Type;
declare class ImeterSoloNode extends Base<Drivers, Commands> implements ImeterSolo.Interface {
    readonly commands: {
        RESET: () => Promise<any>;
        QUERY: () => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'IMETER_SOLO';
    constructor(isy: ISY, nodeInfo: NodeInfo);
    resetTotalEnergy(): Promise<any>;
    query(): Promise<any>;
    writeChanges(): Promise<any>;
    get currentPower(): number;
    get totalEnergy(): number;
    get responding(): Insteon.Error;
}
export declare namespace ImeterSolo {
    interface Interface extends Omit<InstanceType<typeof ImeterSoloNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is ImeterSoloNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is ImeterSoloNode;
    function create(isy: ISY, nodeInfo: NodeInfo): ImeterSoloNode;
    const Node: typeof ImeterSoloNode;
    const Class: typeof ImeterSoloNode;
    namespace Commands {
        type Type = {
            RESET: (() => Promise<boolean>) & {
                label: "Reset Total Energy";
                name: "resetTotalEnergy";
            };
            QUERY: (() => Promise<boolean>) & {
                label: "Query";
                name: "query";
            };
            WDU: (() => Promise<boolean>) & {
                label: "Write Changes";
                name: "writeChanges";
            };
        };
    }
    enum Commands {
        resetTotalEnergy = "RESET",
        query = "QUERY",
        writeChanges = "WDU"
    }
    namespace Drivers {
        type Type = {
            ST: {
                uom: UnitOfMeasure.Watt;
                value: number;
                label: "Current Power";
                name: "currentPower";
            };
            TPW: {
                uom: UnitOfMeasure.KilowattsPerHour;
                value: number;
                label: "Total Energy";
                name: "totalEnergy";
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
        currentPower = "ST",
        totalEnergy = "TPW",
        responding = "ERR"
    }
}
export {};
//# sourceMappingURL=ImeterSolo.d.ts.map