import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = Ezio2x4Output.Commands;
type Drivers = Ezio2x4Output.Drivers;
export declare class Ezio2x4OutputNode extends Base<Drivers, Commands> implements Ezio2x4Output.Interface {
    readonly commands: {
        DON: (value?: (0 | 100)) => Promise<any>;
        DOF: () => Promise<any>;
        QUERY: () => Promise<any>;
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: "EZIO2x4_Output";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    on(value?: (0 | 100)): Promise<any>;
    off(): Promise<any>;
    query(): Promise<any>;
    writeChanges(): Promise<any>;
    get status(): Insteon.OnLevelRelay;
    get responding(): Insteon.Error;
}
export declare namespace Ezio2x4Output {
    interface Interface extends Omit<InstanceType<typeof Ezio2x4OutputNode>, keyof ISYDeviceNode<any, any, any, any>> {
        nodeDefId: "EZIO2x4_Output";
    }
    function is(node: ISYNode<any, any, any, any>): node is Ezio2x4OutputNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is Ezio2x4OutputNode;
    function create(isy: ISY, nodeInfo: NodeInfo): Ezio2x4OutputNode;
    const Node: typeof Ezio2x4OutputNode;
    type Commands = {
        DON: ((value?: (0 | 100)) => Promise<boolean>) & {
            label: "On";
            name: "on";
        };
        DOF: (() => Promise<boolean>) & {
            label: "Off";
            name: "off";
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
            uom: UnitOfMeasure.Percent;
            value: Insteon.OnLevelRelay;
            label: "Status";
            name: "status";
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
//# sourceMappingURL=Ezio2x4Output.d.ts.map