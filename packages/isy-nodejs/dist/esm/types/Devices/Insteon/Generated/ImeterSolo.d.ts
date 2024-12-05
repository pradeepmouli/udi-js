import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = ImeterSolo.Commands;
type Drivers = ImeterSolo.Drivers;
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
    type Commands = {
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
    type Drivers = {
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
export {};
//# sourceMappingURL=ImeterSolo.d.ts.map