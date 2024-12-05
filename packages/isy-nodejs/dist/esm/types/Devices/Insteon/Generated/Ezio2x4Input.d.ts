import { UnitOfMeasure } from "../../../Definitions/Global/UOM.js";
import type { NodeInfo } from "../../../Model/NodeInfo.js";
import { ISY } from "../../../ISY.js";
import type { ISYNode } from "../../../ISYNode.js";
import { Base } from "../index.js";
import { ISYDeviceNode } from "../../ISYDeviceNode.js";
import { Insteon } from "../../../Definitions/index.js";
type Commands = Ezio2x4Input.Commands;
type Drivers = Ezio2x4Input.Drivers;
declare class Ezio2x4InputNode extends Base<Drivers, Commands> implements Ezio2x4Input.Interface {
    readonly commands: {
        WDU: () => Promise<any>;
    };
    static nodeDefId: string;
    static implements: string[];
    readonly nodeDefId: 'EZIO2x4_Input' | "EZIO2x4_Input_ADV";
    constructor(isy: ISY, nodeInfo: NodeInfo);
    writeChanges(): Promise<any>;
    get status(): Insteon.OnLevelRelay;
    get responding(): Insteon.Error;
}
export declare namespace Ezio2x4Input {
    interface Interface extends Omit<InstanceType<typeof Ezio2x4InputNode>, keyof ISYDeviceNode<any, any, any, any>> {
    }
    function is(node: ISYNode<any, any, any, any>): node is Ezio2x4InputNode;
    function isImplementedBy(node: ISYNode<any, any, any, any>): node is Ezio2x4InputNode;
    function create(isy: ISY, nodeInfo: NodeInfo): Ezio2x4InputNode;
    const Node: typeof Ezio2x4InputNode;
    type Commands = {
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
//# sourceMappingURL=Ezio2x4Input.d.ts.map